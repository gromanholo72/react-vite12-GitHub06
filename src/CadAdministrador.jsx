

import React, { useState, useEffect } from 'react';
import { ref, set, get, onValue, remove, query, orderByChild } from "firebase/database";
import { db_realtime } from './firebaseConfig.js';
import './CadAdministrador.css'; 

export function CadAdministrador() {

    // 🧰 Ferramentas de Trabalho (Ferramentas de Trabalho)
    const [cpf, setCpf] = useState('');
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    const [listaAdmins, setListaAdmins] = useState([]);

    // 📡📻 Monitorando a Antena Central (Antena Central) com Lógica de Prioridade
    useEffect(() => {

        const caminhoUsuarios = ref(db_realtime, 'usuarios');
        const consulta = query(caminhoUsuarios, orderByChild('ordem'));
        
        const unsubscribe = onValue(consulta, (snapshot) => {
            const dados = snapshot.val();
            if (dados) {
                const listaBase = Object.values(dados).filter(u => u.func === 'administrador');

                // 🔄 LÓGICA DE ORGANIZAÇÃO DO PREFEITO:
                
                // 1. Quem já tem nome -> ORDEM ALFABÉTICA (A-Z)
                const cadastrados = listaBase
                    .filter(u => u.nome && u.nome.trim() !== "") 
                    .sort((a, b) => a.nome.localeCompare(b.nome));

                // 2. Quem não tem nome (Aguardando) -> POR CADASTRO (Mais novos primeiro)
                const aguardando = listaBase
                    .filter(u => !u.nome || u.nome.trim() === "") 
                    .sort((a, b) => (b.ordem || 0) - (a.ordem || 0));

                // Une as duas listas: Alfabética no topo, Aguardando no fim
                setListaAdmins([...cadastrados, ...aguardando]);
            } else {
                setListaAdmins([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // 🛠️ MÁSCARA DE CPF
    const lidarComCpf = (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(v);
    };

    // 🗑️ REMOVER ACESSO
    const removerAdmin = async (cpfAdm) => {
        const cpfLimpo = cpfAdm.replace(/\D/g, "");
        if (window.confirm(`⚠️ Confirmar remoção: ${cpfAdm}?`)) {
            try {
                await remove(ref(db_realtime, `usuarios/${cpfLimpo}`));
            } catch (error) {
                alert("❌ Erro na fundação.");
            }
        }
    };

    // 💾 REGISTRAR NOVO ADMIN
    const registrarAdmin = async (e) => {

        e.preventDefault();

        const cpfLimpo = cpf.replace(/\D/g, "");

        if (cpfLimpo.length !== 11) {
            setMsg({ tipo: 'erro', texto: 'CPF Inválido!' });
            return;
        }

        try {

            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);
            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {
                setMsg({ tipo: 'erro', texto: 'CPF já cadastrado!' });
                return;
            }

            const carimboTempo = Date.now();
            const novoAdmin = {
                cpef: cpf,
                nome: "",
                senh: "",
                mail: "",
                fone: "",
                func: "administrador",
                perm: "basica",
                situ: "ativo",
                datc: new Date().toLocaleString('pt-BR'),
                ordem: carimboTempo,
                cepe: "", ruaa: "", nume: "", bair: "", cida: "", esta: ""
            };



            console.log("📡 Enviando dados para o Firebase...");
            await set(caminhoNoBanco, novoAdmin);

            console.log("✅ Sucesso ao gravar!");
            setMsg({ tipo: 'sucesso', texto: '✅ Autorizado!' });
            setCpf('');

            setTimeout(() => setMsg({ tipo: '', texto: '' }), 3000);
            
        } catch (error) {
            setMsg({ tipo: 'erro', texto: '❌ Erro de conexão.' });
        }
    };

    return (
        <div className="cad-admin-container-master">
            <div className="cad-admin-grade-flexivel">
                <div className="cad-admin-card-compacto">
                    <div className="cad-admin-header-card"><h3>🔑 Cadastrar administrador</h3></div>
                    <div className="cad-admin-corpo-card">
                        <form className="cad-admin-formulario" onSubmit={registrarAdmin}>
                            <div className="cad-admin-grupo-input">
                                <input className="cad-admin-input-estilizado" value={cpf} onChange={lidarComCpf} placeholder="000.000.000-00" />
                            </div>
                            {msg.texto && <div className={`cad-admin-feedback ${msg.tipo}`}>{msg.texto}</div>}
                            <button type="submit" className="cad-admin-botao-registrar">🏗️ Cadastrar</button>
                        </form>
                    </div>
                </div>

                <div className="cad-admin-card-expandido">
                    <div className="cad-admin-header-card"><h3>📋 Administradores cadastrados</h3></div>
                    <div className="cad-admin-corpo-card">
                        <div className="cad-admin-tabela-responsiva">
                            <table className="cad-admin-tabela-dados">
                                <thead>
                                    <tr>
                                        <th>Nome / Status</th>
                                        <th>CPF</th>
                                        <th style={{ textAlign: 'center' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaAdmins.map((adm, index) => (
                                        <tr key={index}>
                                            <td style={{ color: !adm.nome ? '#999' : '#333' }}>
                                                {adm.nome || '⚠️ AGUARDANDO CADASTRO...'}
                                            </td>
                                            <td>{adm.cpef}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="cad-admin-botao-excluir" onClick={() => removerAdmin(adm.cpef)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}