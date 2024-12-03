import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/Components/Login/LoginForm.jsx';
import Home from './src/Components/Home/Home.jsx';
import RegisterForm from './src/Components/Login/RegisterForm.jsx';
import Create from './src/Components/Cruds/Create.jsx'
import Delete from './src/Components/Cruds/Delete.jsx'
import ContactDetail from './src/Components/Cruds/ContactDetail.jsx'
import Vista from './src/Components/Cruds/Vista.jsx'
import EditForm from './src/Components/Cruds/EditForm.jsx';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Bienvenido a Contactos" component={LoginForm} />
        <Stack.Screen name="Registro" component={RegisterForm} />
        <Stack.Screen name="Página Principal" component={Home} />
        <Stack.Screen name="Crear" component={Create} />
        <Stack.Screen name="Detalles del Contacto" component={ContactDetail} />
        <Stack.Screen name="Borrar" component={Delete} />
        <Stack.Screen name="Editar Formulario" component={EditForm} />
        <Stack.Screen name="Ver" component={Vista} />
        
      </Stack.Navigator>
    );
  }

  return (
  <NavigationContainer>
    <MyStack/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9', // Color de fondo neutro, elegante
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para cada pantalla
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '600', // Negrita pero formal
    color: '#2C3E50', // Color gris oscuro
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7F8C8D', // Gris para subtítulos
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498DB', // Azul más formal
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    elevation: 3, // Sombra sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    height: 45,
    backgroundColor: '#ECF0F1', // Fondo claro para inputs
    borderColor: '#BDC3C7', // Color de borde gris claro
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    color: '#34495E', // Color de texto gris oscuro
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
  },
  errorText: {
    color: '#E74C3C', // Rojo claro para errores
    fontSize: 14,
    marginBottom: 10,
  },
});
