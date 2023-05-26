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
        Hi {username}! View your <Link to="/">Pokemon</Link>, or check out everyone's favourites
        (not yet implemented)!
      </p>
      <LogoutButton />
      <Outlet />
    </div>
  );
}
