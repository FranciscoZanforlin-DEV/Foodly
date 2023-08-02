import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { UserContext, UserSessionContext } from './UserContext';

const TablaUsuarios = () => {
  // Obtener el contexto del usuario y la sesión del usuario
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
  const { currentUser, setCurrentUser } = useContext(UserSessionContext); // Actualizado: Utilizar setCurrentUser en lugar de setCurrentUserById

  // Estados para los campos del formulario de registro
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  // Función para manejar el registro de un nuevo usuario
  const handleAddUser = () => {
    // Validar que todos los campos estén completos
    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !correo.trim() || !usuario.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Validar longitud de la contraseña
    if (contrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Crear un nuevo objeto de usuario
    const newUser = {
      id: Date.now().toString(),
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo,
      usuario: usuario,
      contrasena: contrasena,
      recetas: [],
    };

    // Agregar el usuario a la lista
    addUser(newUser);

    // Limpiar los campos del formulario
    setNombre('');
    setApellido('');
    setTelefono('');
    setCorreo('');
    setUsuario('');
    setContrasena('');
  };

  // Función para manejar la edición de un usuario existente
  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setNombre(userToEdit.nombre);
      setApellido(userToEdit.apellido);
      setTelefono(userToEdit.telefono);
      setCorreo(userToEdit.correo);
      setUsuario(userToEdit.usuario);
      setContrasena(userToEdit.contrasena);
      setEditingUserId(userId);
    }
  };

  // Función para guardar la edición de un usuario
  const handleSaveEdit = () => {
    if (!nombre || !apellido || !telefono || !correo || !usuario || !contrasena) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }
  
    const editedUser = {
      id: editingUserId,
      nombre,
      apellido,
      telefono,
      correo,
      usuario,
      contrasena,
      recetas: [],
    };
  
    updateUser(editedUser);
  
    setNombre('');
    setApellido('');
    setTelefono('');
    setCorreo('');
    setUsuario('');
    setContrasena('');
    setEditingUserId(null);
  
    // Verificar si el usuario editado es el usuario actual
    if (currentUser && currentUser.id === editedUser.id) {
      setCurrentUser(editedUser); // Establecer el usuario editado como usuario actual
    }
  };
  // Función para manejar la eliminación de un usuario existente
  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteUser(userId),
        },
      ]
    );
  };

  // Función para renderizar cada elemento de usuario en la lista
  const renderUsuario = ({ item }) => (
    <View style={styles.usuarioContainer}>
      <Text style={styles.usuarioText}><Text style={styles.usuarioLabel}>Nombre:</Text> {item.nombre}</Text>
      <Text style={styles.usuarioText}><Text style={styles.usuarioLabel}>Apellido:</Text> {item.apellido}</Text>
      <Text style={styles.usuarioText}><Text style={styles.usuarioLabel}>Correo:</Text> {item.correo}</Text>
      <Text style={styles.usuarioText}><Text style={styles.usuarioLabel}>Teléfono:</Text> {item.telefono}</Text>
      <Text style={styles.usuarioText}><Text style={styles.usuarioLabel}>Usuario:</Text> {item.usuario}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditUser(item.id)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Nombre:</Text>
          <TextInput
            style={styles.formInput}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
          />
          <Text style={styles.formLabel}>Apellido:</Text>
          <TextInput
            style={styles.formInput}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Apellido"
          />
          <Text style={styles.formLabel}>Teléfono:</Text>
          <TextInput
            style={styles.formInput}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Teléfono"
          />
          <Text style={styles.formLabel}>Correo Electrónico:</Text>
          <TextInput
            style={styles.formInput}
            value={correo}
            onChangeText={setCorreo}
            placeholder="Correo Electrónico"
          />
          <Text style={styles.formLabel}>Usuario:</Text>
          <TextInput
            style={styles.formInput}
            value={usuario}
            onChangeText={setUsuario}
            placeholder="Usuario"
          />
          <Text style={styles.formLabel}>Contraseña:</Text>
          <TextInput
            style={styles.formInput}
            value={contrasena}
            onChangeText={setContrasena}
            placeholder="Contraseña"
            secureTextEntry
          />
          {editingUserId ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.buttonText}>Guardar Edición</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddUser}
            >
              <Text style={styles.buttonText}>Registrar Usuario</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={users}
          renderItem={renderUsuario}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaUsuarios}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listaUsuarios: {
    marginTop: 16,
  },
  usuarioContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#F2F2F2',
  },
  usuarioText: {
    fontSize: 16,
    marginBottom: 8,
  },
  usuarioLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#FFC107',
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default TablaUsuarios;
