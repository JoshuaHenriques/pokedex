import {Layout as AntLayout} from "antd";
import styled from "styled-components";

export const LayoutWrapper = styled(AntLayout)`
  background-color: #f0f2f5;

  .ant-layout {
    min-height: 100vh;
  }

  .ant-layout-content {
    margin: 24px;
  }
`;