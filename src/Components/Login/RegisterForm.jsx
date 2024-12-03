import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { validateEmail } from '../../utils/validacion';
import { auth, db } from '../../utils/connection';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function RegisterForm({ navigation }) {
    const changeForm = () => {
        navigation.navigate('Login');
    }

    const [formData, setFormData] = useState(initialsValues());
    const [formError, setFormError] = useState(initialsValues());

    function initialsValues() {
        return {
            email: '',
            password: '',
            repeatPassword: '',
        }
    }

    const register = async () => {
        let errors = {}
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) {
                errors.email = true;
            }
            if (!formData.password) {
                errors.password = true;
            }
            if (!formData.repeatPassword) {
                errors.repeatPassword = true;
            }
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // Save user in Firestore
                await addDoc(collection(db, "users"), {
                    email: formData.email,
                    password: formData.password
                });

                console.log("User registered and saved in Firestore: ", user);

                // Redireccionar a la pantalla de inicio de sesión
                navigation.navigate('Login');

            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/email-already-in-use') {
                    errors.email = 'El correo electrónico ya está en uso';
                } else if (errorCode === 'auth/invalid-email') {
                    errors.email = 'El correo electrónico no es válido';
                } else if (errorCode === 'auth/operation-not-allowed') {
                    errors.general = 'Operación no permitida';
                } else if (errorCode === 'auth/weak-password') {
                    errors.password = 'La contraseña es demasiado débil';
                } else {
                    errors.general = errorMessage;
                }

                console.log('Error registering user: ', errorCode, errorMessage);
                setFormError(errors);
            }
        }
        setFormError(errors);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcometext}>Regístrate</Text>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electrónico"
                placeholderTextColor="#cccccc"
                onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#cccccc"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#cccccc"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />
            {formError.email && <Text style={styles.errorText}>{formError.email}</Text>}
            {formError.password && <Text style={styles.errorText}>{formError.password}</Text>}
            {formError.repeatPassword && <Text style={styles.errorText}>{formError.repeatPassword}</Text>}
            {formError.general && <Text style={styles.errorText}>{formError.general}</Text>}
            <TouchableOpacity onPress={register} style={styles.button}>
                <Text style={styles.textBtn}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeForm} style={styles.button}>
                <Text style={styles.textBtn}>Iniciar sesión</Text>
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
    textBtn: {
        color: '#FFFFFF', // Texto blanco
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    input: {
        height: 50,
        color: '#E0E0E0', // Texto claro
        width: '90%',
        backgroundColor: '#1F1F1F', // Fondo oscuro para inputs
        borderRadius: 10,
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
        marginBottom: 20,
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
        elevation: 5, // Sombra para Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    error: {
        borderColor: '#F44336', // Rojo para errores
    },
    errorText: {
        color: '#F44336', // Texto rojo
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});
