import axios from "axios"

const API_URL = "http://localhost:9000/users/"

async function createUser(firstName, lastName) {
    const { data: newUser } = await axios.post(API_URL, {
        firstName,
        lastName
    })
    return newUser
}

async function deleteUser(id) {
    return await axios.delete(`${API_URL}${id}`)
}

async function updateUser(id, payload) {
    const { data: newUser } = await axios.put(`${API_URL}${id}`, payload)
    return newUser
}

async function getAllUsers() {
    const { data: users } = await axios.get(API_URL)
    return users
}

export default { createUser, deleteUser, updateUser, getAllUsers }