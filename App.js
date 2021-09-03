import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView} from 'react-native';


const checkUser = (username, passwordhash, login)=>
{
  console.log("before fetch");
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


const Login = (props) => {
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
             checkUser(user, password, props.onLogin);  

          }
        }
        
        ></Button>
        </View>;
}
const SecurePage = (props) =>
{
  return  <View>
    <Text>Wel ingelogd {props.username}</Text>
    <Button title="Logout" onPress={props.onLogout}></Button>
    </View>;
}


export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser]= useState('');

  return (
    <SafeAreaView style={styles.container}>
      {
       authenticated? <SecurePage username={user} onLogout={ () => setAuthenticated(false) }/>  :
                 <Login onLogin= { (user)=> {
                        setAuthenticated(true);
                        setUser(user);
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
