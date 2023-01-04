import styled from "styled-components";

export const MainHeader = styled.div`
width: 475px;
height: 65px;
background-color: ${(props) => props.bg};
position: relative;
top: 0px;
display: flex;
justify-content: ${(props) => props.jc};
align-items: center;
border-radius: 6.5px;
padding-right: ${(props) => props.pr};
transition: .75s;
`