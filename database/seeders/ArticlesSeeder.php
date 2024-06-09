<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => '山居秋暝',
                'user_id' => 1,
                'content' => "空山新雨後，天氣晚來秋。"
                    ."\n明月松間照，清泉石上流。"
                    ."\n竹喧歸浣女，蓮動下漁舟。"
                    ."\n隨意春芳歇，王孫自可留。",
                'category' => 'classical_chinese',
            ],
            [
                'title' => '月下獨酌',
                'user_id' => 1,
                'content' =>
                    "花間一壺酒，獨酌無相親。"
                . "\n舉杯邀明月，對影成三人。"
                . "\n月既不解飲，影徒隨我身。"
                . "\n暫伴月將影，行樂須及春。"
                . "\n我歌月徘徊，我舞影零亂。"
                . "\n醒時同交歡，醉後各分散。"
                . "\n永結無情遊，相期邈雲漢。",
                'category' => 'classical_chinese',
            ],
            [
                'title' => '登樓',
                'user_id' => 1,
                'content' =>
                    "花近高樓傷客心，萬方多難此登臨。"
                ."\n錦江春色來天地，玉壘浮雲變古今。."
                ."\n北極朝廷終不改，西山寇盜莫相侵。."
                ."\n可憐後主還祠廟，日暮聊為梁甫吟。",
                'category' => 'classical_chinese',
            ],
        ];

        foreach ($articles as $article) {
           Article::create($article);
        }
    }
}
