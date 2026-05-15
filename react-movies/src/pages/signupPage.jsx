import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    const result = await context.register(userName, password);

    if (result) {
      setRegistered(true);
    }
  };

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>Sign Up</h2>

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

      <button onClick={register}>Sign Up</button>

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default SignUpPage;