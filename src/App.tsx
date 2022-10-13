import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {v1} from "uuid";

function App() {
  let [users, setUsers] = useState<any[]>([])
  const getUsers = () => {
    axios.get("http://localhost:7500/users")
      .then(res => setUsers(res.data)
      )
  }
  useEffect(() => {
    getUsers()
  }, [])

  const addUser = () => {
    axios.post("http://localhost:7500/users")
      .then(res => {
        getUsers()
      })
  }

  return (
    <div>
      <div>
        <button onClick={addUser}>Add user</button>
      </div>
      <div>{users.map(u => <div key={v1()}>{u.name}</div>)}</div>
    </div>
  );
}

export default App;
