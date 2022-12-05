import { Routes, Route, Link, useNavigate } from "react-router-dom";

import SignIn from './components/Form/signin/SignIn';
import SignUp from './components/Form/signup/SignUp';
import Upload from './components/upload/Upload';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
