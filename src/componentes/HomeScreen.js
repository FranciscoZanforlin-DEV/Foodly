import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserSessionContext, UserContext } from './UserContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserSessionContext); // Obtenemos el currentUser y setCurrentUser del contexto
  const { setCurrentUser: updateUser } = useContext(UserContext);

  const handleRecipesPress = () => {
    navigation.navigate('Recetas'); // Navega a la pantalla de recetas
  };

  const handlePerfilUsuarioPress = () => {
    navigation.navigate('PerfilUsuario'); // Navega a la pantalla PerfilUsuario
  };

  const handleMisRecetasPress = () => {
    navigation.navigate('MisRecetas'); // Navega a la pantalla de MisRecetas
  };

  const handleDespensaPress = () => {
    navigation.navigate('Despensa'); // Navega a la pantalla de despensa
  };

  const handleLogout = () => {
    setCurrentUser(null); // Establece el usuario actual como null para cerrar la sesión
    navigation.navigate('Login'); // Navega de regreso a la pantalla de inicio de sesión
  };

  const handleTablaUsuariosPress = () => {
    navigation.navigate('TablaUsuarios'); // Navega a la pantalla de Tabla Usuarios
  };

  const handleDeleteAll = async () => {
    if (currentUser.isAdmin) { // Verifica si el usuario actual es admin
      try {
        await AsyncStorage.clear();
        updateUser([]); // Actualiza el estado de usuarios vacío
        setCurrentUser(null); // Elimina el usuario actual del contexto
        Alert.alert('Eliminado', 'Todos los objetos se eliminaron correctamente.');
      } catch (error) {
        console.error('Error al eliminar los objetos:', error);
        Alert.alert('Error', 'No se pudieron eliminar los objetos.');
      }
    } else {
      Alert.alert('Acceso denegado', 'No tienes permisos para eliminar todos los objetos.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/FondoRosa.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Foodly</Text>
        <TouchableOpacity style={styles.button} onPress={handlePerfilUsuarioPress}>
          <Text style={styles.buttonText}>Mi Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecipesPress}>
          <Text style={styles.buttonText}>Recetas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMisRecetasPress}>
          <Text style={styles.buttonText}>Mis Recetas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDespensaPress}>
          <Text style={styles.buttonText}>Despensa</Text>
        </TouchableOpacity>
        {currentUser && currentUser.isAdmin && (
          <>
            <TouchableOpacity style={styles.button} onPress={handleTablaUsuariosPress}>
              <Text style={styles.buttonText}>Tabla Usuarios</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default HomeScreen;
