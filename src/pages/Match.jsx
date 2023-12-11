import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faBell} from '@fortawesome/free-solid-svg-icons';
import { verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';
import axios from 'axios';

const EcommerceHomePage = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!verificaTokenValido()) {
      router.push('/');
    } else {
      const fetchData = async () => {
        try {

        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

      fetchData();
    }
  }, [router]);



  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
        <header className="bg-[#004E64] shadow-md">
          <div className="flex items-center p-4 text-white justify-between">
            <div className='flex flex-row'>
              <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none mr-4">
                <FontAwesomeIcon size='2x' icon={faBars} />
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
          {/* Adicione o título aqui */}
          <div className='bg-[#004E64] flex flex-col w-full justify-center h-16 items-center'>
            <h2 className="text-white text-2xl font-semibold">Matchs</h2>
          </div>
          <div className='bg-[#004E64] flex flex-col w-full justify-center h-48 items-center pl-4'>
            <div className='flex flex-row'>
              <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 w-72 text-black rounded-l-2xl focus:outline-none"
              />
              <div className='py-2 bg-white rounded-r-2xl'>
                <FontAwesomeIcon icon={faSearch} color="#AAA1A1" className="mr-2" />
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex flex-wrap h-full justify-center">
        
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
