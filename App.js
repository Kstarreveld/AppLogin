import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView} from 'react-native';

const Login = (props) => {
      return <View>
        <Text style={{fontSize:20}}>Login</Text>
        <TextInput placeholder="Naam"></TextInput>
        <TextInput placeholder="Wachtwoord" secureTextEntry="true"></TextInput>
        <Button title="login" onPress={props.onLogin}></Button>
        </View>;
}
const SecurePage = (props) =>
{
  return  <View>
    <Text>Wel ingelogd</Text>
    <Button title="Logout" onPress={props.onLogout}></Button>
    </View>;
}


export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {
       authenticated? <SecurePage onLogout={ () => setAuthenticated(false) }/>  :
                 <Login onLogin= { ()=> {
                        setAuthenticated(true)
                 }}/>
      }
      
    </SafeAreaView>
  );
}










const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
