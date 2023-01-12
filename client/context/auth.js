import React, {useState, useEffect, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

const StateContext = ({children}) => {
  const [state, setState] = useState({
    token: "",
    user: {key: "value"}
  })

  useEffect(() => {
    console.log(state)
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem('auth-key');
      const parsed = JSON.parse(data);
      console.log("this is parsed" + parsed)
      setState({...state, user: parsed.user, token: parsed.token})
    }
    loadFromAsyncStorage();
  }, [])

  return (
    <Context.Provider value={{state, setState}}>
        {children}
    </Context.Provider>
  )
}

export {Context, StateContext};