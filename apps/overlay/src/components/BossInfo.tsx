interface Props {
  bossName: string;
}

// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md Step3
// 防衛記録・連勝数はSeason System範囲のため、DBに履歴テーブルができ次第追加する（DL-009参照）
export default function BossInfo({ bossName }: Props) {
  return (
    <div style={styles.wrap}>
      <span style={styles.label}>BOSS</span>
      <span style={styles.name}>{bossName}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  label: { fontSize: 12, letterSpacing: 2, color: "#ff5252" },
  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
};
