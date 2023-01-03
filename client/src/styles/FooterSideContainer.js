import styled from "styled-components";

export const FooterSideContainer = styled.div`
height: 100%;
width: 25%;
display: flex;
justify-content: ${(props) => props.jc};
align-items: center;
padding-left: ${(props) => props.pl};
padding-right: ${(props) => props.pr};
`