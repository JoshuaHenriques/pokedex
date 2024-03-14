import { useEffect, useState } from "react"
import { PokedexClient, Pokemon } from "../../services/poke-client/client"
import PokemonList from "./components/PokemonList"
import SearchForm from "./components/SearchForm"
import { FormInput } from "../../types/FormInputType"
import { Layout } from "../../components/Layout"
import { ContentWrapper } from "../../components/ContentWrapper"
import { Row, Col } from "antd"

export const PokedexPage = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const pokedex: PokedexClient = new PokedexClient()

    const handleFormSubmit = (data: FormInput) => {
        const pokemon: Pokemon[] = pokedex.listPokemon({
            name: data.name != "" ? data.name : undefined,
            type: data.type
        })
        setPokemonList(pokemon)
    }

    useEffect(() => {
        let pokemon: Pokemon[]
        pokemon = pokedex.listPokemon({})
        setPokemonList(pokemon)
        setLoading(false)
    }, [])

    return (
        <Layout>
            <ContentWrapper>
                <Row>
                    <Col span={16} offset={2}>
                        <SearchForm onFinish={handleFormSubmit} />
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