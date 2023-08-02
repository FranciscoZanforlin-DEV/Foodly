import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserSessionContext } from './UserContext';

const backgroundImage = require('../../assets/fondo.jpg');

const RegistroUsuario = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const { addUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserSessionContext);

  const registerUser = async () => {
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

    try {
      await AsyncStorage.setItem(`user-${newUser.id}`, JSON.stringify(newUser));
      addUser(newUser);
      setCurrentUser(null);
      Alert.alert('Éxito', 'Registro exitoso');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al guardar los datos del usuario:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={-200}>
          <View style={styles.registerContainer}>
            <Text style={styles.titleRegister}>Registro de Usuario</Text>
            <Text style={styles.registerIndicator}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.registerIndicator}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
            <Text style={styles.registerIndicator}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
            />
            <Text style={styles.registerIndicator}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={correo}
              onChangeText={setCorreo}
            />
            <Text style={styles.registerIndicator}>Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              value={usuario}
              onChangeText={setUsuario}
            />
            <Text style={styles.registerIndicator}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />
            <View style={styles.buttonContainer}>
              <Button title="Registrarse" onPress={registerUser} color="#FF69B4" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  titleRegister: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  registerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 70,
  },
  registerIndicator: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF69B4',
  },
  input: {
    height: 40,
    borderColor: '#FF69B4',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 4,
  },
});

export default RegistroUsuario;
