import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import * as jsCookie from 'js-cookie';

export const LoginPage = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref.current.focus();
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      jsCookie.set('username', username);
      window.location.reload();
    }
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input ref={ref} type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </label>
          </div>
          <div>
          <label>
              Password:
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

