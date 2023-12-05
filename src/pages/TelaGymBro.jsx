import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Importe o Link do next
import { verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';

const EcommerceHomePage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/usuario');
        setUserData(response.data.usuarios[0]);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    if (verificaTokenValido()) {
      fetchUserData();
    } else {
      router.push('/');
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
            {/* ... (conteúdo da barra lateral anterior) */}
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
          <div className='bg-[#004E64] flex flex-col w-full justify-center h-64 items-center pl-4'>
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
        <main className="flex flex-wrap h-full  justify-center">
          <div className='flex flex-wrap w-3/4 justify-center'>
            {/* Card do Usuário */}
            <div className="flex flex-col justify-center m-4 w-64 p-4 bg-white rounded-md shadow-md">
              <h2 className="text-lg text-black font-semibold mt-2">{userData.nome}</h2>
              <p>Peso: {userData.peso} kg</p>
              <p>Altura: {userData.altura} cm</p>
              <p>Cidade: {userData.cidade}</p>
              <p>Estado: {userData.estado}</p>
              <Link href={`/Perfil?email=${userData.email}`} passHref>
                <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-700">
                  Ver Perfil
                </button>
              </Link>
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

export default EcommerceHomePage;
