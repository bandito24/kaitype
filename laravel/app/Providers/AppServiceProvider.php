<?php

namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;


function roundMilliseconds($ms){
    $numString = (string)$ms;
    if(strlen($numString) < 3) return (int)$numString;
    $firstTwo = substr($numString, 0, 2);
    return (int)$firstTwo;
}

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */


    public function boot(): void
    {
        Collection::macro('formatMilliseconds', function () {
            return $this->map(function ($item, $index) {

                $milliseconds = $item['milliseconds'];
                $seconds = floor($milliseconds / 1000);
                $minutes = floor($seconds / 60);
                $hours = floor($minutes / 60);
                $milliseconds = ($milliseconds % 1000);
                $milliseconds = roundMilliseconds($milliseconds);
                $seconds = $seconds % 60;
                $minutes = $minutes % 60;

                $formattedTime = sprintf('%02d:%02d:%02d', $minutes, $seconds, $milliseconds);


                // Assign the formatted time back, or to a new key as needed
                $item['formatted_time'] = $formattedTime;
                $item['rank'] = $index + 1;
                return $item;
            });
        });
    }
}

