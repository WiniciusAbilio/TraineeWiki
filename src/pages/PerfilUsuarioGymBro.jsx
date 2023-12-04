import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faBell, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import ramonDino from '../../public/Pictures/Perfils/RamonDino1.jpg'
import { useRouter } from 'next/router';
import { verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';

const PerfilUsuarioGymBro = () => {


  const router = useRouter();

  useEffect(() => {
      if (!verificaTokenValido()) {
          router.push('/');
          return;
      }
  }, []);

    const handleContextMenu = (event) => {
        event.preventDefault();
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.display = 'block';
    };

    const handleAddToWorkout = () => {
        // Implement your logic for adding to workout here
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'none';
    };

    const handleCancel = () => {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'none';
    };


    const [imageFiles, setImageFiles] = useState([]);

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
        <header className="bg-[#004E64] text-white shadow-md">
          <div className="flex items-center p-4 justify-between">
            <div className='flex flex-row'>
                <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none mr-4">
                    <FontAwesomeIcon size='2x' icon={faBars} color="white"/>
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
            <div className='flex flex-row flex-wrap h-full w-11/12 m-5 justify-center'>
                <div className='flex flex-row h-full w-full'>
                    <div className='w-2/5 h-full '>
                        <Image src={ramonDino} className="h-full" alt="Ramon Dino" />
                    </div>
                    <div className='flex flex-col w-full h-full items-center'>
                      <div className='flex flex-col justify-center m-3 text-2xl w-[75%]'>
                        <h2 className='font-semibold'>Nome:</h2>
                        <div className='flex rounded-full text-white justify-center items-center bg-[#004E64] p-3' >
                          {/* camado do código para pegar o nome do usuario no banco e colocar aqui  */}
                          João Victor Bonilha Venturini
                        </div>
                      </div>
                      <div className='flex flex-row  w-full h-full justify-center '>
                        <div className='flex flex-col w-full '>
                          <div className='flex flex-col justify-center items-center p-2 text-2xl' >
                            <h2 className='font-semibold'>Genero:</h2>
                            <div className='flex flex-col rounded-full text-white justify-center  items-center w-3/6 bg-[#004E64] p-3' >
                              {/* camado do código para pegar o genero do usuario no banco e colocar aqui  */}
                              Masculino
                            </div>
                          </div>
                          <div className='flex flex-col justify-center items-center p-2 text-2xl'>
                            <h2 className='font-semibold'>Treina A:</h2>
                            <div className='flex rounded-full text-white justify-center items-center w-3/6 bg-[#004E64] p-3' >
                              {/* camado do código para pegar o genero do usuario no banco e colocar aqui  */}
                              1 ano e dois meses
                            </div>
                          </div>
                          <div className='flex flex-col justify-center items-center p-2 text-2xl'>
                            <h2 className='font-semibold'>Local de treino:</h2>
                            <div className='flex rounded-full text-white justify-center items-center w-3/6 bg-[#004E64] p-3' >
                              {/* camado do código para pegar o Local de treino: do usuario no banco e colocar aqui  */}
                              Clinisport
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col w-full'>
                          <div className='flex flex-col justify-center p-2 text-2xl items-center w-full' >
                            <h2 className='font-semibold'>Idade:</h2>
                            <div className='flex flex-col rounded-full text-white justify-center  items-center w-3/6 bg-[#004E64] p-3' >
                              {/* camado do código para pegar o idade do usuario no banco e colocar aqui  */}
                              20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className='flex flex-col h-full w-full mt-24 mb-24 items-center'>
                  <div className='flex flex-col justify-center m-3 text-xl justify-center w-[90%] h-full'>
                          <h2 className='font-semibold'>Descrição:</h2>
                          <div className='flex rounded-3xl h- w-full mt-5 text-white justify-center items-center bg-[#004E64] p-3' >
                            {/* camado do código para pegar o nome do usuario no banco e colocar aqui  */}
                            <div className='flex pt-20 pb-20 w-full items-center'>
                              <p>
                                Olá! Sou um entusiasta de fitness em busca de uma companheira para compartilhar a 
                                jornada de atividades físicas e saúde. Tenho um compromisso sério com meu bem-estar e 
                                estou à procura de alguém que compartilhe a mesma paixão por treinos desafiadores.
                              </p>
                            </div>
                          </div>
                  </div>
                </div>
                <div className='flex flex-row h-64 w-full'>
                    <div className='flex flex-col h-full w-[60%] justify-between items-start '>
                      <div className='flex flex-col w-full '>
                            <h2 className='text-2xl font-semibold'>Meios de Comunicação</h2>
                            <div className='flex flex-row w-full  p-2 text-2xl'>
                              <FontAwesomeIcon size='2xl' icon={faInstagram} />
                              <div className='flex rounded-full text-white justify-center items-center w-3/6 bg-[#004E64] p-3 ml-5' >
                                {/* camado do código para pegar o instagram do usuario no banco e colocar aqui  */}
                                @bonilha_0
                              </div>
                            </div>
                            <div className='flex flex-row w-full p-2 text-2xl'>
                              <FontAwesomeIcon size='2xl' icon={faEnvelope} />
                              <div className='flex rounded-full text-white justify-center items-center w-3/6 bg-[#004E64] p-3 ml-5' >
                                {/* camado do código para pegar o email do usuario no banco e colocar aqui  */}
                                jventurini@alunos.utfpr.edu.br
                              </div>
                            </div>
                      </div>
                    </div>
                    <div className='flex flex-col h-64 w-[40%]'>
                      <div className='flex flex-col justify-center h-full w-full items-center w-[40%] '>
                        <button className='flex flex-col h-24 w-56 bg-[#66DA6E] rounded-xl text-white justify-center items-center shadow-black shadow-md transition-transform transform  active:shadow-none active:scale-95' >
                          <FontAwesomeIcon size='2x' icon={faUserGroup} />
                        </button>
                      </div>
                    </div>
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

export default PerfilUsuarioGymBro;
