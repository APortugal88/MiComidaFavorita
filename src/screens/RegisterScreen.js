import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ActivityIndicator } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmarPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Validacion de correo
  const validaEmail = (email) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  //Valida contraseña
  const validaPasswordLongitud = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const validaPassword = (password) => {
    const mayuscula = /[A-Z]/.test(password); //Mayuscula
    const minuscula = /[a-z]/.test(password); //Minuscula
    const numero = /[0-9]/.test(password); //numero
    const caracter = /[!@#$%^&*]/.test(password); //Caracter especial

    return mayuscula && minuscula && numero && caracter;
  };

  const handleRegister = async () => {
    if (!validaEmail(email)) {
      setError("Por favor ingrese un correo valido.");
      return;
    }

    if (!validaPasswordLongitud(password)) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!validaPassword(password)) {
      setError(
        "La contraseña debe incluir una letra mayuscula, una letra minuscula, un numero y un caracter especial."
      );
      return;
    }

    //valida coincidencia de pasword
    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.replace("Home");
    } catch (error) {
      setError("Error al registrarse: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Registro
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Contraseña"
        value={confirmarPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Registrarse"
          onPress={handleRegister}
          containerStyle={styles.button}
        />
      )}
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate("Login")}
        containerStyle={styles.button}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
