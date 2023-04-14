import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";

import { authActions } from "../store";
import { useState } from "react";

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const dispatch = useDispatch();

  const credentialsChangeHandler = (event) => {
    setError({
      email: null,
      password: null,
    });
    setCredentials((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  };

  const loginHandler = (event) => {
    event.preventDefault();

    setError({
      email: null,
      password: null,
    });

    const emailIsValid = credentials.email.includes("@");
    const passwordIsValid = credentials.password.length > 0;

    if (!emailIsValid || !passwordIsValid) {
      if (!emailIsValid) {
        setError((prev) => {
          return {
            ...prev,
            email: "Please enter the email address.",
          };
        });
      }
      if (!passwordIsValid) {
        setError((prev) => {
          return {
            ...prev,
            password: "Please provide the password.",
          };
        });
      }
      return;
    }

    dispatch(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={credentialsChangeHandler}
            />
            {error.email && <p className={classes.invalid}>{error.email}</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={credentialsChangeHandler}
            />
            {error.password && (
              <p className={classes.invalid}>{error.password}</p>
            )}
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
