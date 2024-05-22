import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import ShinyButton from '../components/ShinyButton';
import VehicleStorage from '../data/VehicleStorage';
import initialVehicles from '../data/vehicles'; // Asegúrate de que esta ruta sea correcta
import styles from '../styles/styles';

function HomeScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const storedVehicles = await VehicleStorage.getVehicles();
        if (storedVehicles.length > 0) {
          setVehicles(storedVehicles);
        } else {
          setVehicles(initialVehicles);
          await VehicleStorage.saveVehicles(initialVehicles);
        }
      } catch (error) {
        console.error('Error loading vehicles', error);
        Alert.alert('Error', 'Hubo un problema cargando los vehículos. Por favor, intenta nuevamente.');
        setVehicles(initialVehicles);
      }
    };
    loadVehicles();
  }, []);

  const toggleVehicleSelection = (id) => {
    setSelectedVehicles((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return Array.from(updatedSelection);
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedVehicles([]);
  };

  const resetVehicles = async () => {
    await VehicleStorage.clearAsyncStorage();
    setVehicles(initialVehicles);
    await VehicleStorage.saveVehicles(initialVehicles);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar los vehículos seleccionados?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const updatedVehicles = vehicles.filter((vehicle) => !selectedVehicles.includes(vehicle.id));
            setSelectedVehicles([]);
            setEditMode(false);
            setVehicles(updatedVehicles);
            try {
              await VehicleStorage.saveVehicles(updatedVehicles);
            } catch (error) {
              console.error('Error saving vehicles', error);
              Alert.alert('Error', 'Hubo un problema guardando los vehículos. Por favor, intenta nuevamente.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const CheckBox = ({ isChecked, id }) => (
    <TouchableOpacity style={styles.checkbox} onPress={() => toggleVehicleSelection(id)}>
      {isChecked && <Text>X</Text>}
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedVehicles.includes(item.id) && styles.selectedItem]}
      onPress={() => {
        if (editMode) {
          toggleVehicleSelection(item.id);
        } else {
          navigation.navigate('Details', { vehicle: item });
        }
      }}
      onLongPress={() => toggleEditMode()}
    >
      {editMode && <CheckBox isChecked={selectedVehicles.includes(item.id)} id={item.id} />}
      <View style={styles.itemContent}>
        <Image source={item.logo} style={styles.vehicleLogo} />
        <View>
          <Text style={styles.title}>{`${item.brand} ${item.model}`}</Text>
          <Text style={styles.subtitle}>{item.plate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/BackGround_HOME_5.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        {editMode && (
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
        <View style={styles.toolbar}>
          <ShinyButton title="Restablecer" onPress={resetVehicles} />
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
