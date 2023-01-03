import styled from "styled-components";

export const DynamicText = styled.p`
color: ${(props) => props.textColor};
font-size: ${(props) => props.size};
&:hover {
    color: ${(props) => props.hoverColor};
    cursor: ${(props) => props.cursor};
};
font-weight: ${(props) => props.weight};
`