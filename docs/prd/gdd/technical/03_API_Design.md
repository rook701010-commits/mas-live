API一覧

Session



POST



/api/session/create



ゲーム開始



POST



/api/session/start



開始



POST



/api/session/end



終了



GET



/api/session/current



現在ゲーム取得



Question



GET



/api/question/current



現在問題



POST



/api/question/next



次問題



GET



/api/question/result



結果



Player



POST



/api/player/join



参加



POST



/api/player/answer



回答



GET



/api/player/rank



順位



Boss



POST



/api/boss/answer



Boss回答



GET



/api/boss/status



現在状況



Ranking



GET



/api/ranking/live



リアルタイム順位



GET



/api/ranking/final



最終順位



Admin



POST



/api/admin/question/create



POST



/api/admin/question/update



POST



/api/admin/question/delete



GET



/api/admin/dashboard



レスポンス形式

{

&#x20; "success": true,

&#x20; "data": {}

}



エラー



{

&#x20; "success": false,

&#x20; "message": ""

}



全APIで形式を統一する。

