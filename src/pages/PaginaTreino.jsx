import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { dadosToken, verificaTokenValido } from '../Components/Utils/autenticador';
import axios from 'axios'
import Logout from '../Components/Utils/logout';

const PaginaTreino = () => {


    const router = useRouter();

    useEffect(() => {
        if (!verificaTokenValido()) {
            router.push('/');
            return;
        }
    }, []);


    const [imageFiles, setImageFiles] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [repeticao, setRepeticao] = useState('');
    const [series, setSeries] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.display = 'block';
    };

    const handleAddToWorkout = (file) => {
        const dados = dadosToken();

        const treinoInfo = {
            nome_exercicio: file.replace(".png", "").replace(".jpg", ""),
            repeticoes: repeticao,
            series: series,
            Usuario_email: dados.email
        };


        (async () => {
            try {
                const response = await axios.post('http://localhost:3010/treino', treinoInfo);
                console.log(response.data); // Exibe a resposta no console (pode remover isso na versão final)
            } catch (error) {
                console.error('Erro ao enviar treino:', error);
            }
        })();


        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'none';
    };

    useEffect(() => {
        const fetchImageList = async () => {
            try {
                const response = await fetch('/api/listFiles');
                const data = await response.json();
                setImageFiles(data.files);
            } catch (error) {
                console.error('Error fetching image list:', error);
            }
        };
        fetchImageList();
    }, []);

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
                                <a href="#" className="text-white mt-8 font-semibold text-2xl hover:underline">
                                    Personais
                                </a>
                            </div>
                            <div>
                                <a href="#" className="text-white font-semibold text-2xl hover:underline">
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
                <main className="flex flex-wrap h-full  justify-center">
                    <div className='flex flex-wrap w-3/4 justify-center'>
                        {/* Cards */}
                        <div className='flex flex-wrap w-full h-full justify-center'>
                            <div id="contextMenu" className="context-menu" style={{ display: 'none' }}>
                            </div>
                            {imageFiles.map((file, index) => (
                                <div className="flex flex-row m-4 w-8/12 justify-between p-4 bg-white rounded-md shadow-md" onContextMenu={handleContextMenu}>
                                    <div>
                                        <h2 className="text-lg text-black font-semibold mt-2">{file.replace(".png", "").replace(".jpg", "")}</h2>
                                        <img key={index} className="w-full h-32 object-cover object-center rounded-md" src={`/..Pictures//${file}`} alt="Product" />
                                    </div>
                                    <div className='flex flex-row justify-center text-black items-center w-4/6 h-full '>
                                        <div className='flex flex-row justify-center items-center'>
                                            <div className='flex flex-col m-5'>
                                                <span className='text-xl mb-2 text-black font-bold'>repetição</span>
                                                <input
                                                    className='w-20 border-2 border-[#2BB4DF] text-black rounded-md'
                                                    type="number"
                                                    name="repeticao"
                                                    id="repeticao"
                                                    onChange={(e) => setRepeticao(e.target.value)}
                                                />
                                            </div>
                                            <div>

                                            </div>
                                            <div className='flex flex-col m-5'>
                                                <span className='text-xl mb-2 text-black font-bold'>séries</span>
                                                <input
                                                    className='w-20 border-2 border-[#2BB4DF] text-black rounded-md'
                                                    type="number"
                                                    name="series"
                                                    id="series"
                                                    onChange={(e) => setSeries(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="ml-4 bg-[#2BB4DF] text-white px-4 py-2 rounded-md" onClick={() => handleAddToWorkout(file)}>
                                        Adicionar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                {/* Rodapé */}
                <footer className="bg-[#7AE582] p-4 shadow-md text-center">
                    <p>&copy; 2023 TraineWiki. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default PaginaTreino;
