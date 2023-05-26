import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import styles from "./UsernamePasswordForm.module.css"


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

  return <button onClick={handleClick} className={styles.submitButton}>Log out</button>;
}
