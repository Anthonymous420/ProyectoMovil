import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import connection from '../../utils/connection';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(connection);

const Create = (props) => {

  const initialState = {
    nombre: "",
    apellido: "",
    edad: "",
    sexo: "Hombre", // Valor inicial para el Picker
    telefono: "",
    email: props.route.params.y
  };
  const [state, setState] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const guardar = async () => {
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
      console.log(props.route.params.y)
      try {
        await addDoc(collection(db, 'contactos'), {
          ...state
        });
        Alert.alert('Listo', 'Contacto guardado con éxito');
        props.navigation.navigate('Página Principal',props.route.params.y);
      } catch (error) {
        console.error(error);
      }
    }
    setFormError(errors);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Ingresar Contacto</Text>
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
      <TouchableOpacity onPress={guardar} style={styles.button}>
        <Text style={styles.textBtn}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
   container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC', // Fondo claro
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#38B2AC', // Verde agua
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    borderWidth: 1.5,
    borderColor: '#9bfab0',
  },
});
