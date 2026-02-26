
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AutenticacaoContexto'; 
import './Logado.css';



export function Logado({ perfilEstaCompleto }) {
    
    const navigate = useNavigate();
    
    const { dadosToken } = useAuth();

    return (


        <div className="logado-palco-principal">


            {/* 🎭 Se não houver uma rota filha ativa, mostra a apresentação */}
            <Outlet /> 


            {/* 🏠 Painel de Boas-Vindas (Exibir apenas na página inicial do logado) */}
            {window.location.pathname === '/interno' && (


                <div className="Painel-Apresentacao-Inicial">
                

                    <div className="Grid-Status-Informativo">





                        <div className="Card-Status-Informativo">
                            <h2>👋 Olá, {dadosToken?.nome || "Usuário"}!</h2>
                            <p> Você acessou sua area interna com sucesso.</p>
                        </div>





                        {/* // 🧱 CARD DO PROGRAMADOR: Instruções Técnicas */}
                        {dadosToken?.func === 'programador' && (
                            <div className="Card-Status-Informativo 🛠️">

                                <h3>💻 Modo Desenvolvedor Ativo</h3>
                                <span>Você tem acesso à fundação do sistema. Gerencie os <strong>cards</strong> de usuários e monitore o Firebase.</span>
                                
                                <button 
                                    className="botao-master-programador" 
                                    onClick={() => navigate('/interno/PainelMaster')}
                                >
                                    Ir para Painel Master
                                </button>

                            </div>
                        )}









                        <div className="Card-Status-Informativo">
                            <h3>📜 Leia com atenção todas as instruções abaixo</h3>
                            <span>Utilize o menu no canto superior direito para navegar pelos setores e gerenciar seus <strong>cards</strong>.</span>
                        </div>

                


                
                


                        {/* // Alerta de Cadastro Incompleto - UX de Engajamento */}
                        {!perfilEstaCompleto && (
                            <div className="Card-Alerta-Cadastro">
                                <h3>Ação Necessária</h3>
                                <p>Detectamos que seu perfil ainda possui campos vazios.</p>
                                <strong>⚠️ Complete todos os cards do cadastro para liberar o acesso total aos recursos do sistema.</strong>
                            </div>
                        )}
                        






                        <div className="Card-Status-Seguranca ">
                            <div className="Icone-Status"></div>
                            <div>
                                <h3>Conexão Segura</h3>
                                <span>🔒 Sistema Blindado e Monitorado em Tempo Real.</span>
                            </div>
                        </div>







                    </div>

                    









                    

                    





                </div>


            )}


        </div>


    );


}