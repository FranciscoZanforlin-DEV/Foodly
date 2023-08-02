import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MisRecetas = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null); // Nuevo estado para almacenar la receta en edición

  useEffect(() => {
    loadRecipesFromStorage();
  }, []);

  // Cargar las recetas desde AsyncStorage cuando se monta el componente
  const loadRecipesFromStorage = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (user && user.usuario) {
        const recipesData = await AsyncStorage.getItem(`recipes-${user.usuario}`);
        if (recipesData) {
          setRecipes(JSON.parse(recipesData));
        }
      } else {
        console.log('Error: currentUser no tiene usuario.');
      }
    } catch (error) {
      console.log('Error al cargar las recetas desde AsyncStorage:', error);
    }
  };

  // Guardar las recetas en AsyncStorage
  const saveRecipesToStorage = async (newRecipes) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (user && user.usuario) {
        await AsyncStorage.setItem(`recipes-${user.usuario}`, JSON.stringify(newRecipes));
      } else {
        console.log('Error: currentUser no tiene usuario.');
      }
    } catch (error) {
      console.log('Error al guardar las recetas en AsyncStorage:', error);
    }
  };

  // Cambiar el estado para editar una receta
  const handleToggleEdit = (recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      setEditingRecipe({ ...recipe });
    }
  };

  // Actualizar el estado de la receta en edición al cambiar un campo
  const handleEditChange = (field, value) => {
    setEditingRecipe((prevRecipe) => ({ ...prevRecipe, [field]: value }));
  };

  // Guardar la receta editada
  const handleSaveRecipe = () => {
    if (editingRecipe) {
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === editingRecipe.id) {
          return editingRecipe;
        }
        return recipe;
      });

      setRecipes(updatedRecipes);
      saveRecipesToStorage(updatedRecipes);
      setEditingRecipe(null);
    }
  };

  // Eliminar una receta
  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
  };

  // Agregar un ingrediente a la receta en edición
  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setNewIngredient('');
    }
  };

  // Eliminar un ingrediente de la receta en edición
  const handleDeleteIngredient = (ingredient) => {
    const updatedIngredients = editingRecipe.ingredients.filter((item) => item !== ingredient);
    setEditingRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  // Eliminar un ingrediente de la nueva receta en creación
  const handleDeleteNewIngredient = (ingredient) => {
    const updatedIngredients = ingredients.filter((item) => item !== ingredient);
    setIngredients(updatedIngredients);
  };

  // Agregar una nueva receta
  const handleAddRecipe = async () => {
    if (newRecipeName.trim() !== '') {
      const newRecipe = {
        id: Math.random(),
        name: newRecipeName,
        ingredients: ingredients,
      };

      const updatedRecipes = [...recipes, newRecipe];

      const user = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (user && user.usuario) {
        const userRecipes = JSON.parse(await AsyncStorage.getItem(`recipes-${user.usuario}`));
        if (userRecipes) {
          await AsyncStorage.setItem(`recipes-${user.usuario}`, JSON.stringify([...userRecipes, newRecipe]));
        } else {
          await AsyncStorage.setItem(`recipes-${user.usuario}`, JSON.stringify([newRecipe]));
        }
      } else {
        console.log('Error: currentUser no tiene usuario.');
      }

      setRecipes(updatedRecipes);
      setNewRecipeName('');
      setIngredients([]);
    }
  };

  // Renderizar cada elemento de la lista de recetas
  const renderRecipeItem = ({ item }) => {
    const isEditing = editingRecipe && editingRecipe.id === item.id;

    return (
      <View style={styles.recipeItem}>
        {isEditing ? (
          <TextInput
            style={styles.editRecipeInput}
            value={editingRecipe.name}
            onChangeText={(value) => handleEditChange('name', value)}
          />
        ) : (
          <Text style={styles.recipeTitle}>{item.name}</Text>
        )}
        <Text style={styles.recipeSubtitle}>Ingredientes:</Text>
        {item.ingredients.map((ingredient, index) => (
          <View style={styles.ingredientContainer} key={ingredient}>
            {isEditing ? (
              <TextInput
                style={styles.editIngredientInput}
                value={editingRecipe.ingredients[index]}
                onChangeText={(value) =>
                  handleEditChange('ingredients', [
                    ...editingRecipe.ingredients.slice(0, index),
                    value,
                    ...editingRecipe.ingredients.slice(index + 1),
                  ])
                }
              />
            ) : (
              <Text style={styles.ingredient}>{ingredient}</Text>
            )}
            {isEditing && (
              <TouchableOpacity
                style={styles.deleteIngredientButton}
                onPress={() => handleDeleteIngredient(ingredient)}
              >
                <Text style={styles.deleteIngredientButtonText}>Eliminar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={() => handleToggleEdit(item.id)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        )}
        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteRecipe(item.id)}
          disabled={isEditing}
        >
          <Text style={styles.deleteButtonText}>Eliminar Receta</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../assets/FondoRosa.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Mis Recetas</Text>

        {/* Contenedor para crear una nueva receta */}
        <View style={styles.newRecipeContainer}>
          <View style={styles.newRecipeBox}>
            {/* Input para el nombre de la nueva receta */}
            <TextInput
              style={styles.newRecipeInput}
              placeholder="Nombre de la receta"
              value={newRecipeName}
              onChangeText={setNewRecipeName}
            />

            {/* Contenedor para agregar ingredientes */}
            <View style={styles.ingredientsContainer}>
              {/* Input para ingresar un nuevo ingrediente */}
              <TextInput
                style={styles.newIngredientInput}
                placeholder="Ingredientes"
                value={newIngredient}
                onChangeText={setNewIngredient}
              />
              {/* Botón para agregar el ingrediente a la nueva receta */}
              <TouchableOpacity style={styles.addIngredientButton} onPress={handleAddIngredient}>
                <Text style={styles.addIngredientButtonText}>Agregar Ingrediente</Text>
              </TouchableOpacity>
            </View>

            {/* Lista de ingredientes de la nueva receta */}
            <FlatList
              data={ingredients}
              renderItem={({ item }) => (
                <View style={styles.ingredientContainer}>
                  <Text style={styles.ingredient}>{item}</Text>
                  {/* Botón para eliminar un ingrediente de la nueva receta */}
                  <TouchableOpacity
                    style={styles.deleteIngredientButton}
                    onPress={() => handleDeleteNewIngredient(item)}
                  >
                    <Text style={styles.deleteIngredientButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item}
            />

            {/* Botón para agregar la nueva receta */}
            <TouchableOpacity style={styles.addRecipeButton} onPress={handleAddRecipe}>
              <Text style={styles.addRecipeButtonText}>Agregar Receta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de recetas */}
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.recipeList}
        />
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  newRecipeContainer: {
    marginBottom: 16,
  },
  newRecipeBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  newRecipeInput: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  newIngredientInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  addIngredientButton: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    alignItems: 'center',
  },
  addIngredientButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ingredient: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  deleteIngredientButton: {
    backgroundColor: '#D0021B',
    borderRadius: 8,
    padding: 4,
    marginLeft: 8,
  },
  deleteIngredientButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addRecipeButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    alignItems: 'center',
  },
  addRecipeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
  recipeSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#D0021B',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#00CC00',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editRecipeInput: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  editIngredientInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
});

export default MisRecetas;
