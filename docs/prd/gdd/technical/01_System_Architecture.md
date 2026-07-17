システムアーキテクチャ

コンセプト



配信中でも落ちない。



シンプルで拡張しやすい。



Cloudflareだけで運用可能。



全体構成

&#x20;               Player (スマホ)



&#x20;                    │



&#x20;                    │ HTTPS



&#x20;                    ▼



&#x20;        Cloudflare Workers(API)



&#x20;                    │



&#x20;     ┌──────────────┼──────────────┐



&#x20;     ▼              ▼              ▼



&#x20;Question DB    Session DB     Result DB



&#x20;                    │



&#x20;                    ▼



&#x20;             Cloudflare D1



&#x20;                    ▲



&#x20;                    │



&#x20;       Boss Client (React)



&#x20;                    │



&#x20;                    ▼



&#x20;     OBS Overlay (Browser Source)



&#x20;                    │



&#x20;                    ▼



&#x20;            YouTube Live

システム構成

Boss Client



React



役割



・ゲーム開始



・問題送り



・結果確認



・OBS操作



Player Client



React



役割



・問題表示



・回答



・ランキング表示



Admin



React



役割



・問題追加



・ランキング



・配信管理



API



Cloudflare Workers



役割



・回答受付



・集計



・ランキング



・ゲーム制御



Database



Cloudflare D1



役割



・問題



・回答



・ゲーム



・ランキング



保存



Overlay



React



Browser Source



OBS表示専用

