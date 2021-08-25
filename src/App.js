import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./Api.helper"

export const App = () => {
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    const fetchUserAndSetUsers = async () => {
      const users = await APIHelper.getAllUsers()
      setUsers(users)
    }
    fetchUserAndSetUsers()

    APIHelper.measureTime()
  }, [])

  const createUser = async e => {
    e.preventDefault()
    if (!firstName || !lastName) {
      alert("please enter something")
      return
    }

    const newUser = await APIHelper.createUser(firstName, lastName)
    setUsers([...users, newUser])
  }

  const deleteUser = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteUser(id)
      setUsers(users.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateUser = async (e, id) => {
    e.stopPropagation()
    const payload = {
      active: !users.find(user => user._id === id).active,
    }
    const updatedUser = await APIHelper.updateUser(id, payload)
    setUsers(users.map(user => (user._id === id ? updatedUser : user)))
  }

  return (
      <div className="App">
        <form onSubmit={createUser}>
          <input
              id="user-input"
              type="text"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
          />
          <input
              id="user-input"
              type="text"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
          />
          <button type="submit" onClick={createUser}>
            Add
          </button>
        </form>

        <ul>
          {users.map(({ _id, firstName, lastName, status }, i) => (
              <li
                  key={i}
                  onClick={e => updateUser(e, _id)}
                  className={status ? "active" : ""}
              >
                {`${firstName} ${lastName}`} <span onClick={e => deleteUser(e, _id)}>X</span>
              </li>
          ))}
        </ul>
      </div>
  )
}

export default App