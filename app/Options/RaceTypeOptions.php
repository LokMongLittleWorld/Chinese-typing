<?php

namespace App\Options;

class RaceTypeOptions
{
    const FUll = 'full';

    const SECOND_30 = '30_seconds';
    const SECOND_60 = '60_seconds';
    const SECOND_120 = '90_seconds';

    public static function all(): array
    {
        return [
            self::FUll => '全篇',
            self::SECOND_30 => '30秒',
            self::SECOND_60 => '60秒',
            self::SECOND_120 => '120秒',
        ];
    }

    public static function inArray(string $category): bool
    {
        return isset(self::all()[$category]);
    }
}
