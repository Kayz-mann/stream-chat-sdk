import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { auth } from '../../firebase';
import ButtonWithTitle from '../components/ButtonWithTitle';
import TextField from '../components/TextField';


interface LoginScreenProps {
  navigation: any;
  // authUser: string;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Chat");
      }
    })

    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const onTapOptions = () => {
    setIsSignup(!isSignup)
    setTitle(!isSignup ? 'Signup' : 'Login')
  }

  const onTapAuthenticate = () => {
    if (isSignup) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          const user = cred.user
          if (user?.getIdToken) {
            cred.user?.updateProfile({
              displayName: name,
              // photoURL: image
            });
          } else {
            auth.signInWithEmailAndPassword(email, password)
              // .catch((error) => alert(error))
          }
        })
        .catch((error) => alert(error.message));
    }
  }
  
  return (
    <View style={{ marginTop: 50 , alignItems: 'center'}}>
      <Text style={{ fontWeight: '700', fontSize: 20 }}>Welcome to Chat</Text>
      <View>
        <TextField placeholder='Email' onTextChange={setEmail} />
        {isSignup && 
          <TextField placeholder='Name' onTextChange={setPassword} isSecure={false} />
          
        }
        <TextField isSecure placeholder='Password' onTextChange={setPassword} />
        <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={340} height={50} />
          <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={340} height={50} isNoBg={true} />
      </View>
    </View>
  );
}

export default Login;