import { useEffect, useState } from "react"
import { PokedexClient, Pokemon } from "../../services/poke-client/client"
import PokemonList from "./components/PokemonList"
import SearchForm from "./components/SearchForm"
import { FormInput } from "../../types/FormInputType"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Layout } from "../../components/Layout"
import { ContentWrapper } from "../../components/ContentWrapper"
import { Row, Col } from "antd"
import { CacheType } from "../../types/CacheType"

export const PokedexPage = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [cache, saveCache] = useLocalStorage<CacheType>("cache", undefined)
    const pokedex: PokedexClient = new PokedexClient()

    const handleFormSubmit = (data: FormInput) => {
        const pokemon: Pokemon[] = pokedex.listPokemon({
            name: data.name != "" ? data.name : undefined,
            type: data.type
        })
        saveCache({ ...data, pokemon })
        setPokemonList(pokemon)
    }

    useEffect(() => {
        let pokemon: Pokemon[]
        // If the dataset wasn't static, I would just cache the query and refetch the results instead
        // if (cache && (cache.name || cache.type)) {
        //     pokemon = pokedex.listPokemon({ name: cache.name, type: cache.type})
        if (cache && cache.pokemon) {
            pokemon = cache.pokemon
        } else {
            pokemon = pokedex.listPokemon({})
        }
        setPokemonList(pokemon)
        setLoading(false)
    }, [])

    return (
        <Layout>
            <ContentWrapper>
                <Row>
                    <Col span={16} offset={2}>
                        <SearchForm onFinish={handleFormSubmit} cache={{ name: cache.name, type: cache.type }}/>
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