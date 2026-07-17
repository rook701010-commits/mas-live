// docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md 準拠
// 認証なし（DL-002方針）。配信者はSession IDをURLで共有しPlayer/Overlayを接続する。

import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return <DashboardPage />;
}
