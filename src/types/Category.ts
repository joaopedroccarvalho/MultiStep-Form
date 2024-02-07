export type Category = {
    // deixando o nome dinâmico no type usando 'tag: string' para que seja aceito qualquer nome em 'Category.ts' com a estrutura abaixo. Agora irá ser aceito qualquer nome que seja uma string ex: food, rent, etc e que tenha os objetos title, color e expense.
    [tag: string]: { 
        title: string;
        color: string;
        expense: boolean;
    }
}