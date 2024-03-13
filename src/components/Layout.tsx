import { Content } from "antd/es/layout/layout";
import { LayoutWrapper } from "./LayoutWrapper";
import {Layout as AntLayout} from "antd";

export const Layout = ({children}:any) => {
    return (
        <LayoutWrapper>
            <AntLayout>
                <Content>{children}</Content>
            </AntLayout>
        </LayoutWrapper>
    );
};