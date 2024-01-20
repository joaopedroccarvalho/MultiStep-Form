export type Item = {
    id: number;
    name: string;
    done: boolean;
    date: Date | string; 
    priority: 'Alta' | 'Média' | 'Baixa'; // Adição de tipos restritos
};