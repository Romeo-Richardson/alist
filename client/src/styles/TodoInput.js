import styled from "styled-components";

export const TodoInput = styled.input`
height: 36px;
width: 75%;
background-color: rgba(0, 0, 0, 0);
border: 1px solid rgba(133, 133, 133, .1);
color: white;
position: relative;
border-radius: 6.5px;
right: 35px;
color: ${(props) => props.textColor};
`