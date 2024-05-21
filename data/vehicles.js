// Define un array constante llamado initialVehicles que contiene objetos con información de vehículos.
const initialVehicles = [
  {
    // Objeto que representa un vehículo con ID, marca, modelo, placa, tipo, color, logo y recordatorios.
    id: '1', // Identificador único del vehículo.
    brand: 'Audi', // Marca del vehículo.
    model: 'Q7', // Modelo del vehículo.
    plate: 'IEU-480', // Placa del vehículo.
    type: 'CAMIONETA', // Tipo de vehículo.
    color: 'BLANCO GLACIAR METALIZADO', // Color del vehículo.
    // Ruta de la imagen del logo del vehículo, usando require para cargar la imagen.
    logo: require('../assets/AUDI_Q7.png'), 
    reminders: [] // Array vacío para los recordatorios asociados al vehículo.
  },
  {
    id: '2',
    brand: 'Audi',
    model: 'A4',
    plate: 'HXW-528',
    type: 'AUTOMÓVIL',
    color: 'GRIS MONSOON METALIZADO',
    logo: require('../assets/AUDI_A4.png'),
    reminders: []
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'M440I',
    plate: 'NGU-364',
    type: 'AUTOMÓVIL',
    color: 'GRIS METALIZADO',
    logo: require('../assets/BMW_M440I.png'),
    reminders: []
  },
  {
    id: '4',
    brand: 'BMW',
    model: 'X5 XDRIVE45E',
    plate: 'JMZ-402',
    type: 'CAMIONETA',
    color: 'BLANCO MINERAL METALIZADO',
    logo: require('../assets/BMW_X5.png'),
    reminders: []
  },
  {
    id: '5',
    brand: 'BMW',
    model: 'X1 SDRIVE20I',
    plate: 'LKR-728',
    type: 'CAMIONETA',
    color: 'AZUL METALIZADO',
    logo: require('../assets/BMW_X1BLUE.png'),
    reminders: []
  },
  {
    id: '6',
    brand: 'BMW',
    model: 'X1 SDRIVE20I',
    plate: 'LKT-908',
    type: 'CAMIONETA',
    color: 'NEGRO METALIZADO',
    logo: require('../assets/BMW_X1BLACK.png'),
    reminders: []
  },
  {
    id: '7',
    brand: 'Mercedes Benz',
    model: 'E 220',
    plate: 'MSO-965',
    type: 'AUTOMÓVIL',
    color: 'AZUL CAVANISTA METALIZADO',
    logo: require('../assets/MERCEDES_E220.png'),
    reminders: []
  },
  {
    id: '8',
    brand: 'Mercedes Benz',
    model: 'GLE 250 D 4MATIC',
    plate: 'JCQ-665',
    type: 'CAMIONETA',
    color: 'MARRON CITRINA METALIZADO',
    logo: require('../assets/MERCEDES_GLE250.png'),
    reminders: []
  }
];

// Exporta la constante initialVehicles como el valor por defecto del módulo.
export default initialVehicles;
