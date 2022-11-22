import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Main from "./Components/Main";
import NotFound from "./Components/NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";

function App() {
  const user = localStorage.getItem('token')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'login'} element={<Login/>}/>
          <Route path={'register'} element={<Register/>}/>
          {user && <Route path={'/main'} element={<Main/>}/>}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
