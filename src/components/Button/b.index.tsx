import * as C from './b.styles'

type Props = {
    onClick: () => void;
}

export const Button = ({onClick}: Props) => {
    return (
        <C.Button onClick={onClick}>
            Adicionar
        </C.Button>
    )
}