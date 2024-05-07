import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const handleSignOut = () => {
  const navigate = useNavigate;
  const signOut = useSignOut;

  signOut();
  navigate("/login");
};

export default handleSignOut;
