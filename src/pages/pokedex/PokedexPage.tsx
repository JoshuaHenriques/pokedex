import { useEffect, useState } from "react"
import { Pokemon } from "../../services/poke-client/client"
import PokemonList from "./components/PokemonList"
import SearchForm from "./components/SearchForm"
import { FormInput } from "../../types/FormInputType"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Layout } from "../../components/Layout"
import { ContentWrapper } from "../../components/ContentWrapper"
import { Row, Col } from "antd"
import { CacheType } from "../../types/CacheType"
import { Pokedex } from "../../App"

export const PokedexPage = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [cache, saveCache] = useLocalStorage<CacheType>("cache", undefined)

    const handleFormSubmit = (data: FormInput) => {
        const pokemon: Pokemon[] = Pokedex.listPokemon(data)
        saveCache({ ...data, pokemon })
        setPokemonList(pokemon)
    }

    useEffect(() => {
        let pokemon: Pokemon[]
        if (cache && cache.pokemon && cache.pokemon.length > 0) {
            pokemon = cache.pokemon
        } else {
            pokemon = Pokedex.listPokemon({})
        }
        setPokemonList(pokemon)
        setLoading(false)
    }, [])

    return (
        <Layout>
            <ContentWrapper>
                <Row>
                    <Col span={16} offset={2}>
                        <SearchForm onFinish={handleFormSubmit} cache={cache && { name: cache.name, type: cache.type }}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <PokemonList pokemon={pokemonList} loading={loading} />
                    </Col>
                </Row>
            </ContentWrapper>
        </Layout>
    )
}