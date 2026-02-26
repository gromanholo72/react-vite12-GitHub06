import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// ⚙️ Suas chaves de configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXiQR1AWvZA1cJbbLcNdYKMW2YW0B6imA",
    authDomain: "react-vite01-644c9.firebaseapp.com",
    projectId: "react-vite01-644c9",
    storageBucket: "react-vite01-644c9.firebasestorage.app",
    messagingSenderId: "294571020570",
    appId: "1:294571020570:web:cbf1f9a7a9c92ddb441ca3",

    databaseURL: "https://react-vite01-644c9-default-rtdb.firebaseio.com"
    
};

// 📢 Inicializa o Firebase (Com proteção para não duplicar o App no Vite)
// Se já existir um app ligado, ele usa o existente. Se não, ele cria um novo.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 📢 Exporta as instâncias para o App.jsx conseguir ler
export const auth = getAuth(app);           // Para Login/Senha
export const db_firestore = getFirestore(app);         // Para Banco de Dados Firestore
export const db_realtime = getDatabase(app); // Para Banco de Dados Realtime

