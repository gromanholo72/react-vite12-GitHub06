import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth } from './AutenticacaoContexto.jsx';

/* // 🧱 Importação do estilo padrão */
import './PacienteEstilo.css';

export function PacienteEmergencia() {
    const { dadosPublicos } = useAuth();

    /* // 🧰 Ferramentas de Trabalho (Hooks) */
    const [nomeContato, setNomeContato] = useState('');
    const [telefoneContato, setTelefoneContato] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [observacao, setObservacao] = useState('');

    /* // 🔒 Controle de Edição */
    const [podeEditar, setPodeEditar] = useState(false);

    /* // 🕵️‍♂️ FUNÇÃO: Carregar dados do Firebase */
    const carregarDados = async () => {
        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}/emergencia`);

        try {
            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {
                const dados = snapshot.val();
                setNomeContato(dados.nomeContato || '');
                setTelefoneContato(dados.telefoneContato || '');
                setParentesco(dados.parentesco || '');
                setObservacao(dados.observacao || '');
                setPodeEditar(false);
            } else {
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar dados:", error);
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
                nomeContato: nomeContato,
                telefoneContato: telefoneContato,
                parentesco: parentesco,
                observacao: observacao
            };
    
            await update(caminhoNoBanco, { emergencia: vetorDados });

            alert("✅ Registro de emergência salvo!");
            setPodeEditar(false);
        } catch (error) {
            alert("Erro ao salvar observações no banco.");
        }
    };

    return (
        <div className="componente-principal-padrao">
            <div className="componente-suporte-padrao">

                <div className="card-padrao">
                    <div className="card-padrao-titulo">🚨 EMERGÊNCIA E OBSERVAÇÕES</div>

                    <div className="card-padrao-corpo">
                        <div className="flex-paciente-emergencia-nome">
                            <label>👤 Nome do Contato</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={nomeContato} 
                                onChange={(e) => setNomeContato(e.target.value)} 
                                placeholder="Nome do responsável" 
                            />
                        </div>

                        <div className="flex-paciente-emergencia-fone">
                            <label>📞 Telefone</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={telefoneContato} 
                                onChange={(e) => setTelefoneContato(e.target.value)} 
                                placeholder="(00) 00000-0000" 
                            />
                        </div>

                        <div className="flex-paciente-emergencia-parentesco">
                            <label>🤝 Parentesco</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={parentesco} 
                                onChange={(e) => setParentesco(e.target.value)} 
                                placeholder="Grau de proximidade" 
                            />
                        </div>

                        {/* // 📝 Novo Campo: Observações Importantes */}
                        <div className="flex-paciente-emergencia-obs">
                            <label>📝 Observações Médicas / Gerais</label>
                            <input 
                                disabled={!podeEditar} 
                                value={observacao} 
                                onChange={(e) => setObservacao(e.target.value)} 
                                placeholder="Alergias, tipos sanguíneos ou instruções especiais..."
                                rows="4"
                                style={{ width: '100%', borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar 🔓" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar Informações
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