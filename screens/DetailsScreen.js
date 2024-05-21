// Importa las dependencias necesarias de React y React Native.
import React, { useState } from 'react';
// Importa varios componentes y APIs de React Native.
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Modal, Picker } from 'react-native';
// Importa la librería de animaciones react-native-animatable.
import * as Animatable from 'react-native-animatable';
// Importa el componente de selector de fecha y hora de @react-native-community.
import DateTimePicker from '@react-native-community/datetimepicker';
// Importa el almacenamiento asíncrono de @react-native-async-storage.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa un componente personalizado ShinyButton desde la carpeta de componentes.
import ShinyButton from '../components/ShinyButton';
// Importa los estilos desde el archivo styles.
import styles from '../styles/styles';

// Define el componente funcional DetailsScreen, recibe las props route y navigation.
function DetailsScreen({ route, navigation }) {
  // Desestructura el objeto vehicle de los parámetros de la ruta.
  const { vehicle } = route.params;
  
  // Define los estados locales para el control de la visibilidad del modal, eventos de recordatorio, fechas, ubicación, prioridad y visibilidad de los selectores de fechas.
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderEvent, setReminderEvent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Función para añadir un nuevo recordatorio.
  const addReminder = (event, start, end, location, priority) => {
    // Crea un nuevo objeto de recordatorio.
    const newReminder = {
      id: Date.now().toString(), // Genera un ID único basado en la fecha actual.
      event,
      start: start.toISOString(), // Convierte la fecha de inicio a formato ISO.
      end: end.toISOString(), // Convierte la fecha de fin a formato ISO.
      location,
      priority,
    };
    // Actualiza los recordatorios del vehículo añadiendo el nuevo recordatorio.
    const updatedReminders = [...vehicle.reminders, newReminder];
    vehicle.reminders = updatedReminders; // Actualiza el objeto vehicle.
    setModalVisible(false); // Cierra el modal.
    saveReminders(updatedReminders); // Guarda los recordatorios en AsyncStorage.
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

  // Maneja el cambio de la fecha de inicio.
  const handleStartDateChange = (selectedDate) => {
    const currentDate = selectedDate || startDate; // Usa la fecha seleccionada o la fecha actual.
    setShowStartDatePicker(false); // Oculta el selector de fecha de inicio.
    setStartDate(currentDate); // Actualiza el estado de la fecha de inicio.
  };

  // Maneja el cambio de la fecha de fin.
  const handleEndDateChange = (selectedDate) => {
    const currentDate = selectedDate || endDate; // Usa la fecha seleccionada o la fecha actual.
    setShowEndDatePicker(false); // Oculta el selector de fecha de fin.
    setEndDate(currentDate); // Actualiza el estado de la fecha de fin.
  };

  // Renderiza la interfaz de usuario del componente.
  return (
    // Utiliza una vista animada de react-native-animatable.
    <Animatable.View animation="fadeInUp" duration={800} style={styles.container}>
      {/* Muestra una imagen de fondo con los detalles del vehículo. */}
      <ImageBackground source={vehicle.logo} style={styles.backgroundImage}>
        {/* Aplica una superposición sobre la imagen de fondo. */}
        <View style={styles.overlay}>
          {/* Muestra el encabezado con la marca y modelo del vehículo. */}
          <Text style={styles.header}>{`${vehicle.brand} ${vehicle.model}`}</Text>
          {/* Muestra la placa del vehículo. */}
          <Text style={styles.subtitle}>Placa: {vehicle.plate}</Text>
          {/* Muestra el color del vehículo. */}
          <Text style={styles.detail}>Color: {vehicle.color}</Text>
          {/* Muestra el tipo del vehículo. */}
          <Text style={styles.detail}>Tipo: {vehicle.type}</Text>
          {/* Botón para añadir un recordatorio, abre el modal al presionarlo. */}
          <TouchableOpacity style={styles.reminderButton} onPress={() => setModalVisible(true)}>
            <ShinyButton title="Añadir Recordatorio" onPress={() => setModalVisible(true)} />
          </TouchableOpacity>
          {/* Botón para ver los recordatorios, navega a la pantalla de lista de recordatorios. */}
          <TouchableOpacity style={styles.reminderButton} onPress={() => navigation.navigate('RemindersList', { vehicle })}>
            <ShinyButton title="Ver Recordatorios" onPress={() => navigation.navigate('RemindersList', { vehicle })} />
          </TouchableOpacity>

          {/* Modal para añadir un nuevo recordatorio. */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            {/* Vista centrada dentro del modal. */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* Texto del modal. */}
                <Text style={styles.modalText}>Añadir Recordatorio</Text>
                {/* Campo de entrada de texto para el evento del recordatorio. */}
                <TextInput
                  style={styles.input}
                  placeholder="Evento"
                  onChangeText={(text) => setReminderEvent(text)}
                  value={reminderEvent}
                />
                {/* Botón para seleccionar la fecha de inicio. */}
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                  <Text style={styles.datePickerText}>Fecha de Inicio: {startDate.toDateString()}</Text>
                </TouchableOpacity>
                {/* Muestra el selector de fecha de inicio si está visible. */}
                {showStartDatePicker && (
                  <DateTimePicker value={startDate} mode="date" display="default" onChange={(event, date) => handleStartDateChange(date)} />
                )}
                {/* Botón para seleccionar la fecha de fin. */}
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                  <Text style={styles.datePickerText}>Fecha de Fin: {endDate.toDateString()}</Text>
                </TouchableOpacity>
                {/* Muestra el selector de fecha de fin si está visible. */}
                {showEndDatePicker && (
                  <DateTimePicker value={endDate} mode="date" display="default" onChange={(event, date) => handleEndDateChange(date)} />
                )}
                {/* Campo de entrada de texto para la ubicación del recordatorio. */}
                <TextInput
                  style={styles.input}
                  placeholder="Ubicación"
                  onChangeText={(text) => setLocation(text)}
                  value={location}
                />
                {/* Selector de prioridad del recordatorio. */}
                <Picker selectedValue={priority} style={styles.picker} onValueChange={(itemValue) => setPriority(itemValue)}>
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Alta" value="Alta" />
                  <Picker.Item label="Baja" value="Baja" />
                </Picker>
                {/* Botón para guardar el recordatorio. */}
                <ShinyButton title="Guardar" onPress={() => addReminder(reminderEvent, startDate, endDate, location, priority)} />
                {/* Botón para cancelar y cerrar el modal. */}
                <ShinyButton title="Cancelar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
}

// Exporta el componente DetailsScreen como el componente por defecto del módulo.
export default DetailsScreen;
