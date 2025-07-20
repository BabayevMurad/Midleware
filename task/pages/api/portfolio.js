import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const dataDir = path.join(process.cwd(), 'data');

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parse error' });
    }

    try {
      const file = files.file;
      const fileObj = Array.isArray(file) ? file[0] : file;

      const ext = path.extname(fileObj.originalFilename || '').toLowerCase();
      if (!['.jpg', '.png', '.pdf'].includes(ext)) {
        return res.status(400).json({ error: 'Yalnız .jpg, .png, .pdf fayllar' });
      }

      if (fileObj.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'Fayl çox böyükdür (>5MB)' });
      }

      const newPath = path.join(uploadDir, fileObj.originalFilename);
      fs.renameSync(fileObj.filepath, newPath);

      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

      const dataText = `Ad: ${fields.name}\nEmail: ${fields.email}\n`;
      fs.writeFileSync(path.join(dataDir, 'data.txt'), dataText, 'utf-8');

      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Server xətası:', e);
      return res.status(500).json({ error: 'Server xətası' });
    }
  });
}
