import React, { createContext,  useEffect,  useState } from "react";


export const context = createContext();


export const ContextProvider = (props) => {
  const [show ,setShow] = useState(false)

  const value ={
    show,
    setShow
  }
  
  return (
    <context.Provider value={value}>
      {props.children}
    </context.Provider>
  );
};


