import styled from "styled-components";

export const SaveTodoIcon = styled.div`
height: 25px;
width: 25px;
border: 1px solid rgba(133, 133, 133, .5);
border-radius: 50%;
&:hover {
    background-image: ${(props) => props.hoverBG};
    cursor: ${(props) => props.cursor};
}
position: relative;
left: ${(props) => props.left};
display: flex;
justify-content: center;
align-items: center;
`