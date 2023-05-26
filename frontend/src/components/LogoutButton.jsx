import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

/**
 * A button which logs the user out when clicked.
 */
export default function LogoutButton() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    setToken(null);
    navigate("/login");
  }

  return <button onClick={handleClick}>Log out</button>;
}
