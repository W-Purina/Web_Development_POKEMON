import { Link, useNavigate } from "react-router-dom";
import UsernamePasswordForm from "../components/UsernamePasswordForm";
import { createAccount } from "../api/api";
import { useAuth } from "../components/Auth";
import styles from "./LoginPage.module.css"
/**
 * Displays a form allowing the user to create an account. If they do, will attempt to register via the API.
 * If successful, will redirect the user to the homepage. Otherwise, an error message will be displayed.
 * 
 * In addition, contains a link to the login page in case the user already has an account.
 */
export default function RegisterPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(username, password) {
    createAccount(username, password)
      .then((res) => {
        setToken(res.data.token);
        navigate("/", { replace: true });
      })
      .catch(() => alert("Error when creating account!"));
  }

  return (
    <div className={styles.body}>
      <div className={styles.gradient}>
        <h1>Create Account</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.login}>
          <UsernamePasswordForm buttonText="Create account" onSubmit={handleSubmit} />
          <div >
            Already have an account? <Link to="/login" className={styles.create}>Click here to log in!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
