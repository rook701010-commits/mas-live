interface Props {
  bossScore: number;
  raidAverage: number;
  winner: "boss" | "raid";
}

// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md Step5
export default function ResultAnimation({ bossScore, raidAverage, winner }: Props) {
  const bossWon = winner === "boss";

  return (
    <div style={styles.wrap}>
      <h1 style={{ ...styles.headline, color: bossWon ? "#ff5252" : "#448aff" }}>
        {bossWon ? "rook7 DEFENSE SUCCESS!!" : "RAID WIN!!"}
      </h1>
      <p style={styles.score}>
        Boss {bossScore} — Raid {raidAverage}
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { textAlign: "center", color: "#fff" },
  headline: { fontSize: 40, margin: 0, textShadow: "0 0 12px rgba(0,0,0,0.8)" },
  score: { fontSize: 20, marginTop: 8 },
};
