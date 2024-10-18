import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router"
import React from 'react';

const Welcome = () => {
  return(
    <SafeAreaView style={styles.container}>
      <Text>Sign Up Screen</Text>
      <TouchableOpacity 
        onPress={()=> {
          router.replace("/(auth)/sign-up")
        }}
        style={styles.button}
      > 
        <Text>Sign Up Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex:1, 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  button: {
    flex:1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'flex-end',
  }
});