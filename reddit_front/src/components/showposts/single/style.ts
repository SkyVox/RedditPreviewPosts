import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CenteredDiv = styled.div`
    width: 100%;
    margin: auto;
    text-align: center;
`;

export const PostInformation = styled.div`
    width: 100%;
    text-align: left;
`;

export const InteractiveButtons = styled.div`
    display: inline-block;
    margin: 0 2em;
    padding: 1.5px 0.5em;
    border-radius: 3px;
    border: 1px solid var(--white);
`;

export const InteractiveIcon = styled(FontAwesomeIcon)`
    margin: 0 0.2em;
    cursor: pointer;
`;