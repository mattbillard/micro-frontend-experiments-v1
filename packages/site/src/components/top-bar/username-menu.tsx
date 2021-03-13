import React from 'react';
import jsCookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState, updateUsername } from '../../redux';

interface IUsernameProps {
  toggleUserMenu: () => void;
}

export const UserMenu = (props: IUsernameProps) => {
  const dispatch = useDispatch();
  const { toggleUserMenu } = props;
  const { username } = useSelector((state: IStoreState) => state.containerAppReducer);

  const logout = () => {
    toggleUserMenu();
    setTimeout(() => {
      jsCookie.remove('username');
      dispatch(updateUsername(undefined));
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
