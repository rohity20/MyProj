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

function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !dob) {
      alert("name or email or password or dob cannot be blank.");
    }
    else {

      try {
        const res = await axios.post("http://localhost:4000/api/createUser", {
          name,
          email,
          password,
          dob,
        });
        console.log(res);
    
        if (res) {
          alert("Registration Successfull");
          navigate("/login");
        } else {
          alert("Registration Failed");
          navigate("/signup");
        }
      } catch (error) {
        console.log(error);
        alert("Registration Failed")
      }
    
      setName('');
      setEmail('');
      setPassword('');
    }


  }
  return (
    <div className="App banner">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card>
          <Card.Body className='banner-inner'>
            <h1 className="text-center">REGISTER</h1>
            <FontAwesomeIcon icon={faUser} size="2xl" />
            <br></br>
            <br></br>
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Control type="date" placeholder="Enter Date of Birth" onChange={(e) => { setDob(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <br></br>
              <Button variant="primary" type="submit">
                REGISTER
              </Button>
              <br></br>
              <br></br>
              <Link to="/login" className="" style={{ color: "white" }}>
                CLICK HERE TO LOGIN
              </Link>

            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Signup;
