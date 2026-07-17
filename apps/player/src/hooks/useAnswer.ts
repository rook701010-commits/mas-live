import { useCallback, useState } from "react";
import { submitAnswer } from "../api/client";

export function useAnswer(sessionId: string | null, participantToken: string | null) {
  const [answeredQuestionId, setAnsweredQuestionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answer = useCallback(
    async (questionId: string, choice: string) => {
      if (!sessionId || !participantToken) return false;
      setSubmitting(true);
      setError(null);

      const res = await submitAnswer(sessionId, participantToken, questionId, choice);
      setSubmitting(false);

      if (!res.success) {
        // DUPLICATE_ANSWERは「既に回答済み」として扱い、UI上はエラー表示しない
        if (res.error.code === "DUPLICATE_ANSWER") {
          setAnsweredQuestionId(questionId);
          return true;
        }
        if (res.error.code === "TIMEOUT") {
          setError("時間切れです。次の問題をお待ちください。");
          return false;
        }
        setError(res.error.message);
        return false;
      }

      setAnsweredQuestionId(questionId);
      return true;
    },
    [sessionId, participantToken]
  );

  const resetForNewQuestion = useCallback(() => {
    setAnsweredQuestionId(null);
    setError(null);
  }, []);

  return { answer, answeredQuestionId, submitting, error, resetForNewQuestion };
}
