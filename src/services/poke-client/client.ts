import { FormInput } from '../../types/FormInputType'
import pokedata from './data/pokemon.json'

export type Pokemon = typeof pokedata[number]


/**
 * To initialize: const Pokedex = new PokedexClient()
 * 
 * const pokemon = PokedexClient.listPokemon()
 * const charizard = PokedexClient.getPokemonByName('charizard')
 */
// ERROR CHECK
export class PokedexClient {
  private pokedex: Map<string, Pokemon> = new Map()
  constructor() {
    pokedata.forEach((pokemon) => this.pokedex.set(pokemon.name.english, pokemon))
  }

  /**
   * Returns a list of pokemon filtered by name and or type
   */
  listPokemon({ name, type }: FormInput): Pokemon[] {
    const pokemon: Pokemon[] = Array.from(this.pokedex.values())

    if (name && name !== "") {
      const lowerName = name.toLowerCase()
      return pokemon.filter((poke) => {
        const startsWith: boolean = poke.name.english.toLowerCase().startsWith(lowerName.slice(0, Math.max(poke.name.english.length - 1, 1)))
        
        if (type && type.length > 0) {
          return startsWith && type.every(t => poke.type.includes(t))
        }
        
        return startsWith
      })
    } 
    else if (!name && type && type.length > 0) {
      return pokemon.filter((poke) => type.every(t => poke.type.includes(t)))
    } 

    return pokemon
  }

  /**
   * Returns a single pokemon selected by exact name match
   */
  getPokemonByName(name: string): Pokemon|undefined {
    if (this.pokedex.has(name)) {
      return this.pokedex.get(name)
    }
    return undefined
  }
}