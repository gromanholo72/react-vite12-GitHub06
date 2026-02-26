import { useState, useEffect, useRef } from 'react';

import { BASE_URL_SERVIDOR } from './config/api.js';

import './ListaUsuarios.css'; 

/* // ✅ Exportação Direta: Já nasce pronto para ser entregue ao App.jsx */
export function ListaUsuarios() {



    const [usuarios, setUsuarios] = useState([]);

    

    useEffect(() => {

        console.log("✨ 🛰️ Iniciando resgate dos cards...");
    
        fetch(`${BASE_URL_SERVIDOR}/dados-dos-cards-aberto`)
            .then(res => {
                /* 🧱 Verificamos se a resposta da Antena foi positiva (status 200) */
                if (!res.ok) {
                    throw new Error(`🚨 Erro na Antena: ${res.status}`);
                }
                return res.json();
            })
            .then(dados => {
                /* 🧱 Garantimos que 'dados' seja um Array antes de salvar no estado */
                if (Array.isArray(dados)) {
                    console.log("✨ 📦 Cards carregados com sucesso!");
                    setUsuarios(dados);
                } else {
                    console.error("❌ A Antena não enviou uma lista de cards válida.");
                    setUsuarios([]); /* Fallback: lista vazia para não quebrar o .map */
                }
            })
            .catch(error => {
                console.error("❌ Erro fatal ao carregar os cards:", error);
                setUsuarios([]); /* 🧱 Evita que o .map quebre o componente */
            });
    
    }, []);










    return (
        <div className="ListaUsuariosPainelGeral">
            <h2 className="ListaUsuariosTituloGaleria">🏠 Painel de Moradores</h2>
            
            <div className="ListaUsuariosGradeCards">
                {usuarios.map((user) => (
                    /* // 🎫 Cada usuário agora nasce em sua própria linha */
                    <div key={user.id} className="ListaUsuariosCardItem">
                        <h3>👤 {user.nome}</h3>
                        <p>👔 CPF: {user.cpef}</p>
                        <p>🛠️ Função: {user.func}</p>
                        <p>🔑 Permissão: {user.perm}</p>
                        <div className={`ListaUsuarioStatusBadge ${user.situ}`}>
                            {user.situ === 'ativo' ? '🟢 Ativo' : '🔴 Inativo'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}