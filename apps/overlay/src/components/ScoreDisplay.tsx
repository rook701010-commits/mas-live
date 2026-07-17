interface Props {
  event: "normal" | "mini_boss" | "bonus_round" | "mid_boss" | "final_boss";
}

const EVENT_LABEL: Record<Props["event"], string | null> = {
  normal: null,
  mini_boss: "MINI BOSS",
  bonus_round: "BONUS ROUND",
  mid_boss: "MID BOSS",
  final_boss: "FINAL QUESTION",
};

// docs/prd/gdd/08_Game_Event_System.md 準拠のイベント演出表示
export default function ScoreDisplay({ event }: Props) {
  const label = EVENT_LABEL[event];
  if (!label) return null;

  return <div style={styles.badge}>{label}</div>;
}

const styles: Record<string, React.CSSProperties> = {
  badge: {
    display: "inline-block",
    marginTop: 8,
    padding: "6px 16px",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(90deg, #ff6f00, #d32f2f)",
    borderRadius: 8,
    letterSpacing: 2,
  },
};
