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
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                />
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
                <br />
                <Button onClick={handleRegister}>Register</Button>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
