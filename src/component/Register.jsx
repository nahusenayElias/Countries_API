import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name) {
      alert("name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  };
  //TODO: Add a check to see if user is logged in and navigate to countries if logged in.

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};
export default Register;
