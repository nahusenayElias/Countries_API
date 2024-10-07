import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./component/Home";
import ErrorPage from "./component/ErrorPage";
import Countries from "./component/Countries";
import CountrySingle from "./component/CountrySingle";
import Register from "./component/Register";
import Login from "./component/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import { auth } from "./auth/firebase";
import Favourites from "./component/Favourites";


function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/* other routes will be here */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute user={user} />}>
            <Route path="/countries" element={<Countries />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="countries/:single" element={<CountrySingle />} />
          </Route>

            <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
