import { useEffect } from "react";
import { useGameControl } from "../hooks/useGameControl";
import { useBossAnswer } from "../hooks/useBossAnswer";
import { getRankingFinal, RankingFinalResponse } from "../api/client";
import { useState } from "react";
import SessionControl from "../components/SessionControl";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerPanel from "../components/AnswerPanel";
import ScorePanel from "../components/ScorePanel";
import BattleResult from "../components/BattleResult";

const KEY_TO_CHOICE: Record<string, string> = { a: "A", b: "B", c: "C", d: "D" };

export default function DashboardPage() {
  const game = useGameControl();
  const bossAnswer = useBossAnswer(game.sessionId, game.question?.question_id ?? null);
  const [finalResult, setFinalResult] = useState<RankingFinalResponse | null>(null);

  useEffect(() => {
    if (game.sessionState?.status === "finished" && game.sessionId) {
      getRankingFinal(game.sessionId).then((res) => {
        if (res.success) setFinalResult(res.data);
      });
    }
  }, [game.sessionState?.status, game.sessionId]);

  // docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md キーボード操作
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!game.sessionId) return;

      if (key in KEY_TO_CHOICE && game.question) {
        bossAnswer.answer(KEY_TO_CHOICE[key]);
      } else if (key === " ") {
        e.preventDefault();
        game.goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [game, bossAnswer]);

  if (!game.sessionId) {
    return (
      <SessionControl
        busy={game.busy}
        error={game.error}
        onStart={game.start}
        onResume={game.resume}
      />
    );
  }

  if (finalResult) {
    return (
      <BattleResult
        result={finalResult}
        onReset={() => {
          setFinalResult(null);
          game.reset();
        }}
      />
    );
  }

  return (
    <div style={{ padding: 16, maxWidth: 560, margin: "0 auto" }}>
      <p style={{ fontSize: 12, color: "#888" }}>Session ID: {game.sessionId}</p>

      {game.question && (
        <>
          <QuestionDisplay
            questionNo={game.question.question_no}
            title={game.question.title}
            remainingSeconds={game.sessionState?.remaining_seconds ?? 0}
            participants={game.ranking?.participants ?? 0}
          />
          <AnswerPanel
            choices={game.question.choices}
            selected={bossAnswer.answered}
            disabled={!!bossAnswer.answered || bossAnswer.submitting}
            onSelect={bossAnswer.answer}
          />
        </>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button style={styles.nextButton} onClick={game.goNext} disabled={game.busy}>
          次の問題へ（Space）
        </button>
        <button style={styles.endButton} onClick={game.finish} disabled={game.busy}>
          配信終了
        </button>
      </div>

      {game.ranking && bossAnswer.result && (
        <ScorePanel
          bossScore={bossAnswer.result.score}
          bossTotal={bossAnswer.result.total}
          raidAverage={game.ranking.average}
          ranking={game.ranking.top}
        />
      )}

      {game.error && <p style={{ color: "#d32f2f" }}>{game.error}</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nextButton: {
    flex: 1,
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    background: "#1976d2",
    border: "none",
    borderRadius: 8,
  },
  endButton: {
    padding: "14px 20px",
    fontSize: 14,
    color: "#333",
    background: "#e0e0e0",
    border: "none",
    borderRadius: 8,
  },
};
