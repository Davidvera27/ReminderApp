import { StyleSheet } from 'react-native'; // Importa el módulo StyleSheet de React Native

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: 'rgba(0,0,0,0.5)', // Color de fondo semi-transparente (negro con 50% de opacidad)
    width: '100%', // Ancho al 100% del contenedor
    paddingHorizontal: 10, // Espaciado horizontal
  },
  header: {
    fontSize: 30, // Tamaño de fuente grande
    fontWeight: 'bold', // Negrita
    color: 'gold', // Color de texto blanco
    textAlign: 'center', // Centra el texto
    marginVertical: 20, // Espaciado vertical
  },
  subtitle: {
    fontSize: 20, // Tamaño de fuente medio
    color: 'white', // Color de texto blanco
    textAlign: 'center', // Centra el texto
    marginVertical: 10, // Espaciado vertical
  },
  detail: {
    fontSize: 16, // Tamaño de fuente pequeño
    color: 'white', // Color de texto blanco
    textAlign: 'center', // Centra el texto
    marginVertical: 5, // Espaciado vertical
  },
  item: {
    padding: 5, // Espaciado interno
    marginVertical: 3, // Espaciado vertical externo
    marginHorizontal: 14, // Espaciado horizontal externo
    backgroundColor: '#ffffff1f', // Fondo oscuro
    borderRadius: 10, // Bordes redondeados
    borderWidth: 1, // Ancho del borde
    borderColor: 'gold', // Color del borde dorado
    shadowColor: 'black', // Color de la sombra dorado
    shadowOffset: { width: 5, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 6, // Radio de la sombra
    elevation: 5, // Elevación para Android
  },
  selectedItem: {
    backgroundColor: 'rgba(255,0,0,0.5)', // Fondo semi-transparente rojo
  },
  itemContent: {
    flexDirection: 'row', // Dispone los hijos en fila
    alignItems: 'center', // Alinea los hijos al centro verticalmente
  },
  vehicleLogo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
  checkbox: {
    width: 20, // Ancho del checkbox
    height: 20, // Alto del checkbox
    marginRight: 10, // Margen derecho
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde negro
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  toolbar: {
    flexDirection: 'row', // Dispone los hijos en fila
    justifyContent: 'space-between', // Distribuye los hijos con espacio entre ellos
    marginBottom: 10, // Margen inferior
  },
  button: {
    backgroundColor: 'gold', // Fondo dorado
    padding: 15, // Espaciado interno
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Color de la sombra negro
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 5, // Elevación para Android
  },
  buttonText: {
    color: '#fff', // Color de texto blanco
    fontSize: 18, // Tamaño de fuente medio
    textAlign: 'center', // Centra el texto
    fontWeight: 'bold', // Negrita
  },
  reminderButton: {
    marginVertical: 10, // Espaciado vertical
  },
  reminderItem: {
    padding: 20, // Espaciado interno
    marginVertical: 10, // Espaciado vertical externo
    backgroundColor: 'white', // Fondo blanco
    borderRadius: 10, // Bordes redondeados
    borderBottomWidth: 1, // Ancho del borde inferior
    borderBottomColor: '#ccc', // Color del borde inferior gris claro
  },
  reminderTitle: {
    fontSize: 18, // Tamaño de fuente medio
    fontWeight: 'bold', // Negrita
  },
  reminderDetail: {
    fontSize: 16, // Tamaño de fuente pequeño
    marginVertical: 2, // Espaciado vertical
    color: 'gray', // Color de texto gris
  },
  deleteButton: {
    marginTop: 10, // Margen superior
    backgroundColor: 'red', // Fondo rojo
    padding: 10, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  deleteButtonText: {
    color: 'white', // Color de texto blanco
    fontWeight: 'bold', // Negrita
    fontSize: 16, // Tamaño de fuente pequeño
  },
  centeredView: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra los hijos verticalmente
    alignItems: 'center', // Centra los hijos horizontalmente
    marginTop: 22, // Margen superior
  },
  modalView: {
    margin: 20, // Margen alrededor
    backgroundColor: 'white', // Fondo blanco
    borderRadius: 20, // Bordes redondeados
    padding: 35, // Espaciado interno
    alignItems: 'center', // Centra el contenido horizontalmente
    shadowColor: '#000', // Color de la sombra negro
    shadowOffset: {
      width: 0,
      height: 2,
    }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 5, // Elevación para Android
  },
  modalText: {
    marginBottom: 15, // Margen inferior
    textAlign: 'center', // Centra el texto
    fontSize: 20, // Tamaño de fuente medio
    fontWeight: 'bold', // Negrita
  },
  input: {
    width: 200, // Ancho del input
    height: 40, // Alto del input
    borderColor: 'gray', // Color del borde gris
    borderWidth: 1, // Ancho del borde
    borderRadius: 5, // Bordes redondeados
    paddingHorizontal: 10, // Espaciado interno horizontal
    marginVertical: 10, // Espaciado vertical
  },
  datePickerText: {
    fontSize: 16, // Tamaño de fuente pequeño
    marginVertical: 10, // Espaciado vertical
  },
  picker: {
    height: 50, // Altura del picker
    width: 150, // Ancho del picker
    marginVertical: 10, // Espaciado vertical
  },
  listContent: {
    paddingBottom: 20, // Añade padding inferior para asegurarse de que todos los elementos sean visibles
  },
  
});

export default styles; // Exporta el objeto de estilos
