import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  let location = useLocation();

  const { from } = location.state
    ? { from: location.state.from.pathname }
    : { from: "/" };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view protected pages.</p>

      <input
        id="username"
        placeholder="user name"
        onChange={e => setUserName(e.target.value)}
      />
      <br />

      <input
        id="password"
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Log in</button>

      <p>
        Not registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </>
  );
};

export default LoginPage;