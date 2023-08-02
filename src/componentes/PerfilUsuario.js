import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { UserContext, UserSessionContext } from './UserContext';

const PerfilUsuario = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const { deleteUser, currentUser } = useContext(UserSessionContext);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    deleteUser();
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.nombre);
      setApellido(currentUser.apellido);
      setTelefono(currentUser.telefono);
      setCorreo(currentUser.correo);
    }
  }, [currentUser]);

  return (
    <ImageBackground source={require('../../assets/logo.png')} style={styles.container}>
       <View style={styles.content}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
              autoFocus
            />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Apellido:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
              placeholder="Apellido"
            />
          ) : (
            <Text style={styles.value}>{apellido}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Teléfono:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Teléfono"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{telefono}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="Correo Electrónico"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{correo}</Text>
          )}
        </View>
        {editing ? (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  content: {
    flex: 1,
    marginTop: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
    alignSelf: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF',
  },
  value: {
    fontSize: 16,
    color: '#FFF',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FF4081',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilUsuario;
