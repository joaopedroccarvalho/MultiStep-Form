import styled from "styled-components";

type ContainerProps = {
  done: boolean;
  priority: string; // Defina os valores permitidos para a propriedade priority
  borderColor: string;
};

const getBorderColor = (priority: string ): string => {
  switch (priority) {
    case 'Alta':
      return '#d63333';
    case 'Média':
      return '#ebeb35';
    case 'Baixa':
      return '#1095ee';
    default:
      return 'black';
  }
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column; /* Alterado para exibir os itens em coluna */
  background-color: #001f3f;
  box-shadow: 0 0 10px 2px rgba(52, 152, 219, 0.5);
  border-bottom: 2px solid ${(props) => props.borderColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;

  .colummOne {
    display: flex;
    justify-content: space-between; /* Distribui os itens no espaço disponível */
    align-items: center;
    margin-bottom: 10px; /* Adicionado espaço entre as columms */
  }

  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
  }

  label {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-decoration: ${props => (props.done ? 'line-through' : 'initial')};
    flex: 1;
  }
  .editButton {
    color: lightblue;
    cursor: pointer;
    margin-right: 10px;
    font-size: 28px;
  }
  .editButton:hover,
  .editButton:focus {
    color: darkslateblue;
  }
  .deleteButton {
    color: red;
    float: right;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
  }
  .deleteButton:hover,
  .deleteButton:focus {
    color: darkred;
  }
  .colummTwo {
    display: flex;
    flex-direction: column; /* Adicionado para exibir os itens em coluna */
  }
  .colummPriority {
    display: flex;
  }
  p {
    margin: 0;
    color: #ccc;
    margin-left: 10px;
  }
`