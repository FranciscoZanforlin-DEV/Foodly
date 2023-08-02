import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const Recetas = () => {
  const [recipesData, setRecipesData] = useState([]); // Estado para almacenar los datos de las recetas
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    // Lógica para obtener los datos de las recetas al montar el componente
    axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=a4b07de1a3a14f29979a848b211e151a&language=es')
      .then(response => {
        setRecipesData(response.data.results); // Almacenar los datos de las recetas en el estado
        setIsLoading(false); // Finalizar la carga de datos
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Finalizar la carga de datos en caso de error
      });
  }, []);

  const renderRecipeItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.recipeItem}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription}>Listo en {item.readyInMinutes} minutos</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando recetas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas</Text>
      <FlatList
        data={recipesData}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recipeList}
      />
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
  recipeList: {
    flexGrow: 1,
  },
  recipeItem: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#888',
  },
});

export default Recetas;
