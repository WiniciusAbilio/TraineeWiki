import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { dadosToken, verificaTokenValido } from '../Components/Utils/autenticador';
import Logout from '../Components/Utils/logout';
import axios from 'axios';


const Perfil = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fazendo uma solicitação GET para a rota 'usuario' no localhost:3010
        const response = await fetch('http://localhost:3010/usuario');

        if (response.ok) {
          // Se a resposta estiver OK, convertemos os dados para JSON
          const data = await response.json();

          const email = getEmailFromUrl();
          if (data && data.usuarios && typeof data.usuarios === 'object') {
            // Verificar se 'data.usuarios' é um objeto antes de acessar a propriedade
            const user = data.usuarios.find(user => user.email === email);

            if (user) {
              setUserData(user);
            } else {
              console.error('Usuário não encontrado com o e-mail fornecido.');
            }
          } else {
            console.error('Os dados recebidos não contêm uma propriedade "usuarios" válida.');
          }
        } else {
          console.error('Erro ao obter dados do usuário:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
      }
    };

    fetchData();
  }, [router.asPath]);

  // Função para obter o e-mail da URL
  const getEmailFromUrl = () => {
    const params = new URLSearchParams(router.asPath.split('?')[1]);
    return params.get('email');
  };

  // Estado para armazenar o e-mail da URL
  const [emailFromUrl, setEmailFromUrl] = useState(getEmailFromUrl());

  // Efeito para atualizar o e-mail da URL quando ela muda
  useEffect(() => {
    const handleRouteChange = () => {
      setEmailFromUrl(getEmailFromUrl());
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Efeito para verificar o token quando o componente é montado
  useEffect(() => {
    if (!verificaTokenValido()) {
      router.push('/');
    }
  }, []);


  const handleDarMatch = async () => {
    try {
      const email_usuario = dadosToken().email;
      const email_match = getEmailFromUrl();
      const data = {
        aceito: 'esperando'
      }
      const response = await axios.post(`http://localhost:3010/match/${email_usuario}/${email_match}`, data);

      console.log('Match realizado com sucesso!', response.data);
      // Adicione aqui qualquer lógica adicional após um match bem-sucedido
    } catch (error) {
      console.error('Erro ao realizar o match:', error.response || error.message);
      // Adicione aqui qualquer lógica adicional para lidar com erros
    }
  };

  // Estado para controlar a visibilidade da barra lateral
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Função para alternar a visibilidade da barra lateral
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
        <header className="bg-[#004E64] text-white shadow-md">
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
        <main className="flex flex-wrap h-full justify-center p-8">
          {/* Informações do perfil */}
          {userData && (
            <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
              {/* Imagem do perfil */}
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://www.imagensempng.com.br/wp-content/uploads/2021/08/Icone-usuario-Png-1024x1024.png"
                  alt="Imagem do Perfil"
                  className="w-20 h-20 rounded-full mb-4"
                />
              </div>
              {/* Dados do perfil */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold">{userData.nome}</h2>
                <p className="text-gray-500">{userData.email}</p>
              </div>
              {/* Detalhes do perfil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-4">
                    <strong>Altura:</strong> {userData.altura} cm
                  </p>
                  <p className="mb-4">
                    <strong>Peso:</strong> {userData.peso} kg
                  </p>
                  <p className="mb-4">
                    <strong>Data de Nascimento:</strong>{" "}
                    {new Date(userData.data_nascimento).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="mb-4">
                    <strong>Cidade:</strong> {userData.cidade}
                  </p>
                  <p className="mb-4">
                    <strong>Estado:</strong> {userData.estado}
                  </p>
                  <p className="mb-4">
                    <strong>Gênero:</strong> {userData.genero}
                  </p>
                  <p className="mb-4">
                    <strong>Telefone:</strong> {userData.telefone}
                  </p>
                </div>
              </div>
              {/* Descrição */}
              <div className="mt-4">
                <p>
                  <strong>Descrição:</strong> {userData.descricao}
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handleDarMatch}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                  Dar Match!
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Rodapé */}
        <footer className="bg-[#7AE582] p-4 shadow-md text-center">
          <p>&copy; 2023 TraineWiki. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Perfil;
