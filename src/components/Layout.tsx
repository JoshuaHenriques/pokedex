import { Content } from "antd/es/layout/layout";
import { LayoutWrapper } from "./LayoutWrapper";
import {Layout as AntLayout} from "antd";

type PropType = {
    children: string | JSX.Element | JSX.Element[]
}

export const Layout = ({children}: PropType) => {
    return (
        <LayoutWrapper>
            <AntLayout>
                <Content>{children}</Content>
            </AntLayout>
        </LayoutWrapper>
    );
};