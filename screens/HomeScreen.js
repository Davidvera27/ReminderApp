// Importamos las dependencias necesarias de React y React Native.
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
// Importamos AsyncStorage para el almacenamiento local.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importamos un componente personalizado ShinyButton y los datos iniciales de vehículos.
import ShinyButton from '../components/ShinyButton'; // Asegúrate de que la ruta sea correcta
import initialVehicles from '../data/vehicles'; // Asegúrate de que la ruta sea correcta
import styles from '../styles/styles'; // Asegúrate de que la ruta sea correcta

// Definimos la función HomeScreen que recibe navigation como prop.
function HomeScreen({ navigation }) {
  // Definimos los estados para vehículos, vehículos seleccionados y el modo de edición.
  const [vehicles, setVehicles] = useState([]);// Estado para almacenar la lista de vehículos. Inicialmente está vacío.
  const [selectedVehicles, setSelectedVehicles] = useState([]);// Estado para almacenar los ID de los vehículos seleccionados. Inicialmente está vacío.
  const [isEditMode, setIsEditMode] = useState(false);// Estado para indicar si la aplicación está en modo de edición. Inicialmente es false.

  // useEffect para cargar los vehículos al montar el componente.
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const storedVehicles = await AsyncStorage.getItem('vehicles'); // Intentamos obtener los vehículos almacenados.
        if (storedVehicles !== null) {
          setVehicles(JSON.parse(storedVehicles)); // Si existen, los parseamos y seteamos el estado.
        } else {
          setVehicles(initialVehicles); // Si no existen, seteamos el estado con los vehículos iniciales.
        }
      } catch (error) {
        console.error('Error loading vehicles from AsyncStorage', error); // En caso de error, mostramos una alerta y seteamos los vehículos iniciales.
        Alert.alert('Error', 'Hubo un problema cargando los vehículos. Por favor, intenta nuevamente.');
        setVehicles(initialVehicles); // Seteamos los vehículos iniciales en caso de error.
      }
    };
    loadVehicles(); // Llamamos a la función loadVehicles.
  }, []); // El array vacío como segundo argumento indica que este efecto se ejecuta solo una vez al montar el componente.


  // Función para guardar los vehículos en AsyncStorage.
  const saveVehicles = async (vehicles) => {
    try {
      await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));// Guardamos los vehículos en AsyncStorage después de convertirlos a una cadena JSON.
    } catch (error) {
      console.error('Error saving vehicles to AsyncStorage', error);// En caso de error, mostramos un mensaje en la consola.
      Alert.alert('Error', 'Hubo un problema guardando los vehículos. Por favor, intenta nuevamente.');// Mostramos una alerta de error al usuario.
    }
  };



  // Función para alternar la selección de un vehículo.
  const toggleVehicleSelection = (id) => {
    setSelectedVehicles((prevSelected) => { // Actualizamos el estado de los vehículos seleccionados.
      const updatedSelection = new Set(prevSelected); // Creamos un nuevo conjunto basado en la selección previa.
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id); // Si el vehículo ya está seleccionado, lo eliminamos del conjunto.
      } else {
        updatedSelection.add(id); // Si el vehículo no está seleccionado, lo agregamos al conjunto.
      }
      return Array.from(updatedSelection); // Convertimos el conjunto de nuevo a un array y lo devolvemos.
    });
  };


  // Función para alternar el modo de edición.
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // Alternamos el estado de edición entre verdadero y falso.
    setSelectedVehicles([]); // Reiniciamos la selección de vehículos, deseleccionando todos.
  };

  // Función para manejar la eliminación de vehículos.
  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación', // Título de la alerta.
      '¿Estás seguro de que quieres eliminar los vehículos seleccionados?', // Mensaje de la alerta.
      [
        {
          text: 'Cancelar', // Opción para cancelar la eliminación.
          style: 'cancel', // Estilo de la opción de cancelar.
        },
        {
          text: 'Eliminar', // Opción para confirmar la eliminación.
          onPress: () => { // Acción a ejecutar si se confirma la eliminación.
            const updatedVehicles = vehicles.filter((vehicle) => !selectedVehicles.includes(vehicle.id)); // Filtramos los vehículos no seleccionados y actualizamos el estado.
            setSelectedVehicles([]); // Reiniciamos la selección de vehículos.
            setIsEditMode(false); // Salimos del modo de edición.
            setVehicles(updatedVehicles); // Actualizamos el estado de los vehículos con la nueva lista.
            saveVehicles(updatedVehicles); // Guardamos la nueva lista de vehículos en AsyncStorage.
          },
        },
      ],
      { cancelable: true } // Permite que la alerta se pueda cancelar tocando fuera de ella.
    );
  };


  // Componente CheckBox para marcar la selección de vehículos.
  const CheckBox = ({ isChecked, id }) => (
    <TouchableOpacity style={styles.checkbox} onPress={() => toggleVehicleSelection(id)}>
      {isChecked && <Text>X</Text>}
    </TouchableOpacity>
  );// Define un componente funcional CheckBox que recibe dos props: isChecked e id.// Si isChecked es verdadero, muestra una "X" dentro del TouchableOpacity.

  // Función para renderizar cada ítem en la lista de vehículos.// Define una función renderItem que recibe un objeto item y devuelve un componente.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedVehicles.includes(item.id) && styles.selectedItem]}
      onPress={() => {
        if (isEditMode) {
          toggleVehicleSelection(item.id);
        } else {
          navigation.navigate('Details', { vehicle: item });
        }
      }}
      onLongPress={() => toggleEditMode()}
    >
      {isEditMode && <CheckBox isChecked={selectedVehicles.includes(item.id)} id={item.id} />}
      <View style={styles.itemContent}>
        <Image source={item.logo} style={styles.vehicleLogo} />
        <View>
          <Text style={styles.title}>{`${item.brand} ${item.model}`}</Text>
          <Text style={styles.subtitle}>{item.plate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Renderizamos la vista principal del componente.
  return (
    <ImageBackground source={require('../assets/BackGround_HOME_5.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        {isEditMode && (
          <View style={styles.toolbar}>
            <ShinyButton title="Eliminar" onPress={handleDelete} />
          </View>
        )}
        <Text style={styles.header}>Vehicle Manager</Text>
        <FlatList
          data={vehicles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ImageBackground>
  );
}

// Exportamos el componente HomeScreen como el componente por defecto.
export default HomeScreen;
