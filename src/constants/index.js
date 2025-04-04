import path from 'path';

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
  };

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'tmp');
export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');