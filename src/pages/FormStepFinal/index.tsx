import { useNavigate } from 'react-router-dom';
import { Theme } from '../../components/Theme';
import * as C from './styles';
import { FormActions, useForm } from '../../contexts/FormContext';
import { ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FormStepFinal = () => {

    const navigate = useNavigate();
    const {state, dispatch} = useForm();

    useEffect(()=> {
        if(state.name === '') {
            navigate('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 4
            })
        }
    }, []);

    const getLevelText = () => {
        return state.level === 0 ? 'sou amador' : 'sou profissional';
    }
   
    return (
       <Theme>
            <C.Container>
                <h1 className='Congrats'> Parabéns {state.name}, seu formulário foi preenchido com sucesso!</h1>

                <C.InfoArea>
                    <C.Info>{state.name}</C.Info>
                    <C.Info>{getLevelText()}</C.Info>
                    <C.Info>{state.email}</C.Info>
                    <C.Info>{state.github}</C.Info>
                </C.InfoArea>
            

                <Link to="/step3" className='backButton'>Voltar</Link>
               
            </C.Container>
       </Theme>
    );
}