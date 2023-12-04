// pages/api/listFiles.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'public', 'Pictures', 'Treinos'); // caminho para a pasta de imagens

  // Lê os arquivos da pasta e filtra apenas as imagens
  const files = fs.readdirSync(directoryPath).filter(file => {
    return file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.gif');
  });

  res.status(200).json({ files });
}
