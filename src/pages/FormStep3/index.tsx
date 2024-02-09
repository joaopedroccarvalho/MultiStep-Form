import { useNavigate } from 'react-router-dom';
import { Theme } from '../../components/Theme';
import * as C from './styles';
import { FormActions, useForm } from '../../contexts/FormContext';
import { ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FormStep3 = () => {

    const navigate = useNavigate();
    const {state, dispatch} = useForm();

    useEffect(()=> {
        if(state.name === '') {
            navigate('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 3
            })
        }
    }, []);

    // const handleNextStep = () => {
    //     if(state.email !== '' && state.github !== '') {
    //         console.log(state);
    //     } else {
    //         alert('Preencha os dados')
    //     }
    // }
    const handleNextStep = () => {
        if(state.name !== '' && state.email !== '' && state.github !== '') {
            navigate('/stepFinal');
            console.log(state);
        } else {
            alert('Preencha os dados.');
        }
    }
    
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setEmail,
            payload: e.target.value
        });
    }
    const handleGitHubChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setGitHub,
            payload: e.target.value
        });
    }


    return (
       <Theme>
            <C.Container>
                <p>Passo 3/3</p>
                <h1>Legal, {state.name}! Onde te achamos?</h1>
                <p>Preencha com seus endereços para conseguirmos entrar em contato.</p>

                <hr/>

                <label>
                    Qual seu e-mail?
                    <input 
                        type="text" 
                        value={state.email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label>
                    Qual seu GitHub?
                    <input 
                        type="url" 
                        value={state.github}
                        onChange={handleGitHubChange}
                    />
                </label>

                <Link to="/step2" className='backButton'>Voltar</Link>
                <button onClick={handleNextStep}>Finalizar Cadastro</button>
            </C.Container>
       </Theme>
    );
}