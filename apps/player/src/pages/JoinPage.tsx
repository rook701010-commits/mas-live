import JoinForm from "../components/JoinForm";

interface Props {
  initialSessionId: string;
  joining: boolean;
  error: string | null;
  onJoin: (sessionId: string, nickname: string) => void;
}

export default function JoinPage(props: Props) {
  return <JoinForm {...props} />;
}
