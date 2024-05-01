<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    public static function internalError(): static{
        return new static('The site is experiencing problems', 403);
    }
}
