import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const checkUser = (username, passwordhash, login)=>
{
  fetch('http://localhost/loginapp/user.php', 
  {
        method: 'post',
        headers:
         {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
        (
          {
            user: username,
            hash: passwordhash
          }
        )
   }).then(response => response.json())
   .then(data => 
    {
     console.log(data);
     if ( data !== null)
          login(data.user.name); 

    }).catch(err =>console.log(err))
}


const Login = ({navigation, route}) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

      return <View>
        <Text style={{fontSize:20}}>Login</Text>
        <TextInput placeholder="Naam"  onChangeText={text => setUser(text)}
             
              ></TextInput>
        <TextInput placeholder="Wachtwoord" secureTextEntry={true}  
              onChangeText={text => setPassword(text)}
              ></TextInput>
         
          <Button title="login" onPress={() => {
            console.log("dit is de inhoud" + route);
             checkUser(user, password, route.params.onLogin);  

          }
        }
        
        ></Button>
        </View>;
}
const SecurePage = ({navigation,route}) =>
{
  return  <View>
    <Text>Wel ingelogd {route.params.username}</Text>
    <Button title="Logout" onPress={route.params.onLogout}></Button>
    </View>;
}


export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser]= useState('');

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {authenticated == false ? (
      // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={Login}
            options={{
              title: 'Sign in'
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              //animationTypeForReplace: state.isSignout ? 'pop' : 'push',
             }}
             initialParams={
              {
                username:user ,
                onLogin: (user) =>{setUser(user); setAuthenticated(true)}
              }
            }
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={SecurePage} 
          initialParams={
            {username:user ,
            onLogout: () =>{ setAuthenticated(false) }}
          }
         />
        )}
      </Stack.Navigator>
      </NavigationContainer>
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
