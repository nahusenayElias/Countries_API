import { useState } from "react";
import { loginWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password);
  };
  return (
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          {/* <div class="col-12 col-md-8 col-lg-6 col-xl-5"> */}
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div>
                <div>Hello {user?.name}</div>
                <form>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input
                      class="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Full name"
                    />
                    <br />
                    <input
                      class="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                    />
                    <br />
                    <Button onClick={handleLogin}>Login</Button>
                    <br />
                    <br />
                    <Button onClick={() => navigate / "register"}>
                      Don't have an account?
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
