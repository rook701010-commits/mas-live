// docs/prd/gdd/technical/07_API_Final_Specification.md - Ranking / Overlay API
// GET /ranking/live, GET /ranking/final, GET /overlay/state
// 空実装（Phase1: API疎通確認のみ。Phase3で本実装）

import { success } from "../utils/response";

export async function handleRankingLive(_req: Request, _env: Env): Promise<Response> {
  return success({ participants: 0, average: 0, top: [] }, 501);
}

export async function handleRankingFinal(_req: Request, _env: Env): Promise<Response> {
  return success({ boss_score: 0, raid_average: 0, winner: null }, 501);
}

export async function handleOverlayState(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}
