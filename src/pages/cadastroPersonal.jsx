import React from 'react';
import Link from 'next/link';
import styles from '@/styles/login.module.css';
import CidadesPorEstado from '../Components/Utils/cidadesPorEstado.jsx';


function CadastroPagePersonal() {

  return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="cadastro-container bg-white text-black p-6 rounded-lg shadow-md  flex flex-col justify-center w-full items-center md:w-4/5 md:h-5/6 lg:w-3/5 xl:w-2/5">
                <h2 className="text-center text-2xl font-semibold mb-4">Cadastro</h2>
                <div className='flex flex-col justify-center items-center'>
                    <form action="http://localhost:3010/usuario" method="post">
                        <div className={`flex flex-col`}>
                            <div className='flex flex-row'>
                                <div className='w-[50%]'>
                                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome Completo:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        required
                                        className={`mt-1 p-2 border w-full ${styles.inputborder} focus:outline-none focus:ring focus:border-blue-300`}
                                    />

                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className={`mt-1 p-2 border w-full ${styles.inputborder} focus:outline-none focus:ring focus:border-blue-300`}
                                    />

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

                                    <label htmlFor="data_nascimento" className="text-sm font-medium text-gray-700">Data de Nascimento:</label>
                                    <input
                                        type="date"
                                        id="data_nascimento"
                                        name="data_nascimento"
                                        required
                                        className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                    <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF:</label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        name="cpf"
                                        required
                                        className={`mt-1 p-2 border w-full ${styles.inputborder} focus:outline-none focus:ring focus:border-blue-300`}
                                    /> 
                                </div>
                                <div className='ml-5 w-[50%]'>
                                    <CidadesPorEstado />
                                    <label htmlFor="genero" className="text-sm font-medium text-gray-700">Gênero:</label>
                                    <select
                                        id="genero"
                                        name="genero"
                                        required
                                        className={`mt-1  p-[0.580rem] border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                    >
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                    <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição:</label>
                                    <textarea
                                        id="descricao"
                                        name="descricao"
                                        rows="4"
                                        required
                                        className={`mt-1 p-1.5 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                    ></textarea>
                                    <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone:</label>
                                    <input
                                        type="tel"
                                        id="telefone"
                                        name="telefone"
                                        required
                                        className={`mt-1 p-2 border ${styles.inputborder} w-full focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-end h-24'>
                            <button type="submit" className="bg-stone-800 h-12 w-full md:w-40 text-white mt-4 py-2 px-4 rounded-md hover:bg-[#74E582]">Registrar</button>
                            </div>
                        </div>
                    </form>
                    <div className='mt-4 text-center text-black'>Já tem uma conta?</div>
                        <div className='text-center text-lg font-bold'>
                        <Link className='text-[#74E582] hover:underline' href='/'>Faça Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroPagePersonal;