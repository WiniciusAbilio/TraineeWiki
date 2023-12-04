import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/login.module.css';
import Link from 'next/link';
import { verificaTokenValido } from '../Components/Utils/autenticador';

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
      if (verificaTokenValido()) {
          router.push('/HomePage');
          return;
      }
  }, []);

  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await fetch('http://localhost:3010/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha}),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.error === 'senha_invalida' || data.error === 'usuario_nao_encontrado') {
          console.log(data.error)
          router.push('/');
          return;
        }

        localStorage.setItem('token', data.token);
        router.push('/HomePage');
      } else {
        console.error('Erro de autenticação:', response.status);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
    <div className={`${styles.containerLogin} bg-white p-6 rounded-lg shadow-md flex flex-col justify-center w-full  items-center md:w-4/5 md:h-5/6 lg:w-3/5 xl:w-2/5 h-[80%]`}>
      <div>
        <h2 className="text-center text-black text-2xl font-semibold mb-4">Faça Login</h2>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-[70%] md:h-[50%] w-full flex flex-col justify-center items-center'>
          <form onSubmit={handleLogin} method="post">
            <div className='flex flex-col w-full md:w-80'>
              <div className='mb-7'>
                <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.inputborder} mt-1 p-2 w-full border focus:outline-none focus:ring focus:border-blue-300`}
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha:</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  required
                  value={senha}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.inputborder} mt-1 p-2 w-full border focus:outline-none focus:ring focus:border-blue-300`}
                />
              </div>
              <div className='flex justify-center items-end h-28'>
                <button type="submit" className="bg-stone-800 h-12 w-full md:w-40 text-white mt-4 py-2 px-4 rounded-md hover:bg-[#74E582]">Login</button>
              </div>
            </div>
          </form>
          <div className='mt-4 text-center text-black'>Não tem uma conta?</div>
          <div className='text-center text-lg font-bold'>
            <Link className='text-[#74E582] hover:underline' href='/chooseRegister'>Registre-se</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
