import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const VehicleReminder = ({ reminder, onDelete }) => (
  <View style={styles.reminderItem}>
    <Text style={styles.reminderTitle}>{reminder.event}</Text>
    <Text style={styles.reminderDetail}>Inicio: {new Date(reminder.start).toDateString()}</Text>
    <Text style={styles.reminderDetail}>Fin: {new Date(reminder.end).toDateString()}</Text>
    <Text style={styles.reminderDetail}>Ubicación: {reminder.location}</Text>
    <Text style={styles.reminderDetail}>Prioridad: {reminder.priority}</Text>
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteButtonText}>Eliminar</Text>
    </TouchableOpacity>
  </View>
);

export default VehicleReminder;
