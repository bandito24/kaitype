<?php

namespace App\Console\Commands;

use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CodeMigration extends Command
{

    protected $signature = 'app:code-migration {fileName?}';


    protected $description = 'Imports the files from code_inputs directory into database';

    public function handle()
    {
        $fileName = $this->argument('fileName');
        $processBatch = [];
        if(!$processBatch){
            $processBatch = Storage::files('code_inputs');
        } else {
            $processBatch[] = 'code_inputs/' . $fileName;
        }
        foreach($processBatch as $batch){
            $formattedMetaData = [];


            if(Storage::exists($batch)){
                $content = Storage::get($batch);
                $categoryName = ucwords(basename($batch, '.txt'));
                $category = SubmissionCategory::where('name', $categoryName)->first();

                $pattern = '/\{\{\{\{(.*?)\}\}\}\}/s';
                preg_match_all($pattern, $content, $metaData);

                $metaData = $metaData[1];


                foreach ($metaData as $meta){
                $header = [];
                $subData = explode("\n", $meta);
                foreach ($subData as $data){
                    if($data) unset($data);
                }

                $subData = array_values(array_filter($subData));

                $header['name'] = trim($subData[0]);
                $header['description'] = trim($subData[1]);

                $formattedMetaData[] = $header;

                }


                $rawCodeContent = array_filter(preg_split($pattern, $content));
                $htmlEncodedContent = array_map(function($code){
                    $tmp = htmlentities($code, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                    return array_values(array_filter(explode("\n", $code)));
                }, $rawCodeContent);


                for($i = 0; $i < count($formattedMetaData); $i++){
                    $formattedMetaData[$i]['content'] = $htmlEncodedContent[$i];
                }


                foreach($formattedMetaData as $meta){
                    Submission::create([
                        'name' => $meta['name'],
                        'description' => $meta['description'],
                        'user_id' => 2,
                        'submission_category_id' => $category->id,
                        'content' => json_encode($meta['content'])
                    ]);
                }





                }

//                Storage::put('code_results/result.txt', $jsonContent)

        }



    }
}
