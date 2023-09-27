import React from 'react';
import '../styles/';

function LoginPage() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-center text-black text-2xl font-semibold mb-4">Login</h2>
        <form action="processar_login.php" method="post">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />

          <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />

          <button type="submit" className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
