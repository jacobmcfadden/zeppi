import React from 'react';
import routes from './routes';
import {useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.scss';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 800,
})
function App() {
  
  let location = useLocation()

  return (
    <div className="App">
      {(location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login') ? <Navbar/> : null}
      {routes}
    </div>
  );
}

export default App;
