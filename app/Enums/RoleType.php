<?php

namespace App\Enums;

enum RoleType: string
{
    case ADMINISTRATOR = 'administrator';
    case USER = 'user';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }
}
