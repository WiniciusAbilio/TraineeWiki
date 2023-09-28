import React from 'react';
import styles from '@/styles/login.module.css';

function LoginPage() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center w-full md:w-4/5 md:h-5/6 lg:w-3/5 xl:w-2/5 h-[80%]">
        <div>
          <h2 className="text-center text-black text-2xl font-semibold mb-4">Faça Login</h2>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[70%] md:h-[50%] flex flex-col mt-10 justify-center items-center'>
            <form action="processar_login.php" method="post">
              <div className='flex flex-col w-full md:w-80'>
                <h2 className='text-center text-black  md:text-2xl text-3xl font-semibold mb-4'>Coloque seu email e sua senha!</h2>
                <div className='mb-7'>
                  <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`${styles.inputLogin} mt-1 p-2 w-full border focus:outline-none focus:ring focus:border-blue-300`}
                  />
                </div>
                <div className='flex flex-col items-start'>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className={`${styles.inputLogin} mt-1 p-2 w-full border focus:outline-none focus:ring focus:border-blue-300`}
                  />
                </div>
                <div className='flex justify-center items-end h-28'>
                  <button type="submit" className="bg-stone-800 h-12 w-full md:w-40 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
                </div>
              </div>
            </form>
            <div className='mt-4 text-center text-black'>Não tem uma conta?</div>
            <div className='text-center text-lg font-bold'>
              <a className='text-[#eab308] hover:underline' href='#'>Registre-se</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
