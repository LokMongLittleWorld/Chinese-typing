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
                'content' => '空山新雨後，天氣晚來秋。
                明月松間照，清泉石上流。
                竹喧歸浣女，蓮動下漁舟。
                隨意春芳歇，王孫自可留。',
                'category' => 'classical_chinese',
            ],
            [
                'title' => '月下獨酌',
                'user_id' => 1,
                'content' => '花間一壺酒，獨酌無相親。
                舉杯邀明月，對影成三人。
                月既不解飲，影徒隨我身。
                暫伴月將影，行樂須及春。
                我歌月徘徊，我舞影零亂。
                醒時同交歡，醉後各分散。
                永結無情遊，相期邈雲漢。',
                'category' => 'classical_chinese',
            ],
            [
                'title' => '登樓',
                'user_id' => 1,
                'content' => '花近高樓傷客心，萬方多難此登臨。
                錦江春色來天地，玉壘浮雲變古今。
                北極朝廷終不改，西山寇盜莫相侵。
                可憐後主還祠廟，日暮聊為梁甫吟。',
                'category' => 'classical_chinese',
            ],
        ];

        foreach ($articles as $article) {
           Article::create($article);
        }
    }
}
