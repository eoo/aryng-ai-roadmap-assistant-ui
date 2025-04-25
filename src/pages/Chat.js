import Chat from "../components/Chat";
import { useAuth } from "../providers/AuthProvider";

const ChatPage = () => {
  const auth = useAuth();

  return <Chat email={auth.email} />;
};

export default ChatPage;
