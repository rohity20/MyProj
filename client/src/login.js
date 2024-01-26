import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { Container, Card, Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import './login.css';
import {useAuth} from './auth.js'
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("email or password cannot blank.")
    }
    else {
      try {
        console.log("data-send", email, password);
        const res = await axios.post('http://localhost:4000/api/getUser', { email, password });
        if (res && res.data.success) {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
         
          alert("Login Successfull");
          console.log("res", res);
          setUser(res.data.user);
          console.log(user);
          navigate("/todo");
        } else {
          alert("Login Failed");
          navigate("/login");
        }

      } catch (error) {
        console.log(error);
        navigate("/login");
      }

       setPassword('');
       setEmail('');
    }


  }

  return (
    <div className="App banner">
    
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card>
          <Card.Body className='banner-inner'>
            <h1 className="text-center">LOGIN</h1>
            <FontAwesomeIcon icon={faUser} size="2xl" />
            <br></br>
            <br></br>
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
              <br></br>
              <br></br>
              <Link to="/signup" className="" style={{ color: "white" }}>
                CLICK HERE TO REGISTER
              </Link>

            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Login;
