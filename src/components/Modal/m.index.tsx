import React, { useState } from 'react';
import * as C from './m.styles';
import { Item } from '../../types/Item';
// @ts-ignore
import InputMask from 'react-input-mask';

// Definição das propriedades que o Modal espera receber
type ModalProps = {
  show: boolean;
  onClose: () => void;
  sendTask: (task: Item) => void;
};

// Definição do componente Modal como uma função de componente React
export const Modal: React.FC<ModalProps> = ({ show, onClose, sendTask }) => {

  // Função para formatar uma data em string no formato 'dd/mm/aaaa'
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  // Estado local para armazenar informações da tarefa sendo adicionada
  const [taskInfo, setTaskInfo] = useState<Item>({
    id: 0,
    name: '',
    done: false,
    date: '',
    priority: 'Alta',
  });

  // Estados locais para gerenciar mensagens de erro
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  // Função para lidar com mudanças nos campos de input e select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTaskInfo({
      ...taskInfo, // crio uma cópia do objeto taskInfo
      [e.target.name]: e.target.value
      // e.target.name representa o nome da propriedade no objeto taskInfo que está sendo alterado.
      //e.target.value representa o valor atual do campo de input ou select que disparou o evento de mudança (onChange). Esse valor é atribuído à propriedade do novo objeto que corresponde ao campo sendo modificado.
    });

    // Limpa mensagens de erro relacionadas ao campo modificado
    if (e.target.name === 'name') {
      setDescriptionError('');
    } else if (e.target.name === 'date') {
      setDateError('');
    }
  };

  // Função para enviar a tarefa após validações
  const handleSendTask = () => {
    setDescriptionError(!taskInfo.name ? 'Este campo é obrigatório!' : '');
    setDateError(!taskInfo.date ? 'Este campo é obrigatório!' : '');

    if (taskInfo.name && taskInfo.date) {
      // Formatação da data e envio da tarefa
      const dateToParse = typeof taskInfo.date === 'string' ? taskInfo.date : formatDate(taskInfo.date);
      const [day, month, year] = dateToParse.split('/');
      sendTask({
        ...taskInfo,
        date: new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)),
      });
      // Fecha o modal e reseta as informações da tarefa
      onClose();
      setTaskInfo({
        id: 0,
        name: '',
        done: false,
        date: formatDate(new Date()),
        priority: 'Alta',
      });
    }
  };


  return (
    <C.Container show={show}>
      <div className='modal-content'>
        <span className='closeModal' onClick={onClose}>&times;</span>
        <form className="taskForm">
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            className={`tarefa ${descriptionError ? 'error' : ''}`}
            name="name"
            value={taskInfo.name}
            onChange={handleChange}
          />
          {descriptionError && <p className="error-message">{descriptionError}</p>}
          <label htmlFor="date">Data:</label>
          <InputMask
            mask="99/99/9999"
            maskChar="_"
            type="text"
            className={`date ${dateError ? 'error' : ''}`}
            name="date"
            placeholder="dd/mm/aaaa"
            value={taskInfo.date}
            onChange={handleChange}
          />
          {dateError && <p className="error-message">{dateError}</p>}
          <label htmlFor="priority" className='prioridade'>Prioridade:</label>
          <select
            name="priority"
            value={taskInfo.priority}
            onChange={handleChange}
            required
          >
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          <button onClick={handleSendTask} type='button'>Adicionar Tarefa</button>
        </form>
      </div>
    </C.Container>
  );
};
