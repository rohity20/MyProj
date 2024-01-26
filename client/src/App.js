import './App.css';
import Login from './login';
import Signup from './signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Users from './Users';
import { AuthProvider } from './auth';
import PrivateRoute from "./PrivateRoute";
import Todo from './Todo';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/' element={<PrivateRoute> <Users /> </PrivateRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/todo' element={<Todo />} ></Route> 
      </Routes> 
    </Router>
    </AuthProvider>
  );
}

export default App;
