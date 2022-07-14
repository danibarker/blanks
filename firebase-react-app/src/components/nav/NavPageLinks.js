import { Link } from "react-router-dom";

export const NavPageLinks = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/create-doc">Create Doc</Link>
      </li>
    </ul>
  );
};
