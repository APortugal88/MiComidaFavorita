import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ActivityIndicator } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //Validacion de correo
  const validaEmail = (email) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  // valor correo
  const handleEmailChange = (email) => {
    setEmail(email);
    if (!validaEmail(email)) {
      setIsButtonDisabled(true);
      setError("Formato de email no válido.");
    } else {
      setError("");
      if (password !== "") {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  };

  //valor contraseñá
  const handlePasswordChange = (password) => {
    setPassword(password);
    if (password === "") {
      setIsButtonDisabled(true);
      setError("La contraseña no puede estar vacía.");
    } else {
      setError("");
      if (validaEmail(email)) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.replace("Home");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Mi Comida Favorita
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          containerStyle={styles.button}
          disabled={isButtonDisabled} 
        />
      )}
      <Button
        title="Registrarse"
        type="outline"
        onPress={() => navigation.navigate("Register")}
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
