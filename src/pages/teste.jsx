import fs from 'fs';
import path from 'path';

const PicturesList = () => {
  const directoryPath = path.join(__dirname, 'src', 'Pictures'); // caminho para a pasta de imagens

  // Lê os arquivos da pasta e filtra apenas as imagens
  const files = fs.readdirSync(directoryPath).filter(file => {
    return file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.gif');
  });

  return (
    <div>
      <h1>Lista de Imagens:</h1>
      <div className="picture-list">
        {files.map((file, index) => (
          <div key={index} className="picture-card">
            <img src={`./src/Pictures/${file}`} alt={`Imagem ${index + 1}`} />
            <p>{file}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicturesList;
