Version: 1.0



Status: Draft



Date: 2026-07-17



Database Final Schema

方針



MAS LIVE CoreのMVPでは、



匿名参加

セッション単位管理

リアルタイム集計

配信終了後の分析



を目的とする。



ER概要

sessions



&#x20;   │



&#x20;   ├── session\_questions



&#x20;   │          │



&#x20;   │          ▼



&#x20;   │       questions



&#x20;   │



&#x20;   ├── participants



&#x20;   │          │



&#x20;   │          ▼



&#x20;   │       answers



&#x20;   │



&#x20;   └── boss\_answers

Table 01

sessions



ゲーム配信1回分を管理する。



Columns

id



title



boss\_name



status



current\_question\_no



total\_questions



started\_at



ended\_at



created\_at

status



値



created



ready



playing



finished



cancelled

例

id



20260717001



title



100人でrook7を倒せ！



boss\_name



rook7



status



playing



current\_question\_no



8

Table 02

questions



問題マスター。



Columns

id



category



difficulty



title



question\_text



image\_url



choice\_a



choice\_b



choice\_c



choice\_d



correct\_answer



explanation



status



created\_at



updated\_at

category



例



haikouritsu



oshihiki



tennsuu



yomisuji



chakuji

difficulty

1



2



3



4



5

status

draft



review



published



archived

Table 03

session\_questions



配信で使用する問題順を管理。



Columns

id



session\_id



question\_id



order\_no

役割



同じ問題でも、



別配信で別順番に利用可能。



Table 04

participants



視聴者参加者。



Columns

id



session\_id



nickname



participant\_token



joined\_at

制約



同一session内で



participant\_tokenは一意。



Table 05

answers



視聴者回答。



Columns

id



session\_id



question\_id



participant\_id



answer



is\_correct



answered\_at

例

participant



rook\_001



question



Q05



answer



B



correct



true

Table 06

boss\_answers



Boss回答。



Columns

id



session\_id



question\_id



answer



is\_correct



answered\_at

Table 07

rankings



ランキング保存。



Columns

id



session\_id



participant\_id



score



rank



updated\_at

計算



score



=



正解数



Table 08

game\_logs



ゲームイベント保存。



Columns

id



session\_id



event\_type



event\_data



created\_at

event\_type



例



GAME\_START



QUESTION\_START



QUESTION\_END



RESULT



GAME\_END

Index設計

answers

INDEX(session\_id)



INDEX(question\_id)



INDEX(participant\_id)

participants

INDEX(session\_id)

session\_questions

INDEX(session\_id)

保存方針

永続保存



保存する



問題

配信記録

匿名回答

スコア

保存しない



保存しない



IPアドレス

個人情報

SNS情報

集計処理

Raid平均

全参加者正解数合計

÷

有効回答人数

Boss Score

Boss正解数

勝敗

Boss Score



>



Raid Average



の場合



Boss Win

結論



MVP Databaseは、



「匿名参加型ライブゲーム」



として最小構成で設計する。



将来の



アカウント

XP

実績

シーズン



追加を妨げない構造とする。

