import { Link, Outlet } from "react-router-dom";
import { useUser } from "../components/Auth";
import LogoutButton from "../components/LogoutButton";
import styles from "./Header.module.css";

/**
 * Contains the "App bar" for the main authenticated app pages, including displaying the username,
 * the ability to logout, and links to all app sections.
 */
export default function MainLayout() {
  const { username } = useUser();
  return (
    <div>
      <h1>Pokemon Trader App</h1>
      <p>
        Hi {username}! View your Pokemon <Link to="/" className={styles.Link}>Pokemon</Link>, or check out everyone's<Link to="/favourites" className={styles.Link}>Favourites</Link>
      </p>
      <LogoutButton />
      <Outlet />
    </div>
  );
}
