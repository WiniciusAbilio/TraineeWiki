import { useRouter } from 'next/router';
import React from 'react';

const LogoutLink = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remova o token do localStorage aqui
    localStorage.removeItem('token'); // Substitua 'token' pelo nome do seu token no localStorage
    router.push('/');
  };

  return (
    <div>
      <a href="#" className="text-white font-semibold text-2xl hover:underline" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
};

export default LogoutLink;
