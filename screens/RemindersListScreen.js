// Importa las dependencias necesarias de React y React Native.
import React from 'react';
// Importa varios componentes de React Native.
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
// Importa el almacenamiento asíncrono de @react-native-async-storage.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa un componente personalizado ShinyButton desde la carpeta de componentes.
import ShinyButton from '../components/ShinyButton';
// Importa los estilos desde el archivo styles.
import styles from '../styles/styles';

// Define el componente funcional RemindersListScreen, recibe las props route y navigation.
function RemindersListScreen({ route, navigation }) {
  // Desestructura el objeto vehicle de los parámetros de la ruta.
  const { vehicle } = route.params;
  // Define el estado local para almacenar los recordatorios del vehículo.
  const [reminders, setReminders] = React.useState(vehicle.reminders);

  // Función para eliminar un recordatorio.
  const deleteReminder = (id) => {
    // Muestra una alerta de confirmación antes de eliminar el recordatorio.
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar este recordatorio?',
      [
        {
          text: 'Cancelar', // Opción para cancelar la eliminación.
          style: 'cancel',
        },
        {
          text: 'Eliminar', // Opción para confirmar la eliminación.
          onPress: () => {
            // Filtra el recordatorio a eliminar.
            const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
            setReminders(updatedReminders); // Actualiza el estado de los recordatorios.
            saveReminders(updatedReminders); // Guarda los recordatorios actualizados.
          },
        },
      ],
      { cancelable: true } // Permite cancelar la alerta tocando fuera de ella.
    );
  };

  // Función para guardar los recordatorios actualizados en AsyncStorage.
  const saveReminders = async (updatedReminders) => {
    try {
      // Obtiene los vehículos almacenados.
      const storedVehicles = await AsyncStorage.getItem('vehicles');
      let vehicles = storedVehicles ? JSON.parse(storedVehicles) : [];
      // Actualiza el vehículo correspondiente con los nuevos recordatorios.
      vehicles = vehicles.map((v) => (v.id === vehicle.id ? { ...v, reminders: updatedReminders } : v));
      // Guarda los vehículos actualizados en AsyncStorage.
      await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));
    } catch (error) {
      // Maneja cualquier error que ocurra durante el proceso de guardado.
      console.error('Error saving reminders to AsyncStorage', error);
    }
  };

  // Renderiza un elemento de la lista de recordatorios.
  const renderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      {/* Muestra el título del evento del recordatorio. */}
      <Text style={styles.reminderTitle}>{item.event}</Text>
      {/* Muestra la fecha de inicio del recordatorio. */}
      <Text style={styles.reminderDetail}>Inicio: {new Date(item.start).toDateString()}</Text>
      {/* Muestra la fecha de fin del recordatorio. */}
      <Text style={styles.reminderDetail}>Fin: {new Date(item.end).toDateString()}</Text>
      {/* Muestra la ubicación del recordatorio. */}
      <Text style={styles.reminderDetail}>Ubicación: {item.location}</Text>
      {/* Muestra la prioridad del recordatorio. */}
      <Text style={styles.reminderDetail}>Prioridad: {item.priority}</Text>
      {/* Botón para eliminar el recordatorio. */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteReminder(item.id)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderiza la interfaz de usuario del componente.
  return (
    <View style={styles.container}>
      {/* Lista de recordatorios, renderiza cada recordatorio usando renderItem. */}
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Usa el ID del recordatorio como clave.
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Exporta el componente RemindersListScreen como el componente por defecto del módulo.
export default RemindersListScreen;
