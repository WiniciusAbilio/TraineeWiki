import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/login.module.css';

function ChooseRegisterPage() {
  const [selectedOption, setSelectedOption] = useState('usuario');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getLink = () => {
    if (selectedOption === 'usuario') {
      return '/cadastroUsuario';
    } else if (selectedOption === 'personal') {
      return '/cadastroPersonal';
    }
    return '/';
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className={`${styles.containerLogin} bg-white text-black p-6 rounded-lg shadow-md flex flex-col justify-center w-full  items-center md:w-4/5 md:h-[70%] lg:w-3/5 xl:w-2/5 h-[80%]`}>
            <div className='w-[60%]'>
                <h2 className="text-center text-black text-3xl font-semibold mb-4">Crie uma conta</h2>
                <div className="bg-[#74E582] h-1 w-full rounded-md"></div>
            </div>
            <div className='text-black text-lg font-semibold'>Seja bem vindo ao TreinoWiki! Diga-nos o que você está procurando</div>
            <div className='flex flex-col justify-center items-center mt-11'>
                <div className='h-[70%] md:h-[70%] flex flex-col justify-center items-center'>
                    <form>
                        <div className='flex flex-col w-full'>
                            <div className='mb-4'>
                                <div className=' font-semibold'>Quero ser Personal Trainer</div>
                                <input
                                    type="radio"
                                    id="personal"
                                    name="registerType"
                                    value="personal"
                                    checked={selectedOption === 'personal'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="personal" className="text-base font-semibold text-black ml-2">Publique seus serviços e encontre alunos</label>
                            </div>
                            <div className='mb-4'>
                                <div className=' font-semibold'>Quero Treinar</div>
                                <input
                                    type="radio"
                                    id="usuario"
                                    name="registerType"
                                    value="usuario"
                                    checked={selectedOption === 'usuario'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="usuario" className="text-base font-semibold text-black ml-2">Crie treinos e conheça parceiros de treino</label>
                                </div>
                            <div className='flex justify-center items-end h-28'>
                                <Link className="flex justify-center items-center" href={getLink()}>
                                    <div className="flex justify-center items-center bg-stone-800 h-12 w-full md:w-40 text-white mt-4 py-2 px-4 rounded-md hover:bg-[#74E582]">Continuar</div>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ChooseRegisterPage;
