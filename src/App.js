import './App.css';
import axios from "axios";
import React, {useState} from "react";

function App() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('onsubmithandler')
    axios.post('http://localhost:9001/auth/register', {
      email: email,
      username: username,
      password: password,
      role: role,
    })
    .then((response) => {
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      console.log(`refresh token -> ${refreshToken}`)
      console.log(`access token -> ${accessToken}`)
    });
    const bearerToken = 'Bearer ' + refreshToken;
    console.log(bearerToken)
    axios.get('http://localhost:8082/users/secured',{headers:{'Authorization':bearerToken}})
    .then((response) => {
      console.log(`response -> ${response}`)
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className="App">
      <form >
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          onChange={(e)=> setEmail(e.target.value)}
        /><br/>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          onChange={(e)=> setUsername(e.target.value)}
        /><br/>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={(e)=> setPassword(e.target.value)}
          /><br/>
        <label htmlFor='role'>Role</label>
        <input
          type='text'
          id='role'
          onChange={(e)=> setRole(e.target.value)}
          /><br/>
        <button type='submit' onClick={onSubmitHandler} >Submit</button>
        </form>
    <br/>
    <div></div>
    </div>
  );
}

export default App;
