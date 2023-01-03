import styled from "styled-components";

export const Hover = styled.span`
&:hover {
    cursor: pointer;
}
position: relative;
right: ${(props) => props.right}
`