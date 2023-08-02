import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserSessionContext, currentUser } from './UserContext';

const Despensa = ({ navigation }) => {
  const { currentUser } = useContext(UserSessionContext); // Obtenemos el usuario actual del contexto

  const handleSectionPress = (section) => {
    navigation.navigate(section);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleSectionPress('Congelados')}>
        <Text style={styles.buttonText}>Alimentos Congelados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSectionPress('Conservas')}>
        <Text style={styles.buttonText}>Conservas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSectionPress('ProductosSecos')}>
        <Text style={styles.buttonText}>Productos Secos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSectionPress('Limpieza')}>
        <Text style={styles.buttonText}>Limpieza</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSectionPress('Medicinas')}>
        <Text style={styles.buttonText}>Medicinas</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  button: {
    backgroundColor: '#FF69B4', 
    borderRadius: 25, 
    padding: 15, 
    marginBottom: 20, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});

export default Despensa;
