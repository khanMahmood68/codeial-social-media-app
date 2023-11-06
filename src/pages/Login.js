import { useState } from "react";
import styles from "../styles/login.module.css";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
 

  const handleSubmit = async (e)=> {
    e.preventDefault();

    setLoggingIn(true);

    if (!email || !password) {
      return addToast("Please enter both email and password", {
        appearance: "error",
      });
    }

    const response = await auth.login(email, password);

    if(response.success){
        addToast("Logged in successfully", {
            appearance: "success",
          });
    }else{
        addToast(response.message, {
            appearance: "error",
          });
    }
    setLoggingIn(false);
  }

  if(auth.user){
   return <Navigate to='/'/> // Redirect to the root path if the user is already authenticated  
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field} >
        <button disabled={loggingIn}>{loggingIn ? "Logging in..." : "Log In"}</button>
      </div>
    </form>
  );
}

export default Login;
