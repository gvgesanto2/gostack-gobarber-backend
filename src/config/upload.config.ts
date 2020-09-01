import path from 'path';
import crypto from 'crypto';

import multer from 'multer';

const publicFolder = path.resolve(__dirname, '..', '..', 'public', 'uploads');

export default {
  directory: publicFolder,
  storage: multer.diskStorage({
    destination: publicFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
