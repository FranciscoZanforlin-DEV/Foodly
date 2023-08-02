import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {UserSessionProvider} from './src/componentes/UserSessionContext' 
import { UserProvider } from './src/componentes/UserContext';
import LoginUsuario from './src/componentes/LoginUsuario';
import RegistroUsuario from './src/componentes/RegistroUsuario';
import HomeScreen from './src/componentes/HomeScreen';
import Recetas from './src/componentes/Recetas';
import MisRecetas from './src/componentes/MisRecetas';
import Despensa from './src/componentes/Despensa';
import Congelados from './src/componentes/DespensaSecciones/Congelados';
import Conservas from './src/componentes/DespensaSecciones/Conservas';
import Limpieza from './src/componentes/DespensaSecciones/Limpieza';
import Medicinas from './src/componentes/DespensaSecciones/Medicinas';
import ProductosSecos from './src/componentes/DespensaSecciones/ProductosSecos';
import PerfilUsuario from './src/componentes/PerfilUsuario';
import TablaUsuarios from './src/componentes/TablaUsuarios';


const Stack = createStackNavigator();

const DespensaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DespensaStack" component={Despensa} options={{ title: 'Secciones' }} />
      <Stack.Screen name="Congelados" component={Congelados} options={{ title: 'Alimentos Congelados' }} />
      <Stack.Screen name="Conservas" component={Conservas} options={{ title: 'Conservas' }} />
      <Stack.Screen name="Limpieza" component={Limpieza} options={{ title: 'Limpieza' }} />
      <Stack.Screen name="Medicinas" component={Medicinas} options={{ title: 'Medicinas' }} />
      <Stack.Screen name="ProductosSecos" component={ProductosSecos} options={{ title: 'Productos Secos' }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <UserSessionProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginUsuario} options={{ title: 'Inicio de sesión' }} />
            <Stack.Screen name="Registro" component={RegistroUsuario} options={{ title: 'Registro' }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pantalla Principal' }} />
            <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} options={{ title: 'Mi Perfil' }} />
            <Stack.Screen name="Recetas" component={Recetas} options={{ title: 'Recetas' }} />
            <Stack.Screen name="MisRecetas" component={MisRecetas} options={{ title: 'Mis Recetas' }} />
            <Stack.Screen name="Despensa" component={DespensaStack} options={{ title: 'Despensa' }} />
            <Stack.Screen name="TablaUsuarios" component={TablaUsuarios} options={{ title: 'TablaUsuarios' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </UserSessionProvider>
  );
}
export default App;
