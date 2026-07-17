import { useEffect } from "react";
import { useQuestion } from "../hooks/useQuestion";
import { useAnswer } from "../hooks/useAnswer";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";

// docs/prd/gdd/02_Game_Rules.md: MVPは20問固定
const TOTAL_QUESTIONS = 20;

interface Props {
  sessionId: string;
  participantToken: string;
  onFinished: () => void;
}

export default function GamePage({ sessionId, participantToken, onFinished }: Props) {
  const { question, sessionState, error } = useQuestion(sessionId);
  const { answer, answeredQuestionId, submitting, error: answerError, resetForNewQuestion } =
    useAnswer(sessionId, participantToken);

  useEffect(() => {
    if (sessionState?.status === "finished") {
      onFinished();
    }
  }, [sessionState?.status, onFinished]);

  useEffect(() => {
    resetForNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.question_id]);

  if (error) {
    return <p style={{ padding: 20 }}>問題を取得できませんでした: {error}</p>;
  }

  if (!question) {
    return <p style={{ padding: 20 }}>問題を読み込んでいます...</p>;
  }

  const hasAnswered = answeredQuestionId === question.question_id;
  const remainingSeconds = sessionState?.remaining_seconds ?? 0;
  const isTimeUp = remainingSeconds <= 0;

  return (
    <div style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
      <QuestionCard
        questionNo={question.question_no}
        totalQuestions={TOTAL_QUESTIONS}
        title={question.title}
        remainingSeconds={remainingSeconds}
      />
      <AnswerButton
        choices={question.choices}
        disabled={hasAnswered || submitting || isTimeUp}
        selected={hasAnswered ? "回答済み" : null}
        onSelect={(choice) => answer(question.question_id, choice)}
      />
      {hasAnswered && <p style={{ textAlign: "center", marginTop: 12 }}>回答を送信しました。次の問題をお待ちください。</p>}
      {!hasAnswered && isTimeUp && (
        <p style={{ textAlign: "center", marginTop: 12, color: "#d32f2f" }}>時間切れです。次の問題をお待ちください。</p>
      )}
      {answerError && <p style={{ color: "#d32f2f", textAlign: "center" }}>{answerError}</p>}
    </div>
  );
}
