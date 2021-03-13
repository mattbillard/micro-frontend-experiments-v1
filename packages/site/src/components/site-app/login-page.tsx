import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import jsCookie from 'js-cookie';
import { updateUsername } from '../../redux';

export const LoginPage = () => {
  const [username, setUsername] = useState<string>('username');
  const [password, setPassword] = useState<string>('12345');
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    ref.current.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username) {
      jsCookie.set('username', username);
      dispatch(updateUsername(username));
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                ref={ref}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
