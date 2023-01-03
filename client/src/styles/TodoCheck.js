import styled from "styled-components";

export const TodoCheck = styled.div`
height: 20px;
width: 20px;
border: 1px solid rgba(133, 133, 133, .5);
border-radius: 50%;
&:hover {
    background-image: linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
    cursor: pointer;
}
position: relative;
left: 25px;
`