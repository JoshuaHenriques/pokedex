import { Button, Form, Input, Select } from "antd"
import { FormInput } from "../../../types/FormInputType"
import React from "react"

type PropType = {
    cache?: FormInput,
    onFinish?: (data: FormInput) => void
}

const POKEMON_TYPES: string[] = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting", 
"Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", 
"Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy"]

const compare = (prevProps: PropType, nextProps: PropType) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

const SearchForm = ({cache, onFinish}: PropType) => {
    return (
        <Form 
            name="search"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={cache}
            onFinish={onFinish}
        >
            <Form.Item<FormInput>
                label="Name"
                name="name"
            >
                <Input />
            </Form.Item>  

            <Form.Item<FormInput>
                label="Type"
                name="type"
            >
                <Select allowClear >
                    {
                        POKEMON_TYPES.map((type: string) => <Select.Option key={Math.random()} value={type}>{type}</Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default React.memo(SearchForm, compare)