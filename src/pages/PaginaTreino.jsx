import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { dadosToken, verificaTokenValido } from '../Components/Utils/autenticador';
import axios from 'axios'
import Logout from '../Components/Utils/logout';

const PaginaTreino = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar a lista de exercícios



    useEffect(() => {
        // Função para fazer a requisição GET
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/exercicio'); // Substitua com a sua rota real
                console.log(response)
                setExercicios(response.data.data); // Assumindo que a resposta contém um campo "data" com os exercícios
            } catch (error) {
                console.error('Erro ao obter exercícios:', error);
            }
        };

        // Chama a função para buscar os exercícios ao montar o componente
        fetchData();
    }, []); // O array vazio assegura que a requisição é feita apenas uma vez ao montar o componente

    useEffect(() => {
        if (!verificaTokenValido()) {
            router.push('/');
            return;
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const [grupoTreino, setGrupoTreino] = useState({
        nome: '',
        exercicios: [{ id: '', exercicio: '', repeticoes: '', series: '' }],
    });


    const addExercicio = () => {
        setGrupoTreino({
            ...grupoTreino,
            exercicios: [...grupoTreino.exercicios, { exercicio: '', repeticoes: '', series: '' }],
        });
    };

    const removeExercicio = (index) => {
        const updatedExercicios = [...grupoTreino.exercicios];
        updatedExercicios.splice(index, 1);
        setGrupoTreino({ ...grupoTreino, exercicios: updatedExercicios });
    };

    const handleExercicioChange = (index, key, value) => {
        const updatedExercicios = [...grupoTreino.exercicios];
        updatedExercicios[index][key] = value;
        setGrupoTreino({ ...grupoTreino, exercicios: updatedExercicios });
    };

    const coletarDados = async () => {
        const email_usuario = dadosToken().email;
        // Filtrar exercícios sem valores preenchidos
        const exerciciosPreenchidos = grupoTreino.exercicios.filter(exercicio => (
            exercicio.exercicio !== '' && exercicio.repeticoes !== '' && exercicio.series !== ''
        ));

        // Montar o objeto com os dados coletados
        const dadosColetados = {
            email_usuario: email_usuario,
            grupo_treino_nome_grupo_treino: grupoTreino.nome,
            exercicios: exerciciosPreenchidos.map(exercicio => ({
                exercicio_CodigoExercicio: exercicio.exercicio,
                repeticoes: exercicio.repeticoes,
                series: exercicio.series
            }))
        }

        // Converter para JSON
        const dadosJSON = JSON.stringify(dadosColetados);

        console.log(dadosJSON)

        // Utilize os dadosJSON conforme necessário (por exemplo, enviando para algum lugar)


        try {
            const response = await axios.post(`http://localhost:3010/grupo_treino/${email_usuario}`, {
                nome_grupo_treino: grupoTreino.nome
            });

            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao enviar a solicitação POST:', error);
        }


        try {
            const response = await axios.post(`http://localhost:3010/grupo_treino_exercicio`, dadosColetados);

            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao enviar a solicitação POST:', error);
        }


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
                <main className="flex flex-wrap h-full justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                        <div className="bg-white border-t-4 border-green-500 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Criar Grupo de Treino</h2>
                            <form className="flex flex-col">
                                <label className="mb-2">Nome do Grupo de Treino:</label>
                                <input
                                    type="text"
                                    className="p-2 mb-4 border rounded"
                                    placeholder="Informe o nome do grupo de treino"
                                    value={grupoTreino.nome}
                                    onChange={(e) => setGrupoTreino({ ...grupoTreino, nome: e.target.value })}
                                />

                                {grupoTreino.exercicios.map((exercicio, index) => (
                                    <div key={index} className="flex mb-4">
                                        <div className="flex-1 mr-2">
                                            <label className="mb-2">Escolha um exercício:</label>
                                            <select
                                                className="p-2 border rounded w-full"
                                                value={exercicio.exercicio}
                                                onChange={(e) => handleExercicioChange(index, 'exercicio', e.target.value)}
                                            >
                                                <option value="">Selecione um exercício</option>
                                                {exercicios.map((ex) => (
                                                    <option key={ex.Codigo_Exercicio} value={ex.Codigo_Exercicio}>
                                                        {ex.nome_exercicio}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex-1 ml-2">
                                            <label className="mb-2">Repetições:</label>
                                            <input
                                                type="number"
                                                className="p-2 border rounded w-full"
                                                placeholder="Informe as repetições"
                                                value={exercicio.repeticoes}
                                                onChange={(e) => handleExercicioChange(index, 'repeticoes', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 ml-2">
                                            <label className="mb-2">Séries:</label>
                                            <input
                                                type="number"
                                                className="p-2 border rounded w-full"
                                                placeholder="Informe as séries"
                                                value={exercicio.series}
                                                onChange={(e) => handleExercicioChange(index, 'series', e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white rounded p-2 hover:bg-red-600 cursor-pointer ml-2"
                                            onClick={() => removeExercicio(index)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="bg-green-500 text-white rounded p-2 hover:bg-green-600 cursor-pointer"
                                    onClick={addExercicio}
                                >
                                    Adicionar Exercício
                                </button>
                                <button
                                    type="button"
                                    className="bg-green-500 text-white rounded p-2 hover:bg-green-600 cursor-pointer mt-4"
                                    onClick={coletarDados}
                                >
                                    Criar Grupo de Treino
                                </button>
                            </form>
                        </div>
                    </div>
                </main>

                {/* Rodapé */}
                <footer className="bg-[#7AE582] p-4 shadow-md text-center">
                    <p>&copy; 2023 TraineWiki. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div >
    );
};

export default PaginaTreino;
