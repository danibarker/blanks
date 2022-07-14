import { Link } from "react-router-dom";

export default NavAccountSection = ({ user, logout }) => {
  return (
    <div>
      <h3>Account</h3>
      <ul>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <li>
            <div
              onClick={() => {
                logout();
              }}
            >
              Logout
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
