import { useEffect, useState, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../../api/userService';


export default function useUsers() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }


const fetchUsers = useCallback(async () => {
setLoading(true);
setError('');
try {
const data = await getUsers();
setUsers(data);
} catch (err) {
setError('Failed to fetch users. Please try again.');
} finally {
setLoading(false);
}
}, []);


useEffect(() => { fetchUsers(); }, [fetchUsers]);


// Create
const addUser = async (payload) => {
setError('');
try {
const created = await createUser(payload);
const withId = { ...payload, id: created.id ?? Date.now() };
setUsers((prev) => [withId, ...prev]);
setBanner({ type: 'success', message: 'User created successfully.' });
} catch (err) {
setError('Failed to create user. Please try again.');
setBanner({ type: 'error', message: 'Failed to create user.' });
}
};


// Update
const editUser = async (id, payload) => {
setError('');
try {
await updateUser(id, payload);
setUsers((prev) => prev.map((u) => (u.id === Number(id) ? { ...u, ...payload } : u)));
setBanner({ type: 'success', message: 'User updated successfully.' });
} catch (err) {
setError('Failed to update user. Please try again.');
setBanner({ type: 'error', message: 'Failed to update user.' });
}
};


// Delete
const removeUser = async (id) => {
setError('');
try {
await deleteUser(id);
setUsers((prev) => prev.filter((u) => u.id !== id));
setBanner({ type: 'success', message: 'User deleted successfully.' });
} catch (err) {
setError('Failed to delete user. Please try again.');
setBanner({ type: 'error', message: 'Failed to delete user.' });
}
};
}