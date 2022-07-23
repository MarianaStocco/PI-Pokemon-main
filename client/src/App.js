import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Details from './components/details/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/pokemons' component={Home} />
          <Route path = '/pokemons/:id' component = {Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
