import { Link, Outlet } from "react-router-dom";
import { useUser } from "../components/Auth";
import LogoutButton from "../components/LogoutButton";

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
        Hi {username}! View your Pokemon <Link to="/">Pokemon</Link>, or check out everyone's<Link to="/favourites">Favourites</Link>
      </p>
      <LogoutButton />
      <Outlet />
    </div>
  );
}
