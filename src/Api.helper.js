import axios from "axios"

const API_URL = "http://localhost:9000"
const USERS_URL = `${API_URL}/users/`
const GAUGES_URL = `${API_URL}/GaugesApp/`

async function createUser(firstName, lastName) {
    const { data: newUser } = await axios.post(API_URL, {
        firstName,
        lastName
    })
    return newUser
}

async function deleteUser(id) {
    return await axios.delete(`${USERS_URL}`)
}

async function updateUser(id, payload) {
    const { data: newUser } = await axios.put(`${USERS_URL}`, payload)
    return newUser
}

async function getAllUsers() {
    const { data: users } = await axios.get(USERS_URL)
    return users
}

async function measureTime() {
    return await axios.get(GAUGES_URL)
}

export default { createUser, deleteUser, updateUser, getAllUsers, measureTime }