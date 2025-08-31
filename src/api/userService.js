import axios from 'axios';


const api = axios.create({
baseURL: 'https://jsonplaceholder.typicode.com',
headers: { 'Content-Type': 'application/json' },
});


export async function getUsers() {
const { data } = await api.get('/users');
return data;
}


export async function getUserById(id) {
const { data } = await api.get(`/users/${id}`);
return data;
}


export async function createUser(user) {
const { data } = await api.post('/users', user);
return data; // JSONPlaceholder echoes the posted object with an id
}


export async function updateUser(id, user) {
const { data } = await api.put(`/users/${id}`, user);
return data;
}


export async function deleteUser(id) {
await api.delete(`/users/${id}`);
return true;
}