import styled from "styled-components";

export const Container = styled.div`
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    .Congrats {
        font-size: 25px;
        margin-top: -10px;
    }

    .backButton {
        background-color: #25cd89;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        padding: 10px 40px;
        border: 0;
        border-radius: 30px;
        cursor: pointer;
        margin-bottom: -20px;
        text-decoration: none;

        &:hover {
        background-color: #1b7d61;
    }
    }

`;

export const InfoArea = styled.p`
    margin-bottom: 20px;
    border: 2px solid #25cd89;
    box-shadow: 0 0 10px 2px rgba(52, 152, 219, 0.5);
    border-radius: 10px;
`;
export const Info = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #16195c;
    border-radius: 10px;
`;

