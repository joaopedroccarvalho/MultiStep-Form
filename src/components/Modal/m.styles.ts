import styled from "styled-components";


export const Container = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);

    .modal-content {
    width: 100%;
    max-width: 540px;
    background: #fff;
    margin: 100px auto 20px;
    padding: 40px 30px 70px;
    border-radius: 10px;
  }
  .closeModal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  .closeModal:hover,
  .closeModal:focus {
    color: black;
  }
  label {
    display: block;
    margin-top: 10px;
  }
  button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
  }
input, select {
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid black;
  box-sizing: border-box;
}
select {
  appearance: none; /* Remove a seta padrão do select em alguns navegadores */
}
  button {
    background-color: #4387b8  ;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
  }
  .error-message {
    color: red;
    font-weight: bold;
    font-size: 15px;
    margin-top: 0px;
  }

  @media (max-width: 610px) {
    .modal-content {
      max-width: 500px;
      width: 100%;
    }
  }
  @media (max-width: 560px) {
    .modal-content {
      max-width: 400px;
      width: 100%;
    }
  }
  @media (max-width: 460px) {
    .modal-content {
      max-width: 300px;
      width: 100%;
    }
  }
  @media (max-width: 360px) {
    .modal-content {
      max-width: 250px;
      width: 100%;
    }
  }
`;
