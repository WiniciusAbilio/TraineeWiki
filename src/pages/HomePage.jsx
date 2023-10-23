import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faSearch, faBell} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


const EcommerceHomePage = () => {

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
                    <a href="#" className="text-white font-semibold text-2xl hover:underline">
                        Matchs
                    </a>
                    <a href="#" className="text-white mt-8 font-semibold text-2xl hover:underline">
                        Personais
                    </a>
                </div>
                <div className='flex flex-col' >
                    <h2 className="text-2xl mb-4 font-bold">Treinos</h2>
                    <div className='h-[0.125rem] mb-4 w-5/6 bg-white'></div>
                    <a href="#" className="text-white font-semibold text-2xl hover:underline">
                        Treino A
                    </a>
                    <a href="#" className="text-white mt-8 font-semibold text-2xl hover:underline">
                        Treino B
                    </a>
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
                    <FontAwesomeIcon size='2x' icon={faBars} color="white"/>
                </button>
                <h1 className="text-3xl font-semibold">TreinoWiki</h1>
            </div>
            <div className="flex space-x-4 mt-2 mr-10">
                <a href="#" className="text-white font-semibold text-2xl hover:underline">
                    GymBroo
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
            <div className='flex flex-row  mt-10 justify-center w-full'>
                <button className="bg-[#2BB4DF] mr-20 w-32 text-white mt-4 py-2 px-4 rounded-3xl hover:bg-blue-700">
                    Peito
                </button>
                <button className="bg-[#2BB4DF] mr-20 w-32 text-white mt-4 py-2 px-4 rounded-3xl hover:bg-blue-700">
                    Ombro
                </button>
                <button className="bg-[#2BB4DF] mr-20 w-32 text-white mt-4 py-2 px-4 rounded-3xl hover:bg-blue-700">
                    Perna
                </button>
                <button className="bg-[#2BB4DF] mr-20 w-32 text-white mt-4 py-2 px-4 rounded-3xl hover:bg-blue-700">
                    Braço
                </button>
                <button className="bg-[#2BB4DF] mr-20 w-32 text-white mt-4 py-2 px-4 rounded-3xl hover:bg-blue-700">
                    toraz
                </button>
            </div>
        </div>
        </header>
        {/* Conteúdo principal */}
        <main className="flex flex-wrap h-full  justify-center">
        <div className='flex flex-wrap w-3/4 justify-center'>
                {/* Cards */}
                <div className='flex flex-wrap w-3/4 justify-center'>
                {/* Cards */}
                <div id="contextMenu" className="context-menu" style={{ display: 'none' }}>
                    <ul className="bg-[#7AE582] border border-gray-300 w-32">
                        <li className="p-2 hover:bg-[#3e7e42]" onClick={handleAddToWorkout}>Treino A</li>
                        <li className="p-2 hover:bg-[#3e7e42]" onClick={handleCancel}>Treino B</li>
                    </ul>
                </div>
                {imageFiles.map((file, index) => (
                    <div className="flex flex-col justify-center m-4 w-64 p-4 bg-white rounded-md shadow-md" onContextMenu={handleContextMenu}>
                        <img key={index} className="w-full h-32 object-cover object-center rounded-md" src={`/..Pictures/${file}`} alt="Product" />
                        <h2 className="text-lg text-black font-semibold mt-2">{file.replace(".png", "").replace(".jpg", "")}</h2>
                        <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-700" onClick={handleContextMenu} onContextMenu={handleContextMenu}>
                            Adicionar ao Treino
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

export default EcommerceHomePage;
