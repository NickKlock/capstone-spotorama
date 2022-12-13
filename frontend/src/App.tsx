import React from 'react';
import Map from "./components/Map";
import useAccessToken from "./useAccessToken";

function App() {

  const {token} = useAccessToken()

  return (
      <Map token={token}/>
  )
}

export default App;
