
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './Users.css';
import { Button } from 'react-bootstrap';
import { useAuth } from './auth';

const Users = () => {
  const [all, setAll] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/getAllUser');
        setAll(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  function formatDate(dat) {
    const date = new Date(dat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <br></br>
      <div className="d-flex align-items-center" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        
        <Button variant="info" type="submit">
          <Link to="/login">Logout</Link>
        </Button>
      </div>
      <hr />
      <div>
        <h1><b>Hello {auth.user.name}!</b></h1>
        <Table bordered responsive style={{ width: '100%', border: 'solid grey' }}>
          <thead>
            <tr>
              <th style={{ width: '5%', padding: '20px 0' }}>#</th>
              <th style={{ width: '15%' }}>Name</th>
              <th style={{ width: '20%' }}>Email</th>
              <th style={{ width: '15%' }}>Date of Birth</th>
              <th style={{ width: '25%' }}>Role</th>
              <th style={{ width: '25%' }}>Date Created</th>
              
            </tr>
          </thead>
          <tbody>
            {all?.length === 0 ? (
              <tr>
                <td colSpan="6">No User is Created...</td>
              </tr>
            ) : (
              all.map((user, index) => (
                <tr key={user.id} style={{ width: '100%', border: 'solid grey', padding: '10px 0' }}>
                  <td style={{ padding: '20px 0' }}>{index + 1}</td>
                  <td >{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.dob)}</td>
                  <td>Reviewer</td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
