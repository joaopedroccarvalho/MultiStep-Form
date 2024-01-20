import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 12px 50px;
  background-color: #4387b8;
  
  color: #fff;
  font-size: 16px;
  border-radius: 40px;
  cursor: pointer;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 5px rgba(52, 152, 219, 0.5); /* Sombra com luz azul (espalhada) */
`;