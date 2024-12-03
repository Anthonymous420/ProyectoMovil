import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const changeForm = () => {
    navigation.navigate("Crear");
  };
  const viewContacts = () => {
    navigation.navigate("Ver");
  };
  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate("Bienvenido a Contactos", { reset: true });
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="contacts" size={100} color="#2a8c4a" style={styles.icon} />
      <Text style={styles.titulo}>¡Hola!</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={changeForm} style={styles.button}>
          <Text style={styles.textBtn}>Agregar un nuevo contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={viewContacts} style={styles.button}>
          <Text style={styles.textBtn}>Ver contactos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.textBtn}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A202C', // Fondo oscuro
    padding: 20,
  },
  icon: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F7FAFC', // Texto claro
    marginBottom: 30,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2B6CB0', // Azul vibrante
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5, // Sombra para Android
  },
  logoutButton: {
    backgroundColor: '#E53E3E', // Rojo vibrante
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5, // Sombra para Android
  },
  textBtn: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
