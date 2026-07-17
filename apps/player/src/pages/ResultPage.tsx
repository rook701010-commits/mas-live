import { useEffect, useState } from "react";
import { getRankingFinal, RankingFinalResponse } from "../api/client";
import ResultPanel from "../components/ResultPanel";

interface Props {
  sessionId: string;
  nickname: string;
}

export default function ResultPage({ sessionId, nickname }: Props) {
  const [result, setResult] = useState<RankingFinalResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getRankingFinal(sessionId).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error.message);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (error) return <p style={{ padding: 20 }}>結果を取得できませんでした: {error}</p>;
  if (!result) return <p style={{ padding: 20 }}>結果を集計しています...</p>;

  return <ResultPanel result={result} nickname={nickname} />;
}
