import React, { createContext, useState , useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin , GoogleSigninButton , statusCodes, } from '@react-native-google-signin/google-signin';

export const EmoneyContext = createContext();

export const EmoneyProvider = ({ children }) => {

  const [id, setId] = useState("");
  const [user, setUser] = useState([]);
  const [state, setState] = useState("home");
  const [complete, setComplete] = useState(0);
  const [userFull, setUserFull] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? 
      setUser(JSON.parse(jsonValue))
      // console.log(jsonValue) 
      : null;
    } catch(e) {
      // error reading value
    }
  }
  

  useEffect(() => {
    // getLanguageData();  
    getData();  
    // getAccount();
    // getNewsData();
    // getLastBreaking()
  }, []);

  return (
    <EmoneyContext.Provider
      value={{
        id,
        setId,
        state,
        setState,
        user,
        setUser,
        complete,
        setComplete,
        userFull,
        setUserFull
      }}
    >
      {children}
    </EmoneyContext.Provider>
  );
};