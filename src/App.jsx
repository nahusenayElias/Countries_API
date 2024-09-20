import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./component/Home";
import ErrorPage from "./component/ErrorPage";
import Countries from "./component/Countries";
import CountrySingle from "./component/CountrySingle";
import Register from "./component/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            {/* other routes will be here */}
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="countries/:single" element={<CountrySingle />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
