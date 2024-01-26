import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [all, setAll] = useState([]);

  const mystyle = {
    width: "100%",
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/getAllUser");
        setAll(res.data);
        console.log("all-user", all);
      } catch (error) {
        console.log(error);
      }

    }

    getUser();
  }, [])

  console.log(all);

  return (
    <div style={mystyle}>
      <h1>My-App</h1>
      <hr></hr>

      <Link to='/login'>Login</Link>
      <hr></hr>

      <Link to='/signup'>SignUp</Link>
      <hr></hr>

      <Link to='/users'>Users</Link>
      <hr></hr>

      <div >

        <h1>All Users...</h1>
        <table style={mystyle}>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </table>
        {all?.length === 0 ? "No User is Created.." :

          all.map((user) => {
            return <table style={mystyle}>
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>

              </tr>
            </table>
          })
        }
      </div>

    </div>
  )
}

export default Home;