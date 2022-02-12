import styled from "styled-components";

export const CommentWrap = styled.div`
    text-align: center;
`;

export const CommentBox = styled.div`
    height: 30em;
    overflow: scroll;
    margin: auto 2em;
    border-radius: 5px;
    border: 1px solid var(--darker-gray);
    text-align: start;
`;

export const AddCommentBox = styled.div`
    padding: 1em;
`;

export const AddCommentInput = styled.input`
    width: 45%;
    padding: 0.5em;
    margin-right: 0.5em;
`;

export const AddCommentButton = styled.button`
    padding: 0.3em;
    margin-left: 1em;
`;

export const Comment = styled.div`
    border-radius: 5px;
    border: 1px solid var(--darker-gray);
    margin-top: 0.2em;
    background-color: var(--darker-gray);
    color: var(--white);

    // Comment Info - Author
    h4 {
        margin: 0px;
        display: inline-block;
    }

    // Comment Info - Text
    h5 {
        margin: 0px 0.5em;
    }

    // Comment Info - Date
    h6 {
        margin: 0px;
        display: inline-block;
        padding-left: 4em;
        font-style: italic;
        color: var(--black);
    }
`;
