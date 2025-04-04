import path from 'path';

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
  };

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'tmp');
export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};