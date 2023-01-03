import styled from "styled-components";

export const MainContentButton = styled.div`
height: 42px;
width: 316px;
background-color: ${(props) => props.bg};
display: flex;
justify-content: center;
align-items: center;
&:hover {
    cursor: pointer;
}
border-radius: 6.5px;
`