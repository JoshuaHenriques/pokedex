import { Pokemon } from "../services/poke-client/client"

export type CacheType = {
    name?: string,
    type?: string[],
    pokemon?: Pokemon[]
} 