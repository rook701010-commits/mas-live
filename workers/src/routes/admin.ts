// docs/prd/gdd/technical/07_API_Final_Specification.md - Admin API
// POST /admin/question/create, PUT /admin/question/update, DELETE /admin/question/delete, GET /admin/dashboard
// 空実装（Phase1: API疎通確認のみ。Phase7で本実装）

import { success } from "../utils/response";

export async function handleAdminQuestionCreate(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handleAdminQuestionUpdate(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handleAdminQuestionDelete(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}

export async function handleAdminDashboard(_req: Request, _env: Env): Promise<Response> {
  return success({}, 501);
}
