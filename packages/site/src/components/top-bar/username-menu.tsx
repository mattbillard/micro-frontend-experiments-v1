import React from 'react';
import jsCookie from 'js-cookie';

interface IUsernameProps {
  toggleUserMenu: () => void;
}

export const UserMenu = (props: IUsernameProps) => {
  const username = jsCookie.get('username');
  const { toggleUserMenu } = props;

  const logout = () => {
    toggleUserMenu();
    setTimeout(() => {
      jsCookie.remove('username');
      window.location.reload();
    });
  };

  // prettier-ignore
  return (
    <div className="dropdown-menu user-menu">
      <div>
        <strong>Logged In As: </strong>
        {username}
        <br/><br/>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  )
};
