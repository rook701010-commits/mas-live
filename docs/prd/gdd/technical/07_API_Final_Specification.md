Version: 1.0



Status: Draft



Date: 2026-07-17



API Final Specification

方針



MAS LIVE Core APIは、



Boss操作

視聴者参加

回答受付

集計

OBS表示



を担当する。



基本仕様

Base URL

/api

Response Format



成功



{

&#x20; "success": true,

&#x20; "data": {}

}



失敗



{

&#x20; "success": false,

&#x20; "error": {

&#x20;   "code": "",

&#x20;   "message": ""

&#x20; }

}

Error Code

SESSION\_NOT\_FOUND



ゲームが存在しない



SESSION\_FINISHED



終了済み



INVALID\_ANSWER



不正回答



DUPLICATE\_ANSWER



回答済み



TIMEOUT



時間切れ（DL-012にてplayer/answer, boss/answerに実装。残り時間0秒以降の回答をTIMEOUT(409)で拒否）



Session API

POST

/session/create

目的



新しいBoss戦を作成する。



Request



{

&#x20; "title":"100人でrook7を倒せ！",

&#x20; "boss\_name":"rook7",

&#x20; "question\_count":20

}



Response



{

&#x20;"success":true,

&#x20;"data":{

&#x20;  "session\_id":"abc123"

&#x20;}

}

POST

/session/start

目的



ゲーム開始。



Request



{

&#x20;"session\_id":"abc123"

}



Response



{

&#x20;"success":true

}

GET

/session/current

目的



現在状態取得。



Response



{

&#x20;"status":"playing",

&#x20;"question\_no":5,

&#x20;"remaining\_seconds":12

}

POST

/session/next

目的（DL-008にて追加）



次の問題へ進める。current\_question\_noをインクリメントする。



Request



{

&#x20;"session\_id":"abc123"

}



Response



{

&#x20;"success":true,

&#x20;"data":{

&#x20;  "question\_no":6

&#x20;}

}

POST

/session/end

目的



ゲーム終了。



Player API

POST

/player/join

目的



視聴者参加。



Request



{

&#x20;"session\_id":"abc123",

&#x20;"nickname":"雀士A"

}



Response



{

&#x20;"participant\_token":"xxxxx"

}

GET

/player/question

目的



現在問題取得。



Response



{

&#x20;"question\_no":5,

&#x20;"title":"何切る問題",

&#x20;"choices":\[

&#x20;"A",

&#x20;"B",

&#x20;"C",

&#x20;"D"

&#x20;],

&#x20;"remaining":15

}

POST

/player/answer

目的



回答送信。



Request



{

&#x20;"session\_id":"abc123",

&#x20;"participant\_token":"xxxxx",

&#x20;"question\_id":5,

&#x20;"answer":"B"

}



Response



{

&#x20;"success":true

}

Boss API

POST

/boss/answer

目的



Boss回答送信。



Request



{

&#x20;"session\_id":"abc123",

&#x20;"question\_id":5,

&#x20;"answer":"B"

}

GET

/boss/result

目的



Boss現在結果。



Response



{

&#x20;"score":4,

&#x20;"total":5

}

Ranking API

GET

/ranking/live

目的



リアルタイムランキング取得。



Response



{

&#x20;"participants":100,

&#x20;"average":16.8,

&#x20;"top":\[

&#x20; {

&#x20;  "name":"雀士A",

&#x20;  "score":19

&#x20; }

&#x20;]

}

GET

/ranking/final

目的



最終結果取得。



Response



{

&#x20;"boss\_score":18,

&#x20;"raid\_average":17.4,

&#x20;"winner":"boss"

}

Overlay API

GET

/overlay/state

目的



OBS表示用状態取得。



Response



{

&#x20;"boss":"rook7",

&#x20;"question":10,

&#x20;"score":8,

&#x20;"average":15.2,

&#x20;"event":"bonus",

&#x20;"remaining\_seconds":12,

&#x20;"participants":42

}

（DL-009にてremaining\_seconds, participantsを追加。Phase6 OBS Overlay実装のため）

Admin API

POST

/admin/question/create



問題作成。



PUT

/admin/question/update



問題更新。



DELETE

/admin/question/delete



問題削除。



GET

/admin/question/list（DL-010にて追加）



問題一覧取得。



GET

/admin/dashboard



統計取得。



セキュリティ

MVP



匿名Token方式。



実装するもの



Token検証

Rate Limit

不正回答防止



実装しないもの



OAuth

JWT

会員認証

負荷想定



初期目標



同時接続



100人



設計上限



1000人



将来拡張



WebSocket化時も



API責務は維持する。



結論



APIは



「状態取得型」



として設計する。



PollingでもWebSocketでも、



後から通信方式だけ変更できる構造にする。

