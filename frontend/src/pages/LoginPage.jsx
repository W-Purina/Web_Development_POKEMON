import { Link, useNavigate } from "react-router-dom";
import UsernamePasswordForm from "../components/UsernamePasswordForm";
import { login } from "../api/api";
import { useAuth } from "../components/Auth";
import styles from "./LoginPage.module.css";

/**
 * Displays a form allowing the user to log in. If they do, will attempt to login via the API.
 * If successful, will redirect the user to the homepage. Otherwise, an error message will be displayed.
 * 
 * In addition, contains a link to the account creation page in case the user doesn't have an account.
 */
export default function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(username, password) {
    login(username, password)
      .then((res) => {
        setToken(res.data.token);
        navigate("/", { replace: true });
      })
      .catch(() => alert("Error when logging in!"));
  }

  return (
    <div className={styles.body}>
      <div className={styles.gradient}>
        <h1>Login</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.login}>
          <UsernamePasswordForm buttonText="Log in" onSubmit={handleSubmit} />
          <div >
          New to the site? <Link to="/register" className={styles.create}>Create an account!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
