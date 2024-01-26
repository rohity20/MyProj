import './Todo.css';
import {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Todo() {
  const [item, setitem] = useState('');
  const [listItem, setListItem] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updateText, setUpdateText] = useState('');
  
  const addItem = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/item', {item: item});
      setListItem(prev => [...prev, res.data]);
      setitem('');
      console.log('create item');
      console.log(listItem);
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }


  }


  useEffect(() => {
    const getItems = async() => {
      try {
        const res = await axios.get('http://localhost:4000/api/getitems');
        // setListItem(prev => [...prev, res.data]);
        setListItem(res.data);
        console.log('show');
        console.log(listItem);
      } catch (error) {
        console.log(error);
      }}
    
    getItems()

  }, [])

  const updateItem = async(e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`http://localhost:4000/api/updateitem/${updateId}`, {item: updateText});
      const ind = listItem.findIndex(item =>item._id === updateId);
      listItem[ind].item = updateText;
      setUpdateText('');
      setUpdateId('');

    } catch (error) {
      console.log(error);
      
    }
  }
  const updateform = () => (
      
      <form onSubmit={(e)=>updateItem(e)}>
        <input placeholder='updated text' onChange={(e) =>setUpdateText(e.target.value)}></input>
        <button>Save</button>
      </form>

  )

  const deleteItem = async(id) => {
    try {
      
      const res = await axios.delete(`http://localhost:4000/api/deleteitem/${id}`);
      const newitem = listItem.filter(item => item._id != id);
      setListItem(newitem);
      console.log(res);
    } catch (error) {
      console.log(error);
      
    }
  }

  function formatDate(dat) {
    const date = new Date(dat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }
  

  return (
    <div className="App">
      
      <br></br>
      <Button variant="info" type="submit">
          <Link to="/login">Logout</Link>
        </Button>
        <br></br>

      <h1>TASK MANAGER APP</h1>
      <form onSubmit={(e) => addItem(e)}>
        <input type='text' placeholder='write something..' value={item} onChange={e => {setitem(e.target.value)}}></input>
        <button>Add</button>
      </form>
      <h1>All Tasks...</h1>
      <div className='itemlist'>
       { 
          listItem?.map((item1)=>(
            <div>
             {
              updateId===item1._id
              ? updateform()
              :<>
              <span key={item1._id}>{item1.item}</span>
              <button onClick={() => setUpdateId(item1._id)}>Update</button>
              <button onClick={()=>{deleteItem(item1._id)}}>Delete</button>
              <span key={item1._id}>{formatDate(item1.createdAt)}</span>
              <br></br>
              <br></br>
              </>
             }
              </div>
          ))
        }
      </div>
    
    </div>
  );
}

export default Todo;


// { 
//   listItem?.map((item1, index)=>(
//     <div>
//       {
//     updateId===item1 ? updateform():
//      <>
//       <span key={item1}>{item1}</span>
//       <button onClick={index => setUpdateId(index)}>Update</button>
//       <button>Delete</button>
//       <br></br>
//       </>
// }