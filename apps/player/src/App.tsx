// docs/prd/gdd/technical/prompts/04_Claude_Phase4_Player_Client.md 準拠
// Phase4: 参加 → 問題表示 → 回答 → 結果表示

import { useState } from "react";
import { useSession } from "./hooks/useSession";
import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function getSessionIdFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("session") ?? "";
}

type Page = "join" | "game" | "result";

export default function App() {
  const { participant, join, joining, error } = useSession();
  const [page, setPage] = useState<Page>(participant ? "game" : "join");

  if (page === "join" || !participant) {
    return (
      <JoinPage
        initialSessionId={getSessionIdFromUrl()}
        joining={joining}
        error={error}
        onJoin={async (sessionId, nickname) => {
          const ok = await join(sessionId, nickname);
          if (ok) setPage("game");
        }}
      />
    );
  }

  if (page === "game") {
    return (
      <GamePage
        sessionId={participant.sessionId}
        participantToken={participant.participantToken}
        onFinished={() => setPage("result")}
      />
    );
  }

  return <ResultPage sessionId={participant.sessionId} nickname={participant.nickname} />;
}
