import { useEffect, useState } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { ListItem } from './components/listItem/l.index';
import { Modal } from './components/Modal/m.index';
import { Button } from './components/Button/b.index';
import { EditModal } from './components/Edit/e.index';

const App = () => {
  // Aqui são declarados diversos estados utilizando o hook useState. O estado list representa a lista de tarefas, inicializado como um array vazio. Outros estados controlam a visibilidade de modais (modalVisible e editModalVisible) e armazenam a tarefa que está sendo editada (editedTask).
  const [list, setList] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState<Item | null>(null);

  // A função handleTaskChange é responsável por atualizar o estado list quando o status de uma tarefa é alterado. Ela utiliza o método map para percorrer a lista e atualiza a propriedade done da tarefa com o id correspondente.
  const handleTaskChange = (id: number, done: boolean) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done } : item
      )
    );
  };

  // Essas funções (handleOpenTask e handleCloseModal) controlam a abertura e o fechamento do modal de criação de tarefas, alterando o estado modalVisible.
  const handleOpenTask = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // A função handleSendTask é chamada quando uma nova tarefa é criada. Ela adiciona a tarefa ao estado list e armazena a lista atualizada no localStorage. Além disso, fecha o modal de criação.
  const handleSendTask = (task: Item) => {
    // Adiciona a nova tarefa ao estado e ao localStorage
    setList((prevList) => {
      const newList = [...prevList, { ...task, id: prevList.length + 1 }];
      localStorage.setItem('taskList', JSON.stringify(newList));
      return newList;
    });
    setModalVisible(false);
  };

  // A função handleDelete remove uma tarefa específica do estado list e atualiza o localStorage removendo a tarefa correspondente.
  const handleDelete = (id: number) => {
    // Remove a tarefa do estado e do localStorage
    setList((prevList) => {
      const newList = prevList.filter((item) => item.id !== id);
      localStorage.setItem('taskList', JSON.stringify(newList));
      return newList;
    });
  };

  // Essas funções estão relacionadas à edição de tarefas. handleEditTask configura o estado editedTask para a tarefa que está sendo editada e abre o modal de edição. handleSendEditTask é chamada ao enviar uma tarefa editada, atualizando a tarefa no estado list e no localStorage.
  const handleEditTask = (item: Item) => {
    setEditedTask(item);
    setEditModalVisible(true);
  };

  const handleSendEditTask = (updatedTask: Item) => {
    // Atualiza a tarefa no estado e no localStorage
    const editedList = list.map((item) =>
      item.id === updatedTask.id ? { ...item, ...updatedTask, date: updatedTask.date } : item
    );
    setList(editedList);
    setEditModalVisible(false);
    localStorage.setItem('taskList', JSON.stringify(editedList));
  };

  // Este trecho utiliza o hook useEffect para carregar os dados do localStorage ao montar o componente. Ele verifica se há tarefas armazenadas no localStorage e, se houver, atualiza o estado list.
  useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');
    const initialList = storedTasks ? JSON.parse(storedTasks) : [];
    setList(initialList);
  }, []); // O segundo argumento [] garante que o efeito seja executado apenas uma vez ao montar o componente

  return (
    <C.Container>
      <C.Area>
        <C.Header>Lista de Tarefas</C.Header>
        <Button onClick={handleOpenTask} />
        <Modal
          show={modalVisible}
          onClose={handleCloseModal}
          sendTask={handleSendTask}
        />
        <EditModal
          showEdit={editModalVisible}
          onCloseEditModal={() => setEditModalVisible(false)}
          sendEditTask={(updatedTask) => handleSendEditTask(updatedTask)}
          editedTask={editedTask}
        />
        {list.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onChange={handleTaskChange}
            onDelete={() => handleDelete(item.id)}
            onEdit={handleEditTask}
          />
        ))}
      </C.Area>
    </C.Container>
  );
};

export default App;
