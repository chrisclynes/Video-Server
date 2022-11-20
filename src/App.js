import { Routes, Route, Link, useNavigate } from "react-router-dom";

import SignIn from './components/Form/SignIn';
import SignUp from './components/Form/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
