import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app.router.js';
import { Authentication } from './Authentication.js';
import { useState } from 'react';
import { getDataFromCookie } from './services/storage.service.js';
import { UserContext } from './services/usercontext.service.js';
import { store } from './services/redux-storage.service.js';

function App() {

  const [user, setUser] = useState(null);

  function getUserData(){
    let data = getDataFromCookie();
    setUser(data);

    //redux
    store.subscribe(() => {
      setUser(store.getState()?.user)
    });

  }


  return (

    <BrowserRouter>
      <Authentication>
        <UserContext.Provider value={user}>
          <AppRouter></AppRouter>
        </UserContext.Provider>
      </Authentication>
    </BrowserRouter>

  );
}

export default App;
