import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database"; /* Conexão com a Antena */
import { db_realtime } from './firebaseConfig.js'; /* Nossa Fundação */
// import './RelClientes.css'; 

export function RelClientes() {
    const [listaClientes, setListaClientes] = useState([]); /* Gaveta para a lista */
    const [carregando, setCarregando] = useState(true);

    /* 📡 Ação: Ao carregar a página, busca na Antena Central */
    useEffect(() => {
        const caminhoDb = ref(db_realtime, 'usuarios'); /* Onde os dados moram */
        
        /* Escuta em tempo real (onValue) */
        onValue(caminhoDb, (snapshot) => {
            const dados = snapshot.val();
            if (dados) {
                /* Converte o objeto do Firebase em uma Lista (Array) */
                const listaFormatada = Object.keys(dados).map(id => ({
                    id: id,
                    ...dados[id]
                })).filter(user => user.func === 'cliente'); /* 🎯 Filtra apenas Clientes! */

                setListaClientes(listaFormatada);
            }
            setCarregando(false);
        });
    }, []);

    return (
        <div className="PainelRelatorio 🏢">
            <div className="TituloSetor 📈">
                <h2>Relatório de Clientes</h2>
                <p>Gestão de contratantes cadastrados no sistema</p>
            </div>

            {carregando ? (
                <p className="StatusProtegido ⏳">Buscando informações na Antena Central...</p>
            ) : (
                <div className="TabelaContainer 📦">
                    <table className="TabelaEstilizada 📊">
                        <thead>
                            <tr>
                                <th>Contratante</th>
                                <th>Contato</th>
                                <th>E-mail</th>
                                <th>Status da Obra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaClientes.length > 0 ? (
                                listaClientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.fone}</td>
                                        <td>{cliente.mail}</td>
                                        <td><span className="TagSucesso ✅">Ativo</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="StatusProtegido 🚫">Nenhum cliente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            
            <p className="StatusProtegido 🛡️">🛡️ Dados protegidos pela fundação Giuliano</p>
        </div>
    );
}