import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login'
import Logout from './components/Logout';
import Home from './components/Home'
import './App.css';

function App() {

  
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Switch>
        <Route exact path="/" component={Home}/>  
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
    </Switch>
  </BrowserRouter>   
</>
  )

}

export default App;
