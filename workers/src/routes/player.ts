// docs/prd/gdd/technical/07_API_Final_Specification.md - Player API
// POST /player/join, GET /player/question, POST /player/answer
// 空実装（Phase1: API疎通確認のみ。Phase3で本実装）

import { success } from "../utils/response";

export async function handlePlayerJoin(_req: Request, _env: Env): Promise<Response> {
  return success({ participant_token: "not_implemented" }, 501);
}

export async function handlePlayerQuestion(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handlePlayerAnswer(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}
