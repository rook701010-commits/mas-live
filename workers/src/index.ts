// MAS LIVE Core API - Cloudflare Workers Entry Point
// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠
// Phase1: ルーティング骨格のみ。各handlerはPhase3で実装する。

import { failure, success } from "./utils/response";
import {
  handleSessionCreate,
  handleSessionStart,
  handleSessionCurrent,
  handleSessionEnd,
} from "./routes/session";
import {
  handlePlayerJoin,
  handlePlayerQuestion,
  handlePlayerAnswer,
} from "./routes/player";
import { handleBossAnswer, handleBossResult } from "./routes/boss";
import {
  handleRankingLive,
  handleRankingFinal,
  handleOverlayState,
} from "./routes/ranking";
import {
  handleAdminQuestionCreate,
  handleAdminQuestionUpdate,
  handleAdminQuestionDelete,
  handleAdminDashboard,
} from "./routes/admin";

export interface Env {
  DB: D1Database;
}

const routes: Record<string, (req: Request, env: Env) => Promise<Response>> = {
  "POST /api/session/create": handleSessionCreate,
  "POST /api/session/start": handleSessionStart,
  "GET /api/session/current": handleSessionCurrent,
  "POST /api/session/end": handleSessionEnd,
  "POST /api/player/join": handlePlayerJoin,
  "GET /api/player/question": handlePlayerQuestion,
  "POST /api/player/answer": handlePlayerAnswer,
  "POST /api/boss/answer": handleBossAnswer,
  "GET /api/boss/result": handleBossResult,
  "GET /api/ranking/live": handleRankingLive,
  "GET /api/ranking/final": handleRankingFinal,
  "GET /api/overlay/state": handleOverlayState,
  "POST /api/admin/question/create": handleAdminQuestionCreate,
  "PUT /api/admin/question/update": handleAdminQuestionUpdate,
  "DELETE /api/admin/question/delete": handleAdminQuestionDelete,
  "GET /api/admin/dashboard": handleAdminDashboard,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return success({ status: "ok" });
    }

    const key = `${request.method} ${url.pathname}`;
    const handler = routes[key];

    if (!handler) {
      return failure("NOT_FOUND", `No route for ${key}`, 404);
    }

    return handler(request, env);
  },
};
