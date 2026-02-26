import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto.jsx';

import './PacienteEstilo.css';

export function PacienteAlimentacao() {

    const { dadosPublicos } = useAuth();

    /* // 🧰 Ferramentas de Trabalho (Hooks) */
    const [cafe, setCafe] = useState('');
    const [almoco, setAlmoco] = useState('');
    const [jantar, setJantar] = useState('');

    /* // 🔒 Controle de Edição */
    const [podeEditar, setPodeEditar] = useState(false);

    /* // 🕵️‍♂️ FUNÇÃO: Carregar dados da 📡🗼 Antena Central (Firebase) */
    const carregarDados = async () => {

        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}/alimentacao`);

        try {

            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {

                const dados = snapshot.val();
                setCafe(dados.cafe || '');
                setAlmoco(dados.almoco || '');
                setJantar(dados.jantar || '');
                setPodeEditar(false);

            } else {

                setPodeEditar(true);

            }

        } catch (error) {

            console.error("❌ Erro ao buscar dados da obra:", error);

        }

    };

    useEffect(() => { 

        carregarDados(); 

    }, [dadosPublicos.cpef]);



    /* // 💾 SALVAR NO FIREBASE */
    const salvarNoBanco = async () => {

        try {

            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}`);

            const vetorDados = {
                cafe: cafe,
                almoco: almoco,
                jantar: jantar
            };
    
            await update(caminhoNoBanco, { alimentacao: vetorDados });

            alert("✅ Alimentação registrada com sucesso!");

            setPodeEditar(false);

        } catch (error) {

            alert("Erro ao concretar os dados no banco.");

        }

    };

    return (

        <div className="componente-principal-padrao-paciente">

            <div className="componente-suporte-padrao-paciente">

                <div className="card-padrao-paciente">
                    
                    <div className="card-padrao-titulo">🍱 ALIMENTAÇÃO (3 HORÁRIOS)</div>

                    <div className="card-padrao-corpo">

                        {/* // ☀️ Horário 1: Café da Manhã */}
                        <div className="flex-paciente-cafe">
                            <label>☕ Café da Manhã</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={cafe} 
                                onChange={(e) => setCafe(e.target.value)} 
                                placeholder="Descreva o cafe da manha?" 
                            />
                        </div>

                        {/* // 🍛 Horário 2: Almoço */}
                        <div className="flex-paciente-almoco ">
                            <label>🍽️ Almoço</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={almoco} 
                                onChange={(e) => setAlmoco(e.target.value)} 
                                placeholder="Descrição do almoço" 
                            />
                        </div>

                        {/* // 🌙 Horário 3: Jantar */}
                        <div className="flex-paciente-jantar">
                            <label>🥣 Jantar / Ceia</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={jantar} 
                                onChange={(e) => setJantar(e.target.value)} 
                                placeholder="Descrição do jantar" 
                            />
                        </div>


                        {/* // 🛠️ Área de Ações nos Cards */}
                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar 🔓" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar Horários
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar 💾" onClick={salvarNoBanco}>💾 Salvar</button>
                                    <button type="button" className="BotaoCancelar ✖️" onClick={() => { carregarDados(); setPodeEditar(false); }}>✖️ Cancelar</button>
                                </>
                            )}
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
}