import { useState } from "react";
import styles from "./UsernamePasswordForm.module.css"
/**
 * Allows the user to enter a username and password. When the "submit" button
 * is clicked, raises its onSubmit event, supplying the entered username and
 * password. Button text can be customized using the buttonText prop.
 */
export default function UsernamePasswordForm({ buttonText, onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="txtUsername"
        placeholder="username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        className={styles.textInput}
      />
      <input
        type="password"
        id="txtPassword"
        placeholder="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className={styles.passwordInput}
      />
      <button type="submit" className={styles.submitButton}>{buttonText || "Submit"}</button>
    </form>
  );
}
