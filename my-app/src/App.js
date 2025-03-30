import React from "react";
 
import HomePage from "./HomePage";
import { Route } from "react-router-dom";
import { ContextProvider } from "./Componts/Context/Context";
 

const App = () => {
  
  return (
    <ContextProvider>
          <HomePage/>

    </ContextProvider>
    
  )
};

export default App;
