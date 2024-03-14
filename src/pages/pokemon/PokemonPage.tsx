import { useEffect, useState } from "react"
import { PokedexClient, Pokemon } from "../../services/poke-client/client"
import { Link, useParams } from "react-router-dom";
import { Col, Image, Row } from "antd";
import { CloseOutlined  } from '@ant-design/icons'
import { ContentWrapper } from "../../components/ContentWrapper";
import { Layout } from "../../components/Layout";

type PropTypes = {
    pokedex: PokedexClient
}

export const PokemonPage = ({ pokedex }: PropTypes) => {
    const [pokemon, setPokemon] = useState<Pokemon|undefined>(undefined)    
    const { name } = useParams<{name: string}>();

    useEffect(() => {
        if (name) {
            const data: Pokemon|undefined = pokedex.getPokemonByName(name)
            setPokemon(data)
        }
    }, [])

    return (
        <Layout>
            <ContentWrapper>
                {
                    pokemon && 
                        <>
                            <Link to="/" rel="noopener noreferrer">
                                <CloseOutlined style={{ fontSize: 32, float: "right" }} />
                            </Link>
                            <Row>
                                <Col span={16}>
                                    <h2>{pokemon.name.english} ({pokemon.name.japanese})</h2>
                                    <h3>Types: [{pokemon.type.join(', ')}]</h3>
                                    <h4>Species: {pokemon.species}</h4>
                                    <Row>
                                        <Col span={12}>
                                            <p>HP: {pokemon.base ? pokemon.base.HP : "???"}</p>
                                            <p>Attack: {pokemon.base ? pokemon.base.Attack : "???"}</p>
                                            <p>Defense: {pokemon.base ? pokemon.base.Defense : "???"}</p>
                                        </Col>
                                        <Col span={12}>
                                            <p>Sp. Defense: {pokemon.base ? pokemon.base["Sp. Defense"] : "???"}</p>
                                            <p>Speed: {pokemon.base ? pokemon.base.Speed : "???"}</p>
                                            <p>Sp. Attack: {pokemon.base ? pokemon.base["Sp. Attack"] : "???"}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Image src={pokemon.image.hires} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <h3>Profile:</h3>
                                    <p>Height: {pokemon.profile.height}</p>
                                    <p>Weight: {pokemon.profile.weight}</p>
                                    <p>Gender: {pokemon.profile.gender}</p>
                                    {pokemon.profile.egg && <p>Egg: {pokemon.profile.egg?.join(", ")}</p>}
                                    <p>Ability: {pokemon.profile.ability.map((ability) => ability[0]).join(", ")}</p>
                                </Col>
                                <Col span={12}>
                                    <h3>Evolution: </h3>
                                    {pokemon.evolution.prev && <p>Previous: {pokemon.evolution.prev.join(" -> ")}</p>}
                                    {pokemon.evolution.next && <p>Next: {pokemon.evolution.next[0].join(" -> ")}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h3>Description:</h3>
                                    <p>{pokemon.description}</p>
                                </Col>
                            </Row>
                        </>
                }
            </ContentWrapper>
        </Layout>
    )
}