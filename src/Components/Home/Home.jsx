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
    backgroundColor: '#F5F5F5', // Fondo gris claro
    padding: 25,
  },
  icon: {
    marginBottom: 20,
    color: '#FF6F61', // Ícono en color coral
    shadowColor: '#333', // Sombra sutil
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#333', // Texto oscuro
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde vibrante
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '85%',
    alignItems: 'center',
    elevation: 6, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButton: {
    backgroundColor: '#F44336', // Rojo brillante
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '85%',
    alignItems: 'center',
    elevation: 6, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textBtn: {
    color: '#FFF', // Texto blanco
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
