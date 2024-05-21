// Importa las dependencias necesarias de React y React Native.
import React from 'react';
// Importa los componentes TouchableOpacity y Text de React Native.
import { TouchableOpacity, Text } from 'react-native';
// Importa la librería de animaciones react-native-animatable.
import * as Animatable from 'react-native-animatable';
// Importa los estilos desde el archivo styles.
import styles from '../styles/styles';

// Define el componente funcional ShinyButton, recibe las props title y onPress.
const ShinyButton = ({ title, onPress }) => (
  // Aplica una animación "pulse" infinita al botón utilizando Animatable.View.
  <Animatable.View animation="pulse" iterationCount="infinite">
    {/* Define un botón tocable con estilos y una función onPress. */}
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* Muestra el título del botón con estilos. */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  </Animatable.View>
);

// Exporta el componente ShinyButton como el componente por defecto del módulo.
export default ShinyButton;
