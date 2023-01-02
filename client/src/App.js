import './App.css';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Settings from './components/pages/settings/Settings';
import Single from './components/pages/single/Single';
import Write from './components/pages/write/Write';
import Topbar from './components/topbar/Topbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
     
     <BrowserRouter>
     <Topbar/>
     <Routes>
     
     <Route
            path="/"
            element={<Home />}
          />
          <Route
          path="/register"
          element={user ? <Home/> : <Register />}
        />
        <Route
            path="/login"
            element={user ? <Home/> : <Login />}
          />
          <Route
            path="/write"
            element={user ? <Write/> : <Register />}
          />
          <Route
            path="/settings"
            element={user ? <Settings/> : <Register />}
          />
          <Route
            path="/post/:postId"
            element={<Single />}
          />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
