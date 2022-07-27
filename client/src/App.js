import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Details from './components/details/Details';
import PokemonCreate from './components/pokemonCreate/PokemonCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route 
          exact path='/' 
          component={Landing} />
          <Route 
          path='/pokemons' 
          component={Home} />
          <Route 
          path = '/details/:id' 
          component = {Details} />
          <Route 
          path = '/pokemon' 
          component = {PokemonCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
