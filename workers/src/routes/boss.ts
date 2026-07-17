// docs/prd/gdd/technical/07_API_Final_Specification.md - Boss API
// POST /boss/answer, GET /boss/result
// 空実装（Phase1: API疎通確認のみ。Phase3で本実装）

import { success } from "../utils/response";

export async function handleBossAnswer(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handleBossResult(_req: Request, _env: Env): Promise<Response> {
  return success({ score: 0, total: 0 }, 501);
}
