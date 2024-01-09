import { useForm } from "react-hook-form";
import { useAuth } from '../../contexts/AuthContext';
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

interface RegisterData {
    cpf: string;
    password: string;
    name: string;
    shelter_name: string;
    birth_date: string;
    email: string;
    phone_number: string;
}

export const RegisterPage = () => { 
    
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterData>();
    const { registerUser, message } = useAuth();
    const [isShelter, setShelter] = useState(false);

    const handleShelter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShelter(e.target.checked);
    };

    const receiveSubmit = (data: RegisterData) => {
        registerUser(
            data.cpf, 
            data.password, 
            data.name, 
            data.birth_date, 
            data.email, 
            data.phone_number, 
            data.shelter_name
        );
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(receiveSubmit)}>
        <h1>Criar conta</h1>
        <div className={styles.checkboxContainer}>
            <label>
                <input
                    type="checkbox"
                    checked={isShelter}
                    onChange={handleShelter}
                />
                Você é um abrigo?
            </label>
        </div>
        <input className={styles.textbox} type="text" {...register("cpf", { required: true })} placeholder="CPF" />
        <input className={styles.textbox} type="password" {...register("password", { required: true })} placeholder="Senha" />
        <input className={styles.textbox} type="text" {...register("name", { required: true })} placeholder="Nome" />
        <input className={styles.textbox} type="text" {...register("birth_date", { required: true })} placeholder="Data de nascimento" />
        <input className={styles.textbox} type="text" {...register("email", { required: true })} placeholder="E-mail" />
        <input className={styles.textbox} type="text" {...register("phone_number", { required: true })} placeholder="Número de telefone" />
        {isShelter && (
            <input className={styles.textbox} type="text" {...register("shelter_name", { required: true })} placeholder="Nome do Abrigo" />
        )}
        <div className={styles.divider}>
            <button className={styles.button_login} type="button" onClick={() => navigate("/login")}>Voltar</button>
            <button className={styles.button_login} type="submit">Registrar</button>
        </div>
        <span className={styles.message}>{message}</span>
      </form>
      );
}