import { createContext, useContext } from 'react';
import useUsers from '../components/hooks/useUsers';


const UsersContext = createContext(null);


export function UsersProvider({ children }) {
const usersValue = useUsers();
return <UsersContext.Provider value={usersValue}>{children}</UsersContext.Provider>;
}


export function useUsersContext() {
const ctx = useContext(UsersContext);
if (!ctx) throw new Error('useUsersContext must be used within UsersProvider');
return ctx;
}