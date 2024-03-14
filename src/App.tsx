import { PokedexPage } from './pages/pokedex/PokedexPage';
import { PokemonPage } from './pages/pokemon/PokemonPage';
import { Routes, Route } from 'react-router-dom';
import { PokedexClient } from './services/poke-client/client';

function App() {
  const pokedex: PokedexClient = new PokedexClient()
  
  return (
    <Routes>
      <Route path="/" element={<PokedexPage pokedex={pokedex} />}/>
      <Route path="/:name" element={<PokemonPage pokedex={pokedex} />} />
    </Routes>
  );
}

export default App;
