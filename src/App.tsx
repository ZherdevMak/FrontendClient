import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from "axios";
import {v1} from "uuid";

function App() {
  let [users, setUsers] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const getUsers = () => {
    axios.get("http://localhost:7500/users")
      .then(res => setUsers(res.data)
      )
  }
  useEffect(() => {
    getUsers()
  }, [])

  const searchUser = () => {
    let search = searchRef.current?.value
    axios.get("http://localhost:7500/users" + `/?search=${search}`)
      .then(res => setUsers(res.data)
      )
  }
  const addUser = () => {
    axios.post("http://localhost:7500/users", {name: inputRef.current?.value})
      .then(res => {
        getUsers()
      })}
  const updateUser = (id:string,name:string) => {
    axios.put("http://localhost:7500/users", {id:id,name:name})
      .then(res => {
        getUsers()
      })}
  const deliteUser = async (id: string) => {
    await axios.delete(`http://localhost:7500/users/${id}`)
    getUsers()
  }

  return (
    <div>
      <div>
        <input ref={searchRef}/>
        <button onClick={searchUser}>Search</button>
      </div>
      <div>
        <input ref={inputRef}/>
        <button onClick={addUser}>Add user</button>
      </div>
      <div>{users.map(u => {
          return (
            <div key={v1()}>
              <input defaultValue={u.name} onBlur={(e) => {updateUser(u._id, e.currentTarget.value)} }/>
              <button onClick={() => {
                deliteUser(u._id)
              }}>X
              </button>
            </div>
          )
        }
      )}</div>
    </div>
  );
}

export default App;
