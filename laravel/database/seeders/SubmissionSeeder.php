<?php

namespace Database\Seeders;

use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class SubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $processBatch = Storage::files('code_inputs');

        foreach ($processBatch as $batch) {
            $formattedMetaData = [];


            if (Storage::exists($batch)) {
                $content = Storage::get($batch);
                $categoryName = ucwords(basename($batch, '.txt'));
                $category = SubmissionCategory::where('name', $categoryName)->first();

                $pattern = '/\{\{\{\{(.*?)\}\}\}\}/s';
                preg_match_all($pattern, $content, $metaData);

                $metaData = $metaData[1];


                foreach ($metaData as $meta) {
                    $header = [];
                    $subData = explode("\n", $meta);
                    foreach ($subData as $data) {
                        if ($data) unset($data);
                    }



                    $subData = array_values(array_filter($subData));

                    $header['title'] = trim($subData[0]);
                    $header['description'] = trim($subData[1]);

                    $formattedMetaData[] = $header;

                }


                $rawCodeContent = array_filter(preg_split($pattern, $content));
                $htmlEncodedContent = array_map(function ($code) {
                    $tmp = htmlentities($code, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                    return array_values(array_filter(explode("\n", $code)));
                }, $rawCodeContent);


                for ($i = 0; $i < count($formattedMetaData); $i++) {
                    $charCount = 0;
                    forEach ($htmlEncodedContent[$i] as $arrData){
                        $charCount += strlen(trim($arrData));
                    }
                    $formattedMetaData[$i]['content'] = $htmlEncodedContent[$i];
                    $formattedMetaData[$i]['char_count'] = $charCount;
                }


                foreach ($formattedMetaData as $meta) {
                    Submission::create([
                        'title' => $meta['title'],
                        'description' => $meta['description'],
                        'user_id' => 1,
                        'submission_category_id' => $category->id,
                        'content' => json_encode($meta['content']),
                        'char_count' => $meta['char_count']
                    ]);
                }


            }
        }
    }
}
