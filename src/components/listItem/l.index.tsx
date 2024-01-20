import React, { useState } from 'react';
import { Item } from '../../types/Item';
import * as C from './l.styles';
import unCheckImage from '../../images/unchecked.png';
import CheckImage from '../../images/checked.png';

type Props = {
  item: Item;
  onChange: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
};

// Define uma função que recebe uma prioridade como argumento e retorna a cor correspondente com base na prioridade.
const getBorderColor = (priority: string): string => {
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

// Define o componente funcional ListItem que recebe as propriedades item, onChange, onDelete e onEdit.
// Utiliza o estado local isChecked para controlar se o item está marcado.
// Utiliza o estado local borderColor para controlar a cor da borda com base na prioridade do item.
export const ListItem = ({ item, onChange, onDelete, onEdit }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>(getBorderColor(item.priority));

  // Inverte o estado de isChecked quando a caixa de seleção é clicada.
  // Chama a função onChange passando o ID do item e o novo estado de conclusão.
  // Atualiza a cor da borda com base no estado atual de isChecked.
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(item.id, !isChecked);
    setBorderColor(isChecked ? getBorderColor(item.priority) : '#00FF00');
  };

  // Converte um timestamp (do tipo Date ou string) em uma string de formato 'dd/mm/aa'.
  // Realiza uma verificação para tratar casos em que a conversão de data falha.
  const formatDate = (timestamp: Date | string) => {
    const dateObject = new Date(timestamp);

    if (isNaN(dateObject.getTime()) || timestamp === '') {
      // Tratamento adicional, se necessário, para lidar com situações em que a conversão falha.
      return 'Data Inválida';
    }

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = String(dateObject.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <C.Container done={item.done} priority={item.priority} borderColor={borderColor}>
      <div className='colummOne'>
        <img
          src={item.done ? CheckImage : unCheckImage}
          alt="Checkbox"
          onClick={handleCheckboxChange}
        />
        <label>{item.name}</label>
        <span onClick={() => onEdit(item)} className="editButton">&#9998;</span>
        <span onClick={() => onDelete(item.id)} className="deleteButton">&times;</span>
      </div>
      <div className='colummTwo'>
        <p>Data: {formatDate(item.date)}</p>
        <div className='colummPriority'>
          <p>Prioridade:</p>
          <p style={{ color: 
                      item.priority === 'Alta' ? '#d63333' :
                      item.priority === 'Média' ? '#ebeb35' :
                      item.priority === 'Baixa' ? '#1095ee' : 
                      'black' }}> {item.priority}</p>
        </div>
      </div>
    </C.Container>
  );
};
