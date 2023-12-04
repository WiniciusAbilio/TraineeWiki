import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from '@/styles/login.module.css';
import CidadesPorEstado from '../Components/Utils/cidadesPorEstado.jsx';

import { verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';

import { useRouter } from 'next/router';

const EcommerceHomePage = () => {


    const router = useRouter();

    useEffect(() => {
        if (!verificaTokenValido()) {
            router.push('/');
            return;
        }
    }, []);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                           <Logout/>
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
                <main className="flex flex-wrap h-full  justify-center">
                    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                        <div className="cadastro-container bg-white text-black p-6 rounded-lg shadow-md flex flex-col justify-center w-full items-center md:w-4/5 lg:w-3/5 xl:w-2/5">
                            <h2 className="text-center text-2xl font-semibold mb-4">Editar Perfil</h2>
                            <div className='flex flex-col justify-center items-center'>
                                <form action="http://localhost:3010/editarUsuario" method="post">
                                    <div className={`flex flex-col`}>
                                        <div className='flex flex-row'>
                                            <div className='w-[50%]'>

                                                <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha:</label>
                                                <input
                                                    type="password"
                                                    id="senha"
                                                    name="senha"
                                                    required
                                                    className={`mt-1 p-2 ${styles.inputborder} border w-full focus:outline-none focus:ring focus:border-blue-300`}
                                                />

                                                <label htmlFor="altura" className="text-sm font-medium text-gray-700">Altura (em cm):</label>
                                                <input
                                                    type="number"
                                                    id="altura"
                                                    name="altura"
                                                    required
                                                    className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                                />

                                                <label htmlFor="peso" className="text-sm font-medium text-gray-700">Peso (em kg):</label>
                                                <input
                                                    type="number"
                                                    id="peso"
                                                    name="peso"
                                                    required
                                                    className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                                />

                                                <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone:</label>
                                                <input
                                                    type="tel"
                                                    id="telefone"
                                                    name="telefone"
                                                    required
                                                    className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                                />
                                            </div>
                                            <div className='ml-5 w-[50%]'>
                                                <CidadesPorEstado />
                                                <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição:</label>
                                                <textarea
                                                    id="descricao"
                                                    name="descricao"
                                                    rows="4"
                                                    required
                                                    className={`mt-1 p-1.5 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-end h-24'>
                                            <button type="submit" className="bg-stone-800 h-12 w-full md:w-40 text-white mt-4 py-2 px-4 rounded-md hover:bg-[#74E582]">Editar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EcommerceHomePage;
