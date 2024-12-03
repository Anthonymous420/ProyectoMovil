import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import connection from '../../utils/connection';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const EditForm = (props) => {
  const db = getFirestore(connection);

  const initialState = {
    nombre: "",
    apellido: "",
    edad: "",
    sexo: "Hombre", // Valor inicial para el Picker
    telefono: "",
  };
  const [state, setState] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const update = async () => {
    let errors = {};
    if (!state.nombre || !state.apellido || !state.edad || !state.sexo || !state.telefono) {
      if (!state.nombre) errors.nombre = true;
      if (!state.apellido) errors.apellido = true;
      if (!state.edad) errors.edad = true;
      if (!state.sexo) errors.sexo = true;
      if (!state.telefono) errors.telefono = true;
    } else if (state.telefono.length !== 10) {
      errors.telefono = true;
      Alert.alert('Error', 'El número de teléfono debe tener 10 dígitos');
    } else {
      const ref = doc(db, "contactos", props.route.params.id);
      await updateDoc(ref, {
        nombre: state.nombre,
        apellido: state.apellido,
        edad: state.edad,
        sexo: state.sexo,
        telefono: state.telefono,
      });
      setState(initialState);
      props.navigation.navigate("Ver", { refresh: true });
    }
    setFormError(errors);
  };

  useEffect(() => {
    get(props.route.params.id);
  }, []);

  const get = async (id) => {
    const docRef = doc(db, "contactos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setState(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Contacto</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.nombre && styles.error]}
          placeholder="Nombre"
          placeholderTextColor="#cccccc"
          value={state.nombre}
          onChangeText={(value) => handleChangeText(value, 'nombre')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.apellido && styles.error]}
          placeholder="Apellido"
          placeholderTextColor="#cccccc"
          value={state.apellido}
          onChangeText={(value) => handleChangeText(value, 'apellido')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.edad && styles.error]}
          placeholder="Edad"
          placeholderTextColor="#cccccc"
          keyboardType="numeric"
          value={state.edad}
          onChangeText={(value) => handleChangeText(value, 'edad')}
        />
      </View>
      <View style={styles.inputGroup}>
        <Picker
          selectedValue={state.sexo}
          style={[styles.input, formError.sexo && styles.error]}
          onValueChange={(itemValue) => handleChangeText(itemValue, 'sexo')}
        >
          <Picker.Item label="Hombre" value="Hombre" />
          <Picker.Item label="Mujer" value="Mujer" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.telefono && styles.error]}
          placeholder="Teléfono"
          placeholderTextColor="#cccccc"
          keyboardType="phone-pad"
          value={state.telefono}
          onChangeText={(value) => handleChangeText(value, 'telefono')}
        />
      </View>
      <TouchableOpacity onPress={update} style={styles.button}>
        <Text style={styles.textBtn}>Modificar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF2F7', // Fondo neutro
    padding: 20,
  },
  titulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0AEC0',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3182CE', // Azul fuerte
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textBtn: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    borderWidth: 1.5,
    borderColor: '#9bfab0',
  },
});
