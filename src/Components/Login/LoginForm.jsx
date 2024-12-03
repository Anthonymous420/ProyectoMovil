import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../utils/connection'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginForm({ navigation }) {

  const changeForm = () => {
    navigation.navigate('Registro')
  }

  const [formData, setFormData] = useState(initialsValues())
  const [formError, setFormError] = useState(initialsValues())

  function initialsValues() {
    return (
      {
        email: '',
        password: '',
      }
    )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFormData(initialsValues());
      setFormError(initialsValues());
    });

    return unsubscribe;
  }, [navigation]);

  const login = () => {
    let errors = {}
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        errors.email = true
      }
      if (!formData.password) {
        errors.password = true
      }
    } else {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          console.log('Logeado!')

          // Redireccionar a la pantalla de inicio (Home)
          navigation.navigate('Página Principal');
      }).catch((error) => {
        setFormError({
          email: true,
          password: true
        })
        console.log('No existe usuario con esas credenciales')
      })
    }
    setFormError(errors)
  }

  return (
    <View style={styles.container}>
      <Icon name="phone" size={100} color="#2a8c4a" style={styles.icon} />
      <Text style={styles.welcometext}>¡Hola!</Text>
      <Text style={styles.welcometext}>Ingresa tus datos</Text>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electrónico"
        placeholderTextColor="#cccccc"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#cccccc"
        secureTextEntry={true}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
      />
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.textBtn}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeForm} style={styles.button}>
        <Text style={styles.textBtn}>¡Regístrate!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fondo oscuro
    padding: 20,
  },
  icon: {
    marginBottom: 20,
    color: '#FF5722', // Ícono naranja brillante
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  textBtn: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  input: {
    height: 50,
    color: '#E0E0E0', // Texto gris claro
    width: '90%',
    backgroundColor: '#1F1F1F', // Fondo oscuro para inputs
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333', // Borde gris oscuro
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  welcometext: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3', // Azul vibrante
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  error: {
    borderColor: '#F44336', // Rojo para errores
  }
})
