
import { useState, useEffect, useRef } from 'react';

import { useAuth } from './AutenticacaoContexto';

import { BASE_URL_SERVIDOR } from './config/api.js';

import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig';




import './Chat.css';

export function Chat() {




    const scrollRef = useRef(null);



    const { dadosToken, socket } = useAuth();





   
    



    /* 🧱 -------------------------------- */
    /* 🧱 Fluxo de Telas (Sidebar vs Chat) */
    /* 🧱 -------------------------------- */
    /* 📐 Esta lógica garante que:
    - o Administrador comece na lista de cards e 
    - o Usuário na conversa direta */
    /*  Definição de Permissões de Suporte */
    const FUNCOES_SUPORTE = ["administrador", "atendente"];
    const ehEquipeSuporte = FUNCOES_SUPORTE.includes(dadosToken?.func);

    const [secaoAbertaSidebarOuChat, setSecaoAbertaSidebarOuChat] = useState(() => {

        /* 🚀 Estratégica: Seleção automática de interface baseada na função do Token */
        const valorInicial = ehEquipeSuporte ? 'lista' : 'conversa';

        console.log("📐 ----------------------------------");
        console.log("📐 useState() - Lazy Initialization - componente - Chat.jsx");
        console.log("✨ 🔵 secaoAbertaSidebarOuChat nasceu como = ", valorInicial);
        console.log("📐 ----------------------------------");
        
        return valorInicial;

    });




















    /* ------------------------------------------------------------- */
    /* INICIO - LISTAR USUSARIOS PARA MOSTRAR NO SIDEBAR DA EQUIPE DE SUPORTE */
    /* ------------------------------------------------------------- */
    const [listaUsuariosParaSideBar, setListaUsuariosParaSideBar] = useState([]);

    const buscarLista = async () => {

        if (!ehEquipeSuporte) return;

        try {

            const resposta = await fetch(`${BASE_URL_SERVIDOR}/api/lista-conversas`);
            const dados = await resposta.json();
            setListaUsuariosParaSideBar(dados);
            console.log("✨ ----------------------------------");
            console.log("✨ Carregar lista de usuarios para ehEquipeSuporte - componente - Chat.jsx");
            console.log("✨ 🔵 Lista de usuarios", dados);
            console.log("✨ ----------------------------------");

        } catch (error) {

            console.log("❌ Erro ao carregar sidebar:", error);

        }
    };

    useEffect(() => {

        buscarLista();

    }, [dadosToken, ehEquipeSuporte]);

    /* ------------------------------------------------------------- */
    /* FIM - LISTAR USUSARIOS PARA MOSTRAR NO SIDEBAR DA EQUIPE DE SUPORTE */
    /* ------------------------------------------------------------- */






    useEffect(() => {
        if (!socket) return;
    
        /* ✨ OUVINTE DA SIDEBAR */
        socket.on('atualizar_sidebar', () => {
            console.log("📐 🔵 Sinal recebido! Atualizando lista de cards...");
            buscarLista(); // 🚀 A função que faz o fetch no /api/lista-conversas
        });
    
        return () => socket.off('atualizar_sidebar');
    }, [socket]);










    /* ---------------------------------- */
    /* INICIO - Montar Mensagem (chat) Inicial */
    /* ---------------------------------- */

    const [mensagens, setMensagens] = useState(() => {

        if (ehEquipeSuporte) {
            return []; 
        }

        const msgBoasVindas = {

            type: 'message',

            remetente_cpef: "00000000000",
            remetente_nome: "Central de Atendimento",
            remetente_func: "CentralDeAtendimento",

            destino_cpef: dadosToken.cpef,
            
            texto: "Olá, como posso te ajudar? 😊",
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            tipo_class: 'received'

        };

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 useState() - componente - 🏛️ Chat.jsx");
        console.log("📐 Lazy Initialization - 🔵 mensagens");
        console.log("📐 🔵 Mensagem (chat) inicial montada: ", msgBoasVindas);
        console.log("📐 ----------------------------------");

        return [msgBoasVindas];

    });

    /* ---------------------------------- */
    /* FIM - Montar Mensagem (chat) Inicial */
    /* ---------------------------------- */






















    
    useEffect(() => {
        if (scrollRef.current) {
           
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            
            console.log("📐 🔵 mensagens carregadas = ", mensagens.length);
        }
    }, [mensagens, secaoAbertaSidebarOuChat]);






//     useEffect(() => {
//         if (secaoAbertaSidebarOuChat === 'conversa') {
//             const timer = setTimeout(() => {
//                 const alturaTotalBody = document.body.scrollHeight;
//                 const alturaJanela = window.innerHeight;
    
//                 if (alturaTotalBody > alturaJanela) {
//                     window.scrollTo({
//                         top: alturaTotalBody,
//                         behavior: 'smooth'
//                     });
//                     console.log("📐 🔵 Scroll do BODY acionado.");
//                 }
//             }, 150);
//             return () => clearTimeout(timer);
//         }
//     }, [secaoAbertaSidebarOuChat, mensagens]);


// useEffect(() => {

//     const timer = setTimeout(() => {
//         if (scrollRef.current) {

//             const elemento = scrollRef.current;

//             const temConteudoParaRolar = elemento.scrollHeight > elemento.clientHeight;

//             if (temConteudoParaRolar) {
//                 elemento.scrollTop = elemento.scrollHeight;
                
//                 console.log("📐 🔵 Scroll interno acionado com delay!");
//                 console.log("📐 🎟️ scrollHeight final = ", elemento.scrollHeight);
//             } else {
//                 console.log("📐 ⚪ Sem scroll: O conteúdo ainda cabe na área visível.");
//             }
//         }
//     }, 200); 

//     return () => clearTimeout(timer);
// }, [mensagens, secaoAbertaSidebarOuChat]);


    









// /* ✨ Ferramentas de Trabalho: Sincronia de Scroll Inteligente */
// useEffect(() => {
//     // 🕒 Aguarda 200ms para o DOM processar os cards de mensagens
//     const timer = setTimeout(() => {
//         if (scrollRef.current && secaoAbertaSidebarOuChat === 'conversa') {
//             const el = scrollRef.current;
            
//             // 📐 1. Verifica se a DIV DE MENSAGENS tem scroll (conteúdo > altura visível)
//             const temScrollInterno = el.scrollHeight > el.clientHeight;

//             if (temScrollInterno) {
//                 // 🚀 Leva o scroll interno para o final
//                 el.scrollTop = el.scrollHeight;
//                 console.log("📐 🔵 Scroll Interno (Cards): Conteúdo transbordou, enviando para o final.");
                
//                 // 🌍 2. Verifica se, após rolar as mensagens, a PÁGINA inteira transbordou a tela
//                 const alturaTotalBody = document.body.scrollHeight;
//                 const alturaJanela = window.innerHeight;

//                 if (alturaTotalBody > alturaJanela) {
//                     window.scrollTo({
//                         top: alturaTotalBody,
//                         behavior: 'smooth'
//                     });
//                     console.log("📐 🌍 Scroll Global (Body): Página maior que a tela, ajustando visão.");
//                 }
//             } else {
//                 // ⚪ Se não tem scroll, não faz nada (mantém no topo/posição natural)
//                 console.log("📐 ⚪ Sem Scroll: O conteúdo dos cards cabe perfeitamente na tela.");
//             }
//         }
//     }, 200);

//     return () => clearTimeout(timer);
// }, [mensagens, secaoAbertaSidebarOuChat]);




















    /* ---------------------------------- */
    /* INICIO - Monitorando a Mudança */
    /* ---------------------------------- */

    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - Componente - Chat.jsx");
        console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        console.log("✨ 🎫 dadosToken = ", dadosToken);
        console.log("✨ ----------------------------------");
    }, [dadosToken]);


    useEffect(() => {
       
            console.log("");
            console.log("✨ ----------------------------------");
            console.log("✨ useEffect() - Componente - Chat.jsx");
            console.log("✨ 🏷️ MONITORANDO: messageData");
            console.log("✨ 🔵 messageData: ",mensagens);  
            console.log("✨ ----------------------------------");
        
    }, [mensagens]);


    useEffect(() => {
       
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - Componente - Chat.jsx");
        console.log("✨ 🏷️ MONITORANDO: messageData");
        console.log("✨ 🔵 messageData: ", listaUsuariosParaSideBar);  
        console.log("✨ ----------------------------------");
    
    }, [listaUsuariosParaSideBar]);
    
    /* ---------------------------------- */
    /* FIM - Monitorando a Mudança */
    /* ---------------------------------- */













  








    


 

 

  









    useEffect(() => {

        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - Componente - Chat.jsx");
        console.log("socket.emit('bind', {");
        console.log("socket.on('message', (data) => {");
        console.log("✨ ----------------------------------");

        socket.emit('bind', {

            sender_nome: dadosToken.nome,
            sender_cpef: dadosToken.cpef,
            user_role: dadosToken.func

        });

        const manipularNovaMensagem = (data) => {

            console.log(`✨ 🔵 Mensagem recebida nos cards: ${data.texto}`);

            const elementoAudio = document.getElementById('soundNotification');
            if (elementoAudio) {
                elementoAudio.play().catch(() => {
                    console.log(`✨ 🔵 Áudio aguardando interação do usuário.`);
                });
            }

        };

        const atualizarSidebar = () => {

            console.log("✨ 👔 Socket avisou: Atualizando sidebar...");

            buscarLista();

        };

        socket.on('message', manipularNovaMensagem);
        socket.on('atualizar_sidebar', atualizarSidebar);

        return () => {

            socket.off('message', manipularNovaMensagem);
            socket.off('atualizar_sidebar', atualizarSidebar);
            console.log(`✨ 🔵 Conexão de rádio encerrada para: ${dadosToken?.nome}`);

        };

    }, [dadosToken]);

























    


   
    
    const [inputMensagem, setInputMensagem] = useState("");
    const [targetId, setTargetId] = useState(null);

    const enviarMensagem = () => {

        if (!inputMensagem.trim()) return;
    
        const destinoCpfFinal = ehEquipeSuporte ? targetId : "00000000000";
    
        if (ehEquipeSuporte && !targetId) {
            console.log("⚠️ 👔 Escolha um cliente na sidebar primeiro.");
            return;
        }

        const messageData = {
            
            type: 'message',

            remetente_cpef: dadosToken.cpef,
            remetente_nome: dadosToken.nome,
            remetente_func: dadosToken.func,
            
            destino_cpef: destinoCpfFinal,
            
            texto: inputMensagem,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now(),

            tipo_class: 'sent',

            funcao_suporte_referencia: ehEquipeSuporte ? dadosToken.func : "CentralDeAtendimento" 

        };
    
        socket.emit('message', messageData);

        setInputMensagem("");

    };










    /* 🧱 ------------------------------------------------------------- */
    /* 🧱 MOTOR DE SINCRONIZAÇÃO COM PERSISTÊNCIA DE WELCOME           */
    /* ------------------------------------------------------------- */
    useEffect(() => {

        const cpfParaEscuta = ehEquipeSuporte ? targetId : dadosToken?.cpef;

        console.log("⚠️ cpfParaEscuta", cpfParaEscuta);
       
        if (!cpfParaEscuta) {

            if (ehEquipeSuporte) setMensagens([]); 
            return;

        }

        const cpfParaEscutaLimpo = cpfParaEscuta.replace(/[.#$[\]]/g, "");

        console.log("⚠️ cpfParaEscutaLimpo", cpfParaEscutaLimpo);

        if (ehEquipeSuporte) setMensagens([]); 

        const mensagensRef = ref(db_realtime, `mensagens/conversas_individuais/${cpfParaEscutaLimpo}`);

        const desativarEscuta = onValue(mensagensRef, (snapshot) => {

            const dados = snapshot.val();
            
            if (dados) {

                const listaDoBanco = Object.values(dados).sort((a, b) => a.timestamp - b.timestamp);
                
                if (!ehEquipeSuporte) {
                   
                    const msgBoasVindas = {

                        type: 'message',

                        remetente_cpef: "00000000000",
                        remetente_nome: "Central de Atendimento",
                        remetente_func: "CentralDeAtendimento",

                        destino_cpef: dadosToken.cpef,

                        texto: "Olá, como posso te ajudar? 😊",
                        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                        timestamp: Date.now(),

                        tipo_class: 'received'

                    };
                    
                    setMensagens([msgBoasVindas, ...listaDoBanco]);

                } else {
                    
                    setMensagens(listaDoBanco);

                }

            } else {
                /* Se o banco estiver vazio, o useState inicial (Welcome) já está lá, 
                então não fazemos nada para não resetar o estado. */
                if (ehEquipeSuporte) setMensagens([]);
            }
        });

        return () => desativarEscuta();
        
    }, [targetId, ehEquipeSuporte, dadosToken?.cpef]);






























    return (


        <div className="whatsapp-layout" >


            <audio 
                id="soundNotification" 
                src="/audio/chegou.mp3" 
                preload="auto" 
            />
          
            


            <div className="chat-window">




                {ehEquipeSuporte && (



                    <div className={`sidebar ${secaoAbertaSidebarOuChat === 'lista' ? 'active' : ''}`}>

                        <header className="sidebar-header">
                            <div className="user-avatar">👤</div>
                            <span>Mensagens</span>
                        </header>

                        <div className="sidebar-content">
                            {listaUsuariosParaSideBar.map((usuario) => (
                                <div 
                                    key={usuario.cpef} 
                                    className={`chat-card ${targetId === usuario.cpef ? 'active' : ''}`} 
                                    onClick={() => { 
                                        setTargetId(usuario.cpef); 
                                        setSecaoAbertaSidebarOuChat('conversa'); 
                                    }}
                                >
                                    {/* <div className="card-avatar">💬</div> */}
                                    <div className="card-info">
                                        <span className="card-name">{usuario.nome}</span>
                                        <span className="card-status">{usuario.cpef}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>



                )}












                <div className={`main-chat ${secaoAbertaSidebarOuChat === 'conversa' ? 'active' : ''}`}>



                    <header className="chat-header">

                        {ehEquipeSuporte && (
                            <button className="back-button" onClick={() => setSecaoAbertaSidebarOuChat('lista')}>⬅️</button>
                        )}
                        <div className="chat-info">
                            <span className="chat-name">{targetId ? `Atendimento #${targetId}` : "Suporte Oficial"}</span>
                            <span className="chat-status">Online agora</span>
                        </div>

                    </header>



                    <div className="chat-messages" ref={scrollRef}>

                        {mensagens.map((msg, index) => {


                            console.log(`✨ 🔵 Renderizando Card #${index}`);
                            console.log("📐 👔 msg.remetente_cpef = ", msg.remetente_cpef);
                            console.log("📐 🎟️ dadosToken?.cpef = ", dadosToken?.cpef);


                            /* 📐 Console para monitorar a comparação de cada bolha */
                            // console.log(`✨ 🔵 Renderizando Card ${index} - souEu: ${souEu}`);
                            // console.log(`✨ 👔 remetente_cpef: ${msg.remetente_cpef} | dadosToken.cpef: ${dadosToken?.cpef}`);



                            const souEu = msg.remetente_cpef === dadosToken.cpef;
                            const primeiroNome = msg.remetente_nome.split(' ')[0];

                            return (
                                <div 
                                    key={index}  
                                    className={`msg-bubble ${souEu ? 'sent' : 'received'}`}      
                                >
                                    <span className="msg-author"> {primeiroNome} </span>
                                    <p className="msg-text"> {msg.texto} </p>
                                    <span className="msg-time"> {msg.time} </span>          
                                </div>
                            );

                        })}

                    </div>






                    <footer className="chat-footer">
                        <input 
                            type="text" 
                            placeholder="Mensagem" 
                            value={inputMensagem}
                            onChange={(e) => setInputMensagem(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                        />      
                        <button className="send-btn" onClick={enviarMensagem}>
                            <svg viewBox="0 0 24 24" width="24" height="24" className="send-icon">
                                <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845L1.101,21.757z"></path>
                            </svg>
                        </button>
                    </footer>





                </div>








            </div>


        </div>
    );

    
}