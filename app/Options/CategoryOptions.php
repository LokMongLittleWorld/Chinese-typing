<?php

namespace App\Options;

class CategoryOptions
{
    const CLASSICAL_CHINESE = 'classical_chinese';
    const COPY_PASTA = 'copy_pasta';
    const OTHER = 'other';

    public static function all(): array
    {
        return [
            self::CLASSICAL_CHINESE => '文言文',
            self::COPY_PASTA => '潮文',
            self::OTHER => '其他',
        ];
    }

    public static function inArray(string $category): bool
    {
        return isset(self::all()[$category]);
    }
}
