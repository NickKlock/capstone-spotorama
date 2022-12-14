import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";

function App() {

  const {token} = useAccessToken()

  return (
      <Homepage token={token}/>
  )
}

export default App;
