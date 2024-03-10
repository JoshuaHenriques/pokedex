import pokedata from './data/pokemon.json'

export type Pokemon = typeof pokedata[number]


/**
 * To initialize: const Pokedex = new PokedexClient()
 * 
 * const pokemon = PokedexClient.listPokemon()
 * const charizard = PokedexClient.getPokemonByName('charizard')
 */
export class PokedexClient {
  private pokedex: Map<string, Pokemon> = new Map()
  constructor() {
    pokedata.forEach((pokemon) => this.pokedex.set(pokemon.name.english, pokemon))
  }

  /**
   * Returns a list of pokemon filtered by name and or type
   */
  listPokemon({ name, type }: { name?: string, type?: string }) {
    console.log({pokedata, name, type})
  }

  /**
   * Returns a single pokemon selected by exact name match
   */
  getPokemonByName(name: string) {
 
  }
}