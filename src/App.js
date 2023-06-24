import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import MyList from "./component/MyList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/myList" element={<MyList />} />

      </Routes>
    </Router>
  );
}

export default App;
