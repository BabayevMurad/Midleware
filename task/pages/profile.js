import fs from 'fs';
import path from 'path';

export async function getServerSideProps() {
  const dataPath = path.join(process.cwd(), 'data', 'data.txt');
  const text = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, 'utf-8') : 'Məlumat yoxdur';

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];

  return { props: { text, files } };
}

export default function Profile({ text, files }) {
  return (
    <div>
      <h2>Ad və Email</h2>
      <pre>{text}</pre>
      <h2>Yüklənmiş fayllar</h2>
      {files.map((file, i) => (
        <div key={i}>
          {file.match(/\.(jpg|png)$/) ? (
            <img src={`/uploads/${file}`} alt={file} width={200} />
          ) : (
            <a href={`/uploads/${file}`} target="_blank" rel="noreferrer">{file}</a>
          )}
        </div>
      ))}
    </div>
  );
}
