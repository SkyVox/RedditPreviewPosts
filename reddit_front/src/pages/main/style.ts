import styled from 'styled-components';

export const StyledBox = styled.div`
    padding: 150px;
    border-radius: 10px;
    border: 1px solid var(--white);
    background-color: var(--darker-gray);
    box-shadow: -0.2em -0.2em 0.5em var(--darker-gray), 0.2em 0.2em 0.5em var(--darker-gray);

    &:hover {
        border: 1px solid gray;
        background-color: #686868;
    }
`;

export const Form = styled.form``;
export const Label = styled.label``;

export const Input = styled.input`
    display: block;
    margin: 10px 0;
    padding: 4px;
`;

export const PopularTopicBox = styled.div`
    width: 100%;
    color: var(--white);
    text-align: center;
    font-weight: bold;
    padding: 1em 2em;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid var(--background-color);
    cursor: pointer;

    &:hover {
        color: var(--darker-gray);
        background-color: var(--white);
    }
`;