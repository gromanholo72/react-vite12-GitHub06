

/* 📐 GPS Global da Obra */
const local = window.location.hostname === 'localhost' || window.location.hostname === '192.168.15.7';

export const BASE_URL_SERVIDOR = local 
    ? "http://192.168.15.7:3001" 
    : "https://react-vite12-github06.onrender.com";

