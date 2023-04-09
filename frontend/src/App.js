import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./containers/Mainpage";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Reset from "./containers/ResetPassword";
import Change from "./containers/ChangePassword";
import Meets from "./containers/Meets";
import ShowEvent from "./containers/ShowEvent";
import CreateEvent from "./containers/CreateEvent";

function App() {
  return (
    <>
      {/* <CssBaseline /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route element={<Reset />} path="/reset"></Route>
          <Route element={<Change />} path="/change"></Route>
          <Route element={<Meets />} path="/meets"></Route>
          <Route element={<ShowEvent />} path="/showevent"></Route>
          <Route element={<CreateEvent />} path="/createevent"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
