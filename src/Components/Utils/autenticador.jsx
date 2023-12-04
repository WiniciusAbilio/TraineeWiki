import jwt from 'jsonwebtoken';

const verificaTokenValido = () => {
  try {
    // Recupere o token do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Se não houver token ou não for um array válido, o usuário não está autenticado
      console.log('Usuário não autenticado');
      return false;
    }

    // Combine os três valores do token em uma única string


    // Use a chave secreta como string ou Buffer
    const chaveSecreta = 'chave_secreta'; // Substitua pela sua chave real

    // Decodifique o token usando a chave secreta
    const decoded = jwt.decode(token);



    // Faça qualquer verificação adicional necessária aqui

    // Se todas as verificações passarem, retorne true
    return true;
  } catch (error) {
    // Se ocorrer algum erro na verificação, o token é inválido, então retorne false
    console.error('Erro na verificação do token:', error.message);
    return false;
  }
};


const dadosToken = () => {
  try {
    // Recupere o token do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Se não houver token ou não for um array válido, o usuário não está autenticado
      console.log('Usuário não autenticado');
      return false;
    }

    // Combine os três valores do token em uma única string


    // Use a chave secreta como string ou Buffer
    const chaveSecreta = 'chave_secreta'; // Substitua pela sua chave real

    // Decodifique o token usando a chave secreta
    const decoded = jwt.decode(token);

  

    // Faça qualquer verificação adicional necessária aqui

    // Se todas as verificações passarem, retorne true
    return decoded;
  } catch (error) {
    // Se ocorrer algum erro na verificação, o token é inválido, então retorne false
    console.error('Erro na verificação do token:', error.message);
    return null;
  }
};


export { verificaTokenValido, dadosToken };
