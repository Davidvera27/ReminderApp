import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import VehicleStorage from '../data/VehicleStorage';
import styles from '../styles/styles';

const AddVehicleScreen = ({ navigation }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');

  const saveVehicle = async () => {
    if (!brand || !model || !plate || !type || !color) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newVehicle = {
      id: Math.random().toString(), // This is just a temporary ID, replace it with your logic
      brand,
      model,
      plate,
      type,
      color,
    };

    try {
      await VehicleStorage.saveVehicle(newVehicle);
      navigation.navigate('Home'); // Navegar de regreso a HomeScreen después de agregar el vehículo
    } catch (error) {
      console.error('Error saving vehicle', error);
      Alert.alert('Error', 'Hubo un problema guardando el vehículo. Por favor, intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        onChangeText={(text) => setBrand(text)}
        value={brand}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        onChangeText={(text) => setModel(text)}
        value={model}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa"
        onChangeText={(text) => setPlate(text)}
        value={plate}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        onChangeText={(text) => setType(text)}
        value={type}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        onChangeText={(text) => setColor(text)}
        value={color}
      />
      <View style={styles.button}>
        <Button title="Crear" onPress={saveVehicle} />
      </View>
    </View>
  );
};

export default AddVehicleScreen;
