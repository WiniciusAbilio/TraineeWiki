# TraineeWiki

Bem-vindo ao TraineeWiki - Sua plataforma para criar treinos, encontrar Gymbros e aprimorar seus resultados de treinamento físico.

## Como Iniciar

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Criar Banco de Dados

Certifique-se de ter um banco de dados configurado. As instruções específicas podem variar dependendo do banco de dados escolhido.

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente, ajustando os valores conforme necessário:

```env
DB_HOST=seu_host_do_banco
DB_USER=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_DATABASE=seu_nome_de_banco
PORT=3000
```

### 3. Instalar Dependências

Abra um terminal na raiz do projeto e execute o seguinte comando para instalar as dependências:

```bash
npm install
```

### 4. Executar o Servidor

Inicie o servidor Node.js com o seguinte comando:

```bash
node src/server.js
```

### 5. Executar o Frontend

Em outro terminal, execute o aplicativo Next.js com o comando:

```bash
npm run dev
```

O projeto agora está em execução! Abra seu navegador e acesse `http://localhost:3000` para começar a usar o TraineeWiki.

## Recursos

- **Criar Treinos:** Elabore planos de treino personalizados para atingir seus objetivos fitness.

- **Encontrar Gymbros:** Conecte-se com outros entusiastas do fitness e compartilhe experiências.

Lembre-se de ajustar as configurações do banco de dados, como host, usuário, senha e nome do banco de dados, conforme necessário para o seu ambiente. Divirta-se explorando e aprimorando seus treinos no TraineeWiki!
