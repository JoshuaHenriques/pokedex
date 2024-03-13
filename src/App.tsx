import './App.css';
import { PokedexPage } from './pages/pokedex/PokedexPage';
import { PokemonPage } from './pages/pokemon/PokemonPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />}/>
      <Route path="/:name" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;
