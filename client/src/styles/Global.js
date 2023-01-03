import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
body {
    background-color: ${(props) => props.bg};
    height: 100vh;
    width: 100vw;
    padding: 0px;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Josefin Sans', sans-serif;
    transition: .75s;
}
`