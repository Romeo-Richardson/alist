import styled from "styled-components";

export const MainContentFooter = styled.div`
height: 35px;
width: 475px;
background-color: ${(props) => props.bg};
position: relative;
top: 30px;
border-bottom-left-radius: 6.5px;
border-bottom-right-radius: 6.5px;
display: flex;
flex-direction: row;
justify-content: space-around;
transition: .75s;
`