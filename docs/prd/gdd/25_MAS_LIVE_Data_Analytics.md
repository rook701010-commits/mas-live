Version: 1.0



Status: Draft



Date: 2026-07-17



MAS LIVE Data Analytics Design

データ分析・成長戦略設計書

1\. 目的



MAS LIVEでは、



「遊んでもらう」



だけではなく、



蓄積されたデータから



問題改善

配信改善

視聴者体験向上

新しいゲーム要素追加



を行う。



2\. データ思想



MAS本体と同じく、



データを単なる記録ではなく、



「麻雀能力・行動分析データ」



として扱う。



3\. 収集する基本データ

Event Data

game\_sessions



id



season



match\_number



date



boss\_name



participant\_count



winner



created\_at

4\. 問題データ

Question Analytics

question\_results



id



session\_id



question\_id



category



difficulty



answer\_count



correct\_count



correct\_rate



average\_time



boss\_correct

5\. 重要分析指標

① 問題難易度



計算:



正答率

\+

回答時間

\+

Boss正答率



評価:



Easy



80%以上



Normal



50〜80%



Hard



30〜50%



Extreme



30%未満



6\. ② 盛り上がり指数



MAS LIVE独自指標。



名称:



Stream Impact Score



(SIS)



計算要素:



正答率の分散



\+

回答時間



\+

勝敗への影響



\+

コメント反応



例:



高SIS:



意見が割れる

勝敗が動く

解説が盛り上がる

7\. ③ Boss分析

rook7 Performance



記録:



boss\_stats



total\_games



wins



losses



win\_rate



average\_score



highest\_streak



分析:



「どんな問題でBossが強いか」



を見る。



8\. ④ 視聴者分析

Raid Analytics



記録:



raid\_stats



participant\_id



games



average\_score



best\_score



wins



用途:



常連発見。



9\. 視聴者ランキング

Season Ranking



表示:



MAS LIVE Season1



1位



○○



平均18.7点





2位



△△



平均18.4点

10\. 個人能力推定



将来的拡張。



MASとの連携。



例:



視聴者参加データから、



簡易MQ推定。



条件:



十分な参加数。



例:



10回以上参加。



表示:



あなたのMAS LIVE Rating



128

11\. AI活用

AI Commentator



将来実装。



入力:



問題

正答率

回答分布

勝敗状況



生成:



この問題は視聴者の意見が割れました。



Aを選んだ人は速度重視型、

Bを選んだ人は打点重視型です。

12\. AI問題生成補助



Claude活用。



流れ:



問題作成



↓



Claudeチェック



↓



難易度予測



↓



採用判断



チェック項目:



答えの一意性

難易度

解説品質

配信適性

13\. 全国ランキング構想



Phase3以降。



MAS LIVE全国版。



データ:



全国参加者



↓



ランキング



↓



称号



↓



大会



例:



MAS LIVE 全国ランキング



1位



○○



Raid Rating 145

14\. 問題改善ループ



毎週:



配信



↓



データ収集



↓



分析



↓



問題修正



↓



次回採用

15\. 長期価値



1年後:



蓄積:



問題数1000問

参加データ

勝敗記録

能力分析



これは単なる配信ツールではなく、



麻雀能力データプラットフォーム



になる。



16\. MVPで取得する最低限データ



最初は以下のみ。



必須:



✓ Session結果



✓ 問題別正答率



✓ Bossスコア



✓ Raid平均



✓ 勝敗



✓ 参加人数



後回し:



△ 個人ランキング



△ AI分析



△ 全国比較



結論



MAS LIVE最大の資産は、



コードではなく、



毎週積み上がる



「麻雀判断データ」



である。

