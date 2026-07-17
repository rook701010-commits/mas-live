import type { Env } from "../types";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Session API
// POST /session/create, POST /session/start, GET /session/current, POST /session/end
// 空実装（Phase1: API疎通確認のみ。Phase3で本実装）

import { success } from "../utils/response";

export async function handleSessionCreate(_req: Request, _env: Env): Promise<Response> {
  return success({ session_id: "not_implemented" }, 501);
}

export async function handleSessionStart(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handleSessionCurrent(_req: Request, _env: Env): Promise<Response> {
  return success({ status: "not_implemented" }, 501);
}

export async function handleSessionEnd(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}
