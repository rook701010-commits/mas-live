import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getRankingFinal } from "../api/client";
import ResultPanel from "../components/ResultPanel";
export default function ResultPage({ sessionId, nickname }) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancelled = false;
        getRankingFinal(sessionId).then((res) => {
            if (cancelled)
                return;
            if (res.success) {
                setResult(res.data);
            }
            else {
                setError(res.error.message);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [sessionId]);
    if (error)
        return _jsxs("p", { style: { padding: 20 }, children: ["\u7D50\u679C\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F: ", error] });
    if (!result)
        return _jsx("p", { style: { padding: 20 }, children: "\u7D50\u679C\u3092\u96C6\u8A08\u3057\u3066\u3044\u307E\u3059..." });
    return _jsx(ResultPanel, { result: result, nickname: nickname });
}
