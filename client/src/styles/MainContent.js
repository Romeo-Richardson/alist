import styled from "styled-components";

export const MainContent = styled.div`
height: 275px;
width: 475px;
background-color: ${(props) => props.bg};
position: relative;
top: 20px;
display: flex;
flex-direction: column;
align-items: ${(props) => props.ai};
justify-content: ${(props) => props.jc};
padding-top: ${(props) => props.pt};
padding-bottom: ${(props) => props.pb};
border-top-left-radius: 6.5px;
border-top-right-radius: 6.5px;
overflow: auto;
transition: .75s;
`