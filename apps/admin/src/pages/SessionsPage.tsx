import SessionCreator from "../components/SessionCreator";

export default function SessionsPage() {
  return (
    <div>
      <h2>セッション管理</h2>
      <p>
        セッションの進行操作（次の問題へ進める・終了）はBoss
        Clientで行います。ここでは新規セッションの作成・開始のみ行えます。
      </p>
      <SessionCreator />
    </div>
  );
}
