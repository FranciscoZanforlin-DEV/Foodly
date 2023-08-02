import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground, Text, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserSessionContext } from './UserContext';

const backgroundImage = require('../../assets/fondo.jpg');

const LoginUsuario = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario ingresado
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña ingresada

  const { users } = useContext(UserContext); // Acceso al contexto de usuarios
  const { setCurrentUser } = useContext(UserSessionContext); // Acceso al contexto de sesión de usuario

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Usuario y contraseña son requeridos');
      return;
    }

    const user = users.find((user) => user.usuario === username && user.contrasena === password); // Buscar al usuario en la lista de usuarios

    if (user) {
      AsyncStorage.setItem('currentUser', JSON.stringify(user))
        .then(() => {
          setCurrentUser(user); // Establecer el usuario actual en el contexto de sesión de usuario
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
          navigation.navigate('Home'); // Navegar a la pantalla de inicio después del inicio de sesión exitoso
          setUsername(''); // Restablecer el valor del nombre de usuario
          setPassword(''); // Restablecer el valor de la contraseña
        })
        .catch((error) => {
          console.log('Error al guardar el usuario actual en AsyncStorage:', error);
        });
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleLetter}>F</Text>
            <Text style={styles.titleLetter}>o</Text>
            <Text style={styles.titleLetter}>o</Text>
            <Text style={styles.titleLetter}>d</Text>
            <Text style={styles.titleLetter}>l</Text>
            <Text style={styles.titleLetter}>y</Text>
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.titleLogin}>Iniciar Sesión</Text>
          <Text style={styles.loginIndicator}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={setUsername}
            value={username}
          />
          <Text style={styles.loginIndicator}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <View style={styles.buttonContainer}>
            <Button title="Iniciar sesión" onPress={handleLogin} color="#FF69B4" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Registrarse" onPress={() => navigation.navigate('Registro')} color="#FF69B4" />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLogin: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FF69B4',
    textAlign: 'center',
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flexDirection: 'row',
  },
  titleLetter: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#FF69B4',
    textShadowOffset: { width: -3, height: 2 },
    textShadowRadius: 20,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 170,
  },
  loginIndicator: {
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

export default LoginUsuario;
