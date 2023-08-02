import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();
const UserSessionContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          // Si no hay usuarios almacenados, agrega el usuario admin predefinido
          const adminUser = {
            id: 'admin', // Asigna un ID específico al usuario admin
            nombre: 'admin',
            apellido: 'admin',
            telefono: '',
            correo: '',
            usuario: 'admin',
            contrasena: 'admin',
            recetas: [],
            isAdmin: true,
          };
          setUsers([adminUser]);
        }
      } catch (error) {
        console.error('Error al obtener usuarios de AsyncStorage:', error);
      }
    };

    fetchUsers();
  }, []);

  const saveUsersToStorage = async (updatedUsers) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error al guardar usuarios en AsyncStorage:', error);
    }
  };

  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);

    // Verificar si el usuario actual se está editando
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser); // Actualizar la sesión del usuario editado
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);

    // Verificar si el usuario eliminado es el usuario actual
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null); // Si es el usuario actual, establecerlo como nulo
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      <UserSessionContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </UserSessionContext.Provider>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, UserSessionContext };
