import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";


function App() {
  let [users,setUsers] = useState<any[]>([])
  useEffect(() => {
    axios.get("http://localhost:7500/users")
      .then(res => setUsers(res.data)
      )
  },[])
  return (
    <div>{users.map(u => <div>{u.name}</div>)}</div>
  );
}

export default App;
