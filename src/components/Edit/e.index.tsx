import React, { useEffect, useState } from 'react';
import * as C from './e.styles';
import { Item } from '../../types/Item';
// @ts-ignore
import InputMask from 'react-input-mask';

// Definição das propriedades que o EditModal espera receber
type EditModalProps = {
  showEdit: boolean;
  onCloseEditModal: () => void;
  sendEditTask: (updatedTask: Item) => void;
  editedTask: Item | null;
};

// Definição do componente EditModal como uma função de componente React
export const EditModal: React.FC<EditModalProps> = ({ showEdit, onCloseEditModal, sendEditTask, editedTask }) => {
  
  // Estado local para armazenar temporariamente informações da tarefa sendo editada
  const [tempEditedTaskInfo, setTempEditedTaskInfo] = useState<Item>({
    id: 0,
    name: '',
    done: false,
    date: new Date(),
    priority: 'Alta',
  });

  // Estados locais para gerenciar mensagens de erro
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  // Função para formatar uma data em string no formato 'dd/mm/aaaa'
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  // Efeito para atualizar o estado quando a propriedade editedTask é modificada
  useEffect(() => {
    if (editedTask) {
      setTempEditedTaskInfo({
        ...editedTask,
        date: editedTask.date instanceof Date ? formatDate(editedTask.date) : ''
      });
    }
  }, [editedTask]);

  // Função para lidar com mudanças nos campos de input e select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // name: Representa o nome do campo HTML que está sendo modificado. Isso é útil para identificar qual propriedade do estado deve ser atualizada.
    // value: Representa o valor atual do campo HTML que está sendo modificado. Isso é o que o usuário acabou de digitar ou selecionar.
    // Essas linhas de código desestruturam o objeto e.target, tornando mais fácil acessar esses dois valores específicos.

    // Atualiza  dinamicamente o estado tempEditedTaskInfo com base no campo que está sendo modificado.
    setTempEditedTaskInfo((prevTaskInfo) => ({
      ...prevTaskInfo, // Copia todas as propriedades existentes do estado anterior para garantir que não perdemos nenhuma informação.
      [name]: value //  Adiciona ou atualiza a propriedade do estado 
    }));

    // Limpa mensagens de erro relacionadas ao campo modificado
    if (name === 'name') {
      setDescriptionError('');
    } else if (name === 'date') {
      setDateError('');
    }
  };

  // Função para enviar a tarefa editada após validações
  const handleSendTask = () => {
    setDescriptionError(!tempEditedTaskInfo.name ? 'Este campo é obrigatório!' : '');
    setDateError(!tempEditedTaskInfo.date ? 'Este campo é obrigatório!' : '');
  
    if (tempEditedTaskInfo.name && tempEditedTaskInfo.date) {
      // Verifica se a data no estado tempEditedTaskInfo é do tipo Date. Se for, utiliza a função formatDate para converter a data em uma string no formato 'dd/mm/aaaa'. Se não for, assume que já está no formato de string desejado.
      const dateString = tempEditedTaskInfo.date instanceof Date
        ? formatDate(tempEditedTaskInfo.date)
        : tempEditedTaskInfo.date;
      // Divide a string da data formatada em dia, mês e ano, utilizando o caractere '/' como separador. Isso cria um array com três elementos: [dia, mês, ano].
      const [day, month, year] = dateString.split('/');
      //  Cria um novo objeto que representa a tarefa editada. O campo date é convertido de volta para um objeto Date usando os componentes extraídos (dia, mês, ano) do passo anterior.
      sendEditTask({
        ...tempEditedTaskInfo,
        date: new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)),
      });
      onCloseEditModal();
    }
  };
  

  const handleCloseModal = () => {
    // Reverter as alterações se o modal for fechado sem salvar
    setTempEditedTaskInfo((prevTaskInfo) => ({ // Utiliza a função de atualização do estado funcional para reverter as alterações feitas no estado tempEditedTaskInfo se o modal for fechado sem salvar.
      ...prevTaskInfo, // Copia todas as propriedades existentes do estado anterior.
      name: editedTask?.name || '', // Restaura o valor original da descrição (name). Se editedTask for nulo ou indefinido, usa uma string vazia como valor padrão.
      date: editedTask?.date instanceof Date ? formatDate(editedTask.date) : '', //  Restaura o valor original da data (date). Se editedTask for nulo ou indefinido, ou se a data não for uma instância de Date, usa uma string vazia como valor padrão.
      priority: editedTask?.priority || 'Alta', // Restaura o valor original da prioridade (priority). Se editedTask for nulo ou indefinido, usa 'Alta' como valor padrão.
    }));
    onCloseEditModal();
  };

  return (
    <C.Container showEdit={showEdit}>
      <div className='modal-content'>
        <span className='closeModal' onClick={handleCloseModal}>&times;</span>
        <form className="taskForm">
          <label htmlFor="name">Descrição:</label>
          <input
            type="text"
            className={`tarefa ${descriptionError ? 'error' : ''}`}
            name="name"
            value={tempEditedTaskInfo.name}
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
            value={tempEditedTaskInfo.date}
            onChange={handleChange}
          />
          {dateError && <p className="error-message">{dateError}</p>}
          <label htmlFor="priority" className='prioridade'>Prioridade:</label>
          <select
            name="priority"
            value={tempEditedTaskInfo.priority}
            onChange={handleChange}
            required
          >
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          <button onClick={handleSendTask} type='button'>Atualizar Tarefa</button>
        </form>
      </div>
    </C.Container>
  );
};

