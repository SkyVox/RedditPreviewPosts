import styled from 'styled-components';

export const CenteredDiv = styled.div`
    width: 75%;
    height: 100%;
    margin: auto;
    text-align: center;
`;

export const StyledLine = styled.hr`
    width: 5%;
    border-color: var(--darker-gray);
`;

export const Title = styled.h3`
    color: var(--black);
`;

export const Content = styled.div`
    display: inline-block;
    margin: 0 5em;
`;

export const StyledBox = styled.div`
    display: inline-block;
    width: 80%;
    border-radius: 5px;
    border: 1px solid var(--white);
    background-color: var(--white);
`;

export const RedirectPageBox = styled.div`
    width: 100%;
    text-align: left;
`;

export const RedirectButton = styled.button`
    padding: 0.5em;
    margin: 5px;
    color: var(--white);
    background-color: var(--darker-gray);
    border: none;
    border-radius: 10px;
    border: 1px solid var(--darker-gray);
    font-size: 1em;
    cursor: pointer;

    &:hover {
        color: var(--darker-gray);
        background-color: var(--white);
    }

    &:focus {
        color: var(--black);
        outline: none;
    }
`;