import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/login.module.css';
import CidadesPorEstado from '../Components/Utils/cidadesPorEstado.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import { dadosToken, verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';

import { useRouter } from 'next/router';

const EcommerceHomePage = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({});
    const [tokenData, setTokenData] = useState({}); // Inicializado como objeto vazio

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const token = await dadosToken();
                token.data_nascimento = token.data_nascimento.split('T')[0];

                if (!verificaTokenValido() || !token) {
                    router.push('/');
                    return;
                }

                const email = token.email;
                const response = await axios.get(`http://localhost:3010/usuario`);

                // Filtra os dados do usuário com base no email
                const user = response.data.usuarios.find(user => user.email === email);
                user.data_nascimento = user.data_nascimento.split('T')[0]
                user.senha = undefined
                setUserData(user);

                setTokenData(token);
            } catch (error) {
                console.error('Erro ao obter dados do token:', error);
            }
        };

        fetchTokenData();
    }, [isEditing]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        // Verifique se algum estado foi selecionado
        if (!userData.estado) {
            // Se nenhum estado foi selecionado, use o valor antigo para updateData
            await saveChanges(userData);
        } else {
            // Se um estado foi selecionado, use o userData atualizado
            await saveChanges({
                nome: userData.nome,
                senha: userData.senha,
                altura: userData.altura,
                peso: userData.peso,
                genero: userData.genero,
                telefone: userData.telefone,
                data_nascimento: userData.data_nascimento,
                estado: userData.estado,
                cidade: userData.cidade,
                descricao: userData.descricao,
            });
        }
    
        // Alternar o modo de edição após salvar as alterações
        toggleEditing();
    };

    const saveChanges = async (updatedData) => {
        if (isEditing) {
            try {
                console.log(updatedData)
                const email = tokenData.email;
                const response = await axios.put(`http://localhost:3010/usuario/${email}`, updatedData);

                // Lide com a resposta conforme necessário
                console.log('Resposta do servidor:', response.data);

                // Talvez você queira redirecionar o usuário ou mostrar uma mensagem de sucesso
            } catch (error) {
                console.error('Erro ao salvar alterações:', error);
                // Lide com o erro conforme necessário
            }
        }
    };


    const renderField = (label, value, type) => {
        return (
            <div className="flex flex-col">
                <label htmlFor={label} className="text-sm font-medium text-gray-700">
                    {label.charAt(0).toUpperCase() + label.slice(1)}:
                </label>
                {isEditing ? (
                    type === 'date' ? (
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date) => setUserData({ ...userData, [label]: date.toISOString() })}
                            maxDate={new Date()}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                                <div>
                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{'<'}</button>
                                    <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                                        { /* Adicione aqui o código para gerar as opções do ano, se necessário */}
                                    </select>
                                    <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
                                        { /* Adicione aqui o código para gerar as opções do mês, se necessário */}
                                    </select>
                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{'>'}</button>
                                </div>
                            )}
                        />
                    ) : type === 'estado' ? (
                        <CidadesPorEstado
                            selectedState={userData.estado}
                            selectedCity={userData.cidade}
                            onSelectState={(estado) => setUserData({ ...userData, estado, cidade: '' })}
                            onSelectCity={(cidade) => setUserData({ ...userData, cidade })}
                        />
                    ) : type === 'genero' ? (
                        <select
                            value={value}
                            onChange={(e) => setUserData({ ...userData, [label]: e.target.value })}
                            className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                        >
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                    ) : (
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => setUserData({ ...userData, [label]: e.target.value })}
                            className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                        />
                    )
                ) : (
                    <div className="mt-1 p-2 border w-full">{value}</div>
                )}
            </div>
        );
    };


    return (
        <div className="bg-[#D9D9D9] flex">
            {/* Barra lateral */}
            <div className={`bg-[#66DA6E] text-white w-64 ${isSidebarOpen ? '' : 'hidden'}`}>
                <div className=" flex justify-center mt-16 p-4">
                    <div className='flex flex-col '>
                        <div className='flex mb-10 flex-col '>
                            <div>
                            </div>
                            <div>
                                <a href="TelaGymBro" className="text-white font-semibold text-2xl hover:underline">
                                    GymBros
                                </a>
                            </div>
                            <div>
                                <a href="TelaPersonal" className="text-white mt-8 font-semibold text-2xl hover:underline">
                                    Personais
                                </a>
                            </div>
                            <div>
                                <a href="Match" className="text-white font-semibold text-2xl hover:underline">
                                    Matchs
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col' >
                            <div className='h-[0.125rem] mb-4 w-5/6 bg-white'></div>
                            <a href="PaginaTreino" className="text-white font-semibold text-2xl hover:underline">
                                Treinos
                            </a>
                        </div>
                        <div>
                            <a href="EditarUsuario" className="text-white font-semibold text-2xl hover:underline">
                                Editar Perfil
                            </a>
                        </div>
                        <div>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
            {/* Conteúdo principal */}
            <div className="flex-1 flex  h-full justify-between flex-col">
                {/* Barra de navegação superior */}
                <header className="bg-[#7AE582] shadow-md">
                    <div className="flex items-center p-4 justify-between">
                        <div className='flex flex-row'>
                            <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none mr-4">
                                <FontAwesomeIcon size='2x' icon={faBars} color="white" />
                            </button>
                            <h1 className="text-3xl font-semibold">TreinoWiki</h1>
                        </div>
                        <div className="flex space-x-4 mt-2 mr-10">
                            <a href="/HomePage" className="text-white font-semibold text-2xl hover:underline">
                                GymBro
                            </a>
                            <a href="#" className="text-white hover:underline">
                                <FontAwesomeIcon size="2x" icon={faBell} />
                            </a>
                        </div>
                    </div>
                </header>
                {/* Conteúdo principal */}
                <main className="flex-1 flex justify-center items-center">
                    <form className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-center w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold">Editar Perfil</h2>
                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                className="text-blue-600 hover:underline flex items-center"
                            >
                                <FontAwesomeIcon icon={isEditing ? faSave : faEdit} className="mr-2" />
                                {isEditing ? 'Salvar' : 'Editar'}
                            </button>

                        </div>

                        <div className='flex flex-col'>
                            {renderField('nome', userData.nome, 'text')}
                            {renderField('senha', userData.senha, 'text')}
                            {renderField('altura', userData.altura, 'text')}
                            {renderField('peso', userData.peso, 'text')}
                            {renderField('genero', userData.genero, 'text')}
                            {renderField('telefone', userData.telefone, 'text')}
                            {renderField('data_nascimento', userData.data_nascimento, 'date')}
                            {renderField('estado', userData.estado, 'estado')}
                            {renderField('descricao', userData.descricao, 'text')}
                        </div>
                    </form>
                </main>
                {/* Rodapé */}
                <footer className="bg-[#7AE582] p-4 shadow-md text-center">
                    <p>&copy; 2023 TraineWiki. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>

    );
};

export default EcommerceHomePage;
