// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のレスポンス形式
// docs/prd/gdd/technical/prompts/decision-log/DL-013_Frontend_API_Base_URL.md
// 本番はフロント(Pages等)とAPI(Workers)が別オリジンになるためCORSヘッダーを付与する。

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function success<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export function failure(code: string, message: string, status = 400): Response {
  return new Response(
    JSON.stringify({ success: false, error: { code, message } }),
    { status, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
  );
}
