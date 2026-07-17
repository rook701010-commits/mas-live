import { useEffect, useState } from "react";
import { fetchDashboard, type DashboardStats } from "../api/client";
import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDashboard().then((res) => {
      if (cancelled) return;
      if (res.success) setStats(res.data);
      else setError(res.error.message);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p>エラー: {error}</p>;
  if (!stats) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>ダッシュボード</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <DashboardCard label="問題総数" value={stats.total_questions} />
        <DashboardCard label="公開済み問題" value={stats.published_questions} />
        <DashboardCard label="セッション総数" value={stats.total_sessions} />
        <DashboardCard label="参加者総数" value={stats.total_participants} />
        <DashboardCard label="平均正答率" value={`${stats.average_correct_rate}%`} />
      </div>
    </div>
  );
}
