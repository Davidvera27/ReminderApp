// Importamos React, que es la biblioteca principal para construir interfaces de usuario en aplicaciones React y React Native.
import React from 'react';

// Importamos NavigationContainer de @react-navigation/native, que es el contenedor de navegación principal de la aplicación.
import { NavigationContainer } from '@react-navigation/native';

// Importamos createStackNavigator para crear un navegador tipo stack (pila) y CardStyleInterpolators para animaciones de transición entre pantallas.
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Importamos las pantallas que compondrán las diferentes vistas de la aplicación.
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import RemindersListScreen from './screens/RemindersListScreen';

// Creamos una instancia del stack navigator.
const Stack = createStackNavigator();

// Función principal de la aplicación que se exporta como el componente por defecto.
export default function App() {
  return (
    // NavigationContainer envuelve toda la navegación de la aplicación y debe ser el padre de todos los navegadores.
    <NavigationContainer>
      {/* Stack.Navigator define un conjunto de pantallas que conforman la navegación por pila. */}
      <Stack.Navigator
        initialRouteName="Home" // Define la pantalla inicial cuando se carga la aplicación.
        screenOptions={{
          headerShown: true, // Muestra el encabezado en cada pantalla del stack.
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Define la animación de transición entre pantallas.
        }}
      >
        {/* Definimos las diferentes pantallas que conforman el stack. */}
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="RemindersList" component={RemindersListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
