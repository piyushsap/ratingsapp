import React from 'react';
import { Link } from 'react-router-dom';
import Signout from '../Hoc/Signout';

function Header(props) {

  console.log(props)
  const logout = (e) => {
    e.preventDefault();
    props.onLogout();
  }
  return (
    <nav className="navigation">
      <Link to="/">FoodGuru</Link>
      <div className="user">
        {props.session && props.session.getCurrentUser ? (
            <ul>
              <li><Link to="/login">Welcome {props.session.getCurrentUser.username}</Link></li>
              <li><Signout /></li>
            </ul>
        ) : (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
          )}
      </div>
    </nav>
  );
}
export default Header;