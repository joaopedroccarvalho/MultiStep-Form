import { useEffect, useState } from 'react';
import * as C from './App.styles';
import { items } from './data/items';
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { Item } from './types/Item';
import { TableArea } from './components/TableArea/t.index';
import { InfoArea } from './components/InfoArea/i.index';
import { categories } from './data/categories';
import { InputArea } from './components/InputArea/ia.index';


const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // Este hook useEffect é utilizado para realizar operações secundárias após as atualizações do componente. Neste caso, ele atualiza a lista filtrada (filteredList) toda vez que a lista de itens (list) ou o mês atual (currentMonth) mudam.
  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]); // quando adicionar novo item ou mudei o mês no filtro, list ou currentMonth precisarão mudar. Por isso eles estão sendo monitorados no useEffect.

  //  Este outro hook useEffect é utilizado para calcular a renda e as despesas com base na lista filtrada (filteredList). Ele atualiza os estados de income e expense sempre que a lista filtrada muda.
  useEffect(()=>{
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList) {
      if(categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }
    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  // Essas são funções de manipulação de eventos que lidam com a mudança de mês (handleMonthChange) e a adição de novos itens (handleAddItem).
  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
   <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {/* Área de informações*/}
        <InfoArea 
          currentMonth={currentMonth} 
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        {/* Área de inserção*/}
        <InputArea 
          onAdd={handleAddItem}
        />


        {/* Tabela de itens*/}
        <TableArea list={filteredList} />
      </C.Body>
   </C.Container>
  );
};

export default App;

