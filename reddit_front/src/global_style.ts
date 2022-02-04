import styled, { createGlobalStyle } from 'styled-components';

export const Wrapped = styled.div`
    display: inline-flex;
    width: 100%;
    height: 100%;
`;

export const CenteredDiv = styled.div`
    display: inline-flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const GlobalStyle = createGlobalStyle`
    html, body {
        --background-color: #808080;
        --darker-gray: #696969;
        --black: #202020;
        --white: #E8E8E8;

        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        min-width: 850px;

        font: 1rem 'Trebuchet MS', sans-serif;

        background-color: var(--background-color);
    }
`;

export default GlobalStyle;