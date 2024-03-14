import { Avatar, List} from "antd"
import { Pokemon } from "../../../services/poke-client/client"
import { Link } from "react-router-dom"
import { InfoCircleOutlined } from "@ant-design/icons"
import React from "react"

type PropType = {
    pokemon: Pokemon[],
    loading: boolean
}

const compare = (prevProps: PropType, nextProps: PropType) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

const PokemonList = ({pokemon, loading}: PropType) => {
    return (
        <List
            dataSource={pokemon}
            pagination={{ defaultPageSize: 25 }}
            loading={loading}
            renderItem={(item) => (
                <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size={64} src={item.image.thumbnail} />}
                            title={<Link to={`/${item.name.english}`} rel="noopener noreferrer">{item.name.english} [{item.type.join(', ')}]</Link>}
                            description={item.description}
                        />
                        <Link to={`/${item.name.english}`} rel="noopener noreferrer">
                            <InfoCircleOutlined />
                        </Link>
                </List.Item>
        )}
      />
    )
}

export default React.memo(PokemonList, compare)