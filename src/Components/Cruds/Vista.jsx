import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import connection from "../../utils/connection";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Vista({ navigation, route }) {
  const db = getFirestore(connection);
  const corr=route.params.y;
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLista, setFilteredLista] = useState([]);

  useEffect(() => {
    if (route.params?.refresh) {
      getLista();
      route.params.refresh = false
    }
  }, [route.params?.refresh]);

  useEffect(() => {
    getLista();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [search, lista]);

  const getLista = async () => {
    try {
      const traerContactos = await getDocs(collection(db, "contactos"));
      const contactos = traerContactos.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).sort((a, b) => a.nombre.localeCompare(b.nombre));

      const contactosFiltrados = contactos.filter((contacto) => contacto.email === route.params?.y);
      setLista(contactosFiltrados);
      setFilteredLista(contactosFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  const filterContacts = () => {
    const filtered = lista.filter((contacto) => {
      const nombre = contacto.nombre ? contacto.nombre.toLowerCase() : "";
      const apellido = contacto.apellido ? contacto.apellido.toLowerCase() : "";
      const edad = contacto.edad ? contacto.edad.toString() : "";
      const sexo = contacto.sexo ? contacto.sexo.toLowerCase() : "";
      const telefono = contacto.telefono ? contacto.telefono : "";

      return (
        nombre.includes(search.toLowerCase()) ||
        apellido.includes(search.toLowerCase()) ||
        edad.includes(search) ||
        sexo.includes(search.toLowerCase()) ||
        telefono.includes(search)
      );
    });
    setFilteredLista(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por nombre, apellido, edad, sexo o teléfono"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={filteredLista}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalles del Contacto", { ...item ,corr})}
          >
            <View style={styles.itemContainer}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemDetalle}>Apellido: {item.apellido}</Text>
                <Text style={styles.itemDetalle}>Edad: {item.edad}</Text>
                <Text style={styles.itemDetalle}>Sexo: {item.sexo}</Text>
                <Text style={styles.itemDetalle}>Teléfono: {item.telefono}</Text>
              </View>
              <Icon name="contact-page" size={40} color="#2a8c4a" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF4', // Verde muy claro
    padding: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#68D391', // Verde claro
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  lista: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#68D391',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a8c4a',
  },
  itemDetalle: {
    fontSize: 16,
    color: '#2a8c4a',
  },
  icon: {
    marginLeft: 10,
  },
});
