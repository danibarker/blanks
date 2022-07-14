import { NavPageLinks } from "./NavPageLinks";
import { NavAccountSection } from "./NavAccountSection";
import { useAuth } from "../../providers/AuthProvider";

export const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <NavPageLinks />
      <NavAccountSection user={user} logout={logout} />
    </div>
  );
};
