import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleStorage = {
  getVehicles: async () => {
    try {
      const storedVehicles = await AsyncStorage.getItem('vehicles');
      return storedVehicles !== null ? JSON.parse(storedVehicles) : [];
    } catch (error) {
      console.error('Error loading vehicles from AsyncStorage', error);
      throw new Error('Hubo un problema cargando los vehículos.');
    }
  },

  saveVehicles: async (vehicles) => {
    try {
      await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));
    } catch (error) {
      console.error('Error saving vehicles to AsyncStorage', error);
      throw new Error('Hubo un problema guardando los vehículos.');
    }
  },

  clearAsyncStorage: async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
      throw new Error('Hubo un problema limpiando AsyncStorage.');
    }
  },
};

export default VehicleStorage;
