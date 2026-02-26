
import { useState, useEffect } from 'react'; 
import { Routes, Route, useNavigate, Navigate} from 'react-router-dom';

//  🏛️ Cofre Central (AutenticacaoContexto)
import { useAuth } from './AutenticacaoContexto';

import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig.js';


import './App.css';


// 🧱 Os Cômodos (Componentes)
import { Inicio } from './Inicio';
import { Sobre } from './Sobre'; 
import { Contato } from './Contato';

import { Logar } from './Logar';
import { Cadastrar } from './Cadastrar';

import { Logado } from './Logado';
import { Diretrizes } from './Diretrizes';


import { UsuarioIdentificacao } from './UsuarioIdentificacao'; 
import { UsuarioContato } from './UsuarioContato';

import { Endereco } from './Endereco';
import { Cnpj } from './Cnpj';
import { Formacao } from './Formacao';
import { UsuarioReferencias } from './UsuarioReferencias';


import { CadAdministrador } from './CadAdministrador';
import { ListaUsuarios } from './ListaUsuarios';
import { ListaUsuariosToken } from './ListaUsuariosToken';



import { RelClientes } from './RelClientes';
import { RelCuidadoras } from './RelCuidadoras';
import { RelSolicitacoes } from './RelSolicitacoes';


/* // 🛠️ Importação dos novos componentes de cards de pacientes */
import { PacienteApresentacaoEmpresa } from './PacienteApresentacaoEmpresa';
import { PacienteIdentificacao } from './PacienteIdentificacao';
import { PacienteEndereco } from './PacienteEndereco';
import { PacienteAlimentacao } from './PacienteAlimentacao';
import { PacienteBanho } from './PacienteBanho';
import { PacienteEmergencia } from './PacienteEmergencia';


import { ClienteSolicitacao } from './ClienteSolicitacao';


import { PainelMaster } from './PainelMaster';

import { CardTerceiros } from './CardTerceiros';
import { TestePermissao } from './TestePermissao';
import { TestePermissaoMelhor } from './TestePermissaoMelhor';
import { ListaUsuariosPublico } from './ListaUsuariosPublico';

import { Notificacoes } from './Notificacoes';
import { Chamados } from './Chamados';
import { Chat } from './Chat';


import { BalaoDica } from './componentes/BalaoDica';

import {BalaoDicaMenuHamburguer} from './BalaoDicaMenuHamburguer';






const formatarCPF = (cpf) => {
    if (!cpf) return "000.000.000-00";
    /* Remove qualquer caractere que não seja número */
    const apenasNumeros = cpf.replace(/\D/g, "");
    /* Aplica a máscara usando Regex */
    return apenasNumeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};






export default function App() {











    // --------------------------------------
    // INICIO DO - Balao Dica Menu Hamburguer
    // --------------------------------------

    const [exibirBalaoDicaMenuHamburguer, setExibirBalaoDicaMenuHamburguer] = useState(() => {

        const valorInicial = false;
    
        console.log("");
        console.log("📐 🧿 ----------------------------------");
        console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        console.log("📐 🧿 Lazy Initialization - 🍔 exibirBalaoDicaMenuHamburguer");
        console.log("📐 🧿 🍔 exibirBalaoDicaMenuHamburguer nasceu como = ", valorInicial);
        console.log("📐 🧿 ----------------------------------");
    
        return valorInicial;

    });

    useEffect(() => {

        console.log("");
        console.log("✨ 🧿 ----------------------------------");
        console.log("✨ 🧿 useEffect() - Componente - 🧿 App.jsx.jsx");
        console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        console.log("✨ 🧿 🍔 exibirBalaoDicaMenuHamburguer = ", exibirBalaoDicaMenuHamburguer);
        console.log("✨ 🧿 ----------------------------------");
    
    }, [exibirBalaoDicaMenuHamburguer]);


    useEffect(() => {
        // 🕵️ Checa a chave única
        const jaViuGeral = localStorage.getItem("dicaMenuHamburguer_Vista_Global");
    
        if (!jaViuGeral) {
            const timer = setTimeout(() => {
                setExibirBalaoDicaMenuHamburguer(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setExibirBalaoDicaMenuHamburguer(false);
        }
        // ✨ Removido o dadosToken da monitoração, pois agora é independente de usuário
    }, []);

    // --------------------------------------
    // FIM DO - Balao Dica Menu Hamburguer
    // --------------------------------------







    const navigate = useNavigate();








    // --------------------------------------------------------------
    // INICIO DO - Importacoes do componente AutenticacaoContexto.jsx
    // --------------------------------------------------------------

    const { 

        carregandoModal, 
        dadosToken, 
        carregandoPermissoesFireBase, 
        onClickSair, 
        socket 

    } = useAuth();

    // --------------------------------------------------------------
    // FIM DO - Importacoes do componente AutenticacaoContexto.jsx
    // --------------------------------------------------------------



   






    // ----------------------------------------
    // INICIO DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------

    const [statusIntegridadeBanco, setStatusIntegridadeBanco] = useState(() => {

        const valorInicial = "verificando"; 
        
        // console.log("");
        // console.log("📐 🧿 ----------------------------------");
        // console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        // console.log("📐 🧿 Lazy Initialization - 🛡️ statusIntegridadeBanco");
        // console.log("📐 🧿 🛡️ statusIntegridadeBanco nasceu como = ", valorInicial);
        // console.log("📐 🧿 ----------------------------------");
        
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🧿 ----------------------------------");
        // console.log("✨ 🧿 useEffect() - componente - 🧿 App.jsx");
        // console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧿 🛡️ statusIntegridadeBanco = ", statusIntegridadeBanco);
        // console.log("✨ 🧿 ----------------------------------");

    }, [statusIntegridadeBanco]);

    // ----------------------------------------
    // FIM DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------
   












    // -------------------------------------------------------------
    // INICIO - 🍔 EXIBE DICA PARA MENU HAMBURGUER
    // -------------------------------------------------------------

    const [exibirDica, setExibirDica] = useState(() => {

        const exibirDicaStorage = localStorage.getItem('dicaMenuExibida');

        // se localstorange nao existe exibir diga nasce true
        const valorInicial = exibirDicaStorage !== "true";

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🧿 App.jsx");
        // console.log("📐 Lazy Initialization - 💬 exibirDica");
        // console.log("📐 💬 exibirDica nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");
        
        return valorInicial;

    });

    // ✨ Dispara sempre que 'exibirDica' mudar de fato
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - componente - 🧿 App.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 💬 exibirDica = ", exibirDica);
        // console.log("✨ ----------------------------------");

    }, [exibirDica]); 

    useEffect(() => {

        const jaViuADica = localStorage.getItem('dicaMenuExibida');

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useState() - componente - 🧿App.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🎟️ dadosToken?.func = ", dadosToken?.func);
        // console.log("✨ ----------------------------------");
    
        // 🧱 Se logou (deixou de ser visitante), a dica morre na hora
        if (dadosToken?.func !== 'visitante') {

            setExibirDica(false);

            // console.log("✨ 🛑 Variavel - ExibirDica - atualida para - setExibirDica(false)");
            // console.log(`✨ 🛑 Variavel - ExibirDica - Estado antes da re-renderização: ${exibirDica}`);

        } 
        // 🧱 Se é visitante e ainda não viu, garante que a dica apareça
        else if (!jaViuADica) {

            setExibirDica(true);

            // console.log("✨ 🟢 Variavel - ExibirDica - atualida para - setExibirDica(true)");
            // console.log(`✨ 🟢 Variavel - ExibirDica - Estado antes da re-renderização: ${exibirDica}`);

        }

    }, [dadosToken?.func]); 

    // 🧱 Função para quando o usuário clicar no Menu
    const handleFecharDicaClickMenu = () => {

        setExibirDica(false);

        localStorage.setItem('dicaMenuExibida', 'true');

        // console.log("");
        // console.log("🔇 ----------------------------------");
        // console.log("🔇 componente - 🧿 App.jsx");
        // console.log("🔇 cliquei no menu hamburguer");
        // console.log("🔇 const handleFecharDicaClickMenu = () => {");
        // console.log("🔇 ----------------------------------");
        // console.log("🔇 COMANDOS EXECUTADOS AQUI");
        // console.log("🔇 setExibirDica(false)");
        // console.log("🔇 localStorage.setItem('dicaMenuExibida', 'true');");
        // console.log("🔇 ----------------------------------");

    };

    // -------------------------------------------------------------
    // FIM - 🍔 EXIBE DICA PARA MENU HAMBURGUER
    // -------------------------------------------------------------














    // -------------------------------------------------------------
    /* INICIO - 🛠️ VERIFICA PREENCHIDOS DE TODOS OS FORMS DO PERFIL
    // -------------------------------------------------------------

    /* 🛠️ Ferramenta de Trabalho para o status de integridade dos 3 cards */
    const [statusCards, setStatusCards] = useState({
        identificacao: false,
        contato: false,
        endereco: false,
        cnpj: false,
        formacao: false
    });

    /* 🔍 Fiscalização Geral: Verifica se absolutamente todos os cards estão true */
    const perfilEstaCompleto = Object.values(statusCards).every(status => status === true);

    useEffect(() => {

        /* // 🧱 Só inicia a vigilância se tivermos o CPF e a conexão com o banco */
        if (!dadosToken?.cpef || !db_realtime) return;

        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);

        /* // 📡 Vigilância em tempo real na Antena Central */
        const desativarVigilancia = onValue(caminhoNoBanco, (snapshot) => {

            if (snapshot.exists()) {

                const dados = snapshot.val();
                

                const identificacaoNoBanco = dados;
                const temIdentificacao = !!(
                    identificacaoNoBanco?.cpef?.trim() &&
                    identificacaoNoBanco?.nome?.trim() && 
                    identificacaoNoBanco?.func?.trim() &&
                    identificacaoNoBanco?.senh?.trim()  
                );


                const contatoNoBanco = dados;
                const temContato = !!(
                    contatoNoBanco?.mail?.trim() &&
                    contatoNoBanco?.fone?.trim()  
                );


                const enderecoNoBanco = dados.ende;
                const temEndereco = !!(
                    enderecoNoBanco?.cepe?.trim() &&
                    enderecoNoBanco?.ruaa?.trim() && 
                    enderecoNoBanco?.nume?.trim() && 
                    enderecoNoBanco?.bair?.trim() && 
                    enderecoNoBanco?.cida?.trim() &&
                    enderecoNoBanco?.esta?.trim()
                );


                const cnpjNoBanco = dados.cnpj_dados;
                const temCnpj = !!(cnpjNoBanco?.num_cnpj?.trim());


                const formacaoNoBanco = dados.formacao_dados;
                const temFormacao = !!(
                    formacaoNoBanco?.nivel?.trim() && 
                    formacaoNoBanco?.espec?.trim() && 
                    formacaoNoBanco?.reg?.trim() &&
                    formacaoNoBanco?.inst?.trim()
                );


                /* // ⚡ Atualiza o estado triplo */
                setStatusCards(prev => ({
                    ...prev,
                    identificacao: temIdentificacao,
                    contato: temContato,
                    endereco: temEndereco,
                    cnpj: temCnpj,
                    formacao: temFormacao
                }));

            } else {
            
                setStatusCards({
                    identificacao: false,
                    contato: false,
                    endereco: false,
                    cnpj: false,
                    formacao: false
                });

            }
            
        });

        return () => desativarVigilancia();

    }, [dadosToken?.cpef, db_realtime]);

    // -------------------------------------------------------------
    /* FIM - 🛠️ VERIFICA CAMPOS PREENCHIDOS NO PERFIL (RESTRITO) */
    // -------------------------------------------------------------















    // -------------------------------------------------------------
    /* INICIO - 🛠️ VIGILÂNCIA DE INTEGRIDADE DOS CARDS DE PACIENTE */
    // -------------------------------------------------------------

    /* // 🛠️ Ferramenta de Trabalho para o status de integridade dos cards de paciente */
    const [statusPaciente, setStatusPaciente] = useState({
        identificacao: false,
        endereco: false,
        alimentacao: false,
        banho: false,
        emergencia: false
    });

    /* // 🔍 Fiscalização Geral: Verifica se todos os cards do paciente estão true */
    const pacienteEstaCompleto = Object.values(statusPaciente).every(status => status === true);

    useEffect(() => {

        /* // 🧱 Só inicia a vigilância se tivermos o CPF do paciente e conexão */
        if (!dadosToken?.cpef || !db_realtime) return;

        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}`);

        /* // 📡 Vigilância na Antena Central dos Pacientes */
        const desativarVigilancia = onValue(caminhoNoBanco, (snapshot) => {

            if (snapshot.exists()) {

                const dados = snapshot.val();




                const identificacaoNoBanco = dados.identificacao;
                const temIdentificacao = !!(
                    identificacaoNoBanco?.nome?.trim() &&
                    identificacaoNoBanco?.idade?.trim()
                );


            

                const enderecoNoBanco = dados.endereco;
                const temEndereco = !!(
                    enderecoNoBanco?.cepe?.trim() &&
                    enderecoNoBanco?.ruaa?.trim() && 
                    enderecoNoBanco?.nume?.trim() && 
                    enderecoNoBanco?.bair?.trim() && 
                    enderecoNoBanco?.cida?.trim() &&
                    enderecoNoBanco?.esta?.trim()
                );






                const alimentacaoNoBanco = dados.alimentacao;
                const temAlimentacao = !!(
                    alimentacaoNoBanco?.cafe?.trim() &&
                    alimentacaoNoBanco?.almoco?.trim() &&
                    alimentacaoNoBanco?.jantar?.trim()
                );


                /* 2. Validação para Banho */
                const banhoNoBanco = dados.banho;
                const temBanho = !!(
                    banhoNoBanco?.horarioManha?.trim() &&
                    banhoNoBanco?.horarioTarde?.trim() && 
                    banhoNoBanco?.observacao?.trim()
                );



                const emergenciaNoBanco = dados.emergencia;
                const temEmergencia = !!(
                    emergenciaNoBanco?.nomeContato?.trim() &&
                    emergenciaNoBanco?.telefoneContato?.trim() &&
                    emergenciaNoBanco?.parentesco?.trim() &&
                    emergenciaNoBanco?.observacao?.trim()
                );




                /* // ⚡ Atualiza o estado de todos os cards de uma vez */
                setStatusPaciente({
                    identificacao: temIdentificacao,
                    endereco: temEndereco,
                    alimentacao: temAlimentacao,
                    banho: temBanho,
                    emergencia: temEmergencia
                });

            } else {
                
                /* // 🧹 Reseta se o registro não for encontrado */
                setStatusPaciente({
                    identificacao: false,
                    endereco: false,
                    alimentacao: false,
                    banho: false,
                    emergencia: false
                });

            }
        });

        return () => desativarVigilancia();

    }, [dadosToken?.cpef, db_realtime]);

    // -------------------------------------------------------------
    /* FIM - 🛠️ VIGILÂNCIA DE INTEGRIDADE DOS CARDS DE PACIENTE */
    // -------------------------------------------------------------












    // ------------------------------------
    // INICIO DO - SUBMENU (Sanfona) -  ainda nao tenho
    // ------------------------------------

    // 🚪 Controle da Gaveta e Submenus
    const [menuAberto, setMenuAberto] = useState(false);
    const [secaoAberta, setSecaoAberta] = useState(null); 
    const [travado, setTravado] = useState(false);

    /* 🛠️ Sensor para recolher o menu ao clicar fora */
    useEffect(() => {

        const clicarFora = (event) => {

            if (menuAberto && !event.target.closest('.Container-Menu-Mestre')) {

                setMenuAberto(false);
                setSecaoAberta(null);

            }

        };

        document.addEventListener('mousedown', clicarFora);

        return () => document.removeEventListener('mousedown', clicarFora);

    }, [menuAberto]);

    // 🛠️ Função Mestra de Navegação - MENU E SUBMENU
    const navegarERecolher = (rota) => {

        setTravado(true); 
        setMenuAberto(false);
        setSecaoAberta(null);

        if (rota) {
            navigate(rota);
        }

        // Libera a interface após a poeira baixar (500ms)
        setTimeout(() => {
            setTravado(false);
            console.log("📐 🔵 UI: Interface destravada.");
        }, 500);

    };

    // 🛠️ Alternador de Seções (Accordion Logic)
    const abrirSecao = (nomeSecao) => {

        setMenuAberto(true); 
        setSecaoAberta(nomeSecao);

    };

    /* // 🧱 Se você usa uma função externa, faça assim: */
    const lidarComClique = (secao) => {

        if (!perfilEstaCompleto) {

            setSecaoAberta(null); 
            return;

        }

        setSecaoAberta(secaoAberta === secao ? null : secao);

    };

    // ------------------------------------
    // FIM DO - SUBMENU (Sanfona) -  ainda nao tenho
    // ------------------------------------












    // -------------------------------------------------------------
    /* INICIO DO - 📡 Monitora sinal de internet e do 🔥 FIREBASE */
    // -------------------------------------------------------------

    /* // 📡 Sensor 1: Sinal de Rede do Navegador */
    const [sinalInternet, setSinalInternet] = useState(navigator.onLine);

    /* // 🔥 Sensor 3: Conexão com o Banco de Dados (Firebase) */
    const [sinalFirebase, setSinalFirebase] = useState(false);

    useEffect(() => {

        /* 📡 sinal de internet */

        const verificarSinalInternet = () => {
        
            setSinalInternet(navigator.onLine);

            // console.log("");
            // console.log("🌐 ----------------------------------");
            // console.log(`🌐 SinalInternet atualizado para: ${navigator.onLine}`);
            // console.log("🌐 ----------------------------------");

        };

        verificarSinalInternet();

        window.addEventListener('online', verificarSinalInternet);
        window.addEventListener('offline', verificarSinalInternet);

        /* 🔥 FIREBASE (REALTIME DATABASE) 🔥 --- */
       
        const connectedRef = ref(db_realtime, ".info/connected");

        const pararDeOuvirFirebase = onValue(connectedRef, (dados) => {

            const sinalrealtimeFirebase = dados.val() === true; 

            setSinalFirebase(sinalrealtimeFirebase);

            // console.log("");
            // console.log("🔥 ----------------------------------");
            // console.log("🔥 SinalFirebase estabelecido com a nuvem!");
            // console.log("🔥 🧠 Gerente 🔄 Atualizou o Estado da 📂(gaveta)");
            // console.log("🔥 setSinalFirebase()");
            // console.log(`🔥 Atualizado para: ${sinalrealtimeFirebase}`);
            // console.log("🔥 ----------------------------------");

        });

        return () => {


            pararDeOuvirFirebase();

            window.removeEventListener('online', verificarSinalInternet);
            window.removeEventListener('offline', verificarSinalInternet);

        };

    }, [dadosToken, navigate]);

    // -------------------------------------------------------------
    /* FIM DO - 📡 Monitora sinal de internet e do 🔥 FIREBASE */
    // -------------------------------------------------------------











    // -------------------------------------------------------------
    /* INICIO DO - MODAL 🔥 FIREBASE */
    // -------------------------------------------------------------

    if (carregandoPermissoesFireBase) {
        return (
            <div className="modal-overlay-projeto">
                <div className="card-loading-moderno">
                    <div className="spinner-dual-ring"></div>
                    <h3 className="titulo-loading">✨ Aguarde...</h3>
                    <p className="subtitulo-loading">Validando acessos à sua área interna.</p>
                    <div className="barra-progresso-container">
                        <div className="barra-progresso-infinita"></div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    /* FIM DO - MODAL 🔥 FIREBASE */
    // -------------------------------------------------------------





    



    





    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (



        /* 🛡️ CONTAINER-EXTERNO-BLINDADO */
        <div className="container-externo-blindado" data-func={dadosToken?.func}>







        










            {/* 🧱 Se carregando for true, o modal trava a tela */}
            {carregandoModal && (
                <div className="modal-overlay-projeto">
                    <div className="card-loading-moderno">
                        <div className="spinner-dual-ring"></div>
                        <h3 className="titulo-loading">Aguarde...</h3>
                        <p className="subtitulo-loading">Validando acessos à sua area interna.</p>
                        <div className="barra-progresso-container">
                            <div className="barra-progresso-infinita"></div>
                        </div>
                    </div>
                </div>
            )}






            {/* 🏗️ VIGA MESTRA (Controle Superior) */}
            <header className="header-container">






                {/* 🖼️ NUCLEO-IDENTIDADE (Extrema Esquerda) */}
                <div className="header-Logo" onClick={() => navigate('/')}>
                    <img className="Imagem-Logotipo"  src="/imagens/LogoSVG6.png" alt="Logo" />
                </div>













                {/* -------------------------------------------------------------------- */}
                {/* IICIO do -🍔 Menu Hamburguer Animado com Sinalização para Visitante */ }
                {/* -------------------------------------------------------------------- */}

                <BalaoDicaMenuHamburguer 
                    exibirBalaoDicaMenuHamburguer={exibirBalaoDicaMenuHamburguer}
                    setExibirBalaoDicaMenuHamburguer={setExibirBalaoDicaMenuHamburguer}
                    dadosToken={dadosToken}
                    /* ✨ Ação Única: Grava um visto geral que serve para todos */
                    acaoAbrirMenu={() => {
                        // 1. Abre o menu 🍔
                        setSecaoAberta('menu-aberto');

                        // 2. 🔐 Lacre Global: Chave única, sem CPF
                        const chaveGlobal = "dicaMenuHamburguer_Vista_Global";

                        // 3. ✍️ Grava o visto definitivo no navegador
                        localStorage.setItem(chaveGlobal, "sim");

                        // 4. 🔵 Esconde o balão
                        setExibirBalaoDicaMenuHamburguer(false);

                        console.log("📐 🔵 Lacre Global realizado. Dica desativada para este navegador.");
                    }}
                    secaoAberta={secaoAberta} 
                    setSecaoAberta={setSecaoAberta} 
                />

                {/* -------------------------------------------------------------------- */}
                {/* FIM do -🍔 Menu Hamburguer Animado com Sinalização para Visitante */ }
                {/* -------------------------------------------------------------------- */}












             

                {/* ---------------------------------- */}
                {/* IICIO do -🍔 Menu Hamburguer Animado com Sinalização para Visitante */ }
                {/* ---------------------------------- */}

                {/* <div className="MenuHamburgerTudo">

                    <div className="MenuHamburger">
                        <div className="bar"></div>
                    </div> */}

                    {/* Balão de orientação visual para o primeiro acesso */}
                    {/* {exibirDica && (
                        <div className="BalaoDicaVisitante">
                            👋 Toque aqui para navegar!
                        </div>
                    )} */}

                {/* </div> */}

                {/* ---------------------------------- */}
                {/* FIM do -🍔 Menu Hamburguer Animado com Sinalização para Visitante */ }
                {/* ---------------------------------- */}














                {/* ---------------------------------- */}
                {/* INICIO do - 🔩 Conteiner geral individualizado*/}
                {/* ---------------------------------- */}

                <div 
                    className={`submenu-container-geral ${secaoAberta === 'menu-aberto' ? 'menu-mobile-ativo' : ''}`}
                >

                    {dadosToken?.func === 'programador' && (
                        <>
                            <div 
                                className="submenu-tudo"
                                onMouseEnter={() => setSecaoAberta('cadastrar-administrador')}
                                onMouseLeave={() => {
                                    if (secaoAberta !== null) {
                                        setSecaoAberta('aberto');
                                    }
                                }}
                            >
                                <button className="Botao-menu">
                                    Cadastrar
                                </button>
                                
                                {secaoAberta === 'cadastrar-administrador' && (

                                    <div className="submenu-flutuante">

                                        <button 
                                            onClick={() => navegarERecolher('/interno/CadAdministrador')}
                                        >
                                            Administrador
                                        </button>

                                    </div>

                                )}

                            </div>

                            <button onClick={() => navegarERecolher('/ListaUsuarios')}>Usuarios</button>
                            <button onClick={() => navegarERecolher('/ListaUsuariosToken')}>Token</button>

                        </>
                    )}


                    {dadosToken?.func === 'administrador' && (
                        <>
                            <div 
                                className="submenu-tudo"
                                onMouseEnter={() => setSecaoAberta('relatorio')}
                                onMouseLeave={() => {
                                    if (secaoAberta !== null) {
                                        setSecaoAberta('aberto');
                                    }
                                }}
                            >
                                
                                <button 
                                    onClick={() => lidarComClique('relatorio')}
                                    disabled={!perfilEstaCompleto}
                                    className={perfilEstaCompleto ? "BotaoAtivo" : "BotaoBloqueado"}
                                >
                                    Relatorio
                                </button>
                                
                                {secaoAberta === 'relatorio' && perfilEstaCompleto && (

                                    <div className="submenu-flutuante">

                                        <button onClick={() => navegarERecolher('/interno/RelCuidadoras')}>Cuidadoras</button>
                                        <button onClick={() => navegarERecolher('/interno/RelClientes')}>Clientes</button>
                                        <button onClick={() => navegarERecolher('/interno/RelSolicitacoes')}>Solicitações</button>

                                    </div>

                                )}

                            </div>
                        
                        </>
                    )}

                    
                    {dadosToken?.func === 'visitante' && (
                        <>
                            <button className="Botao-Menu-Geral-Visitante" onClick={() => navegarERecolher('/')}>Início</button>
                            <button className="Botao-Menu-Geral-Visitante" onClick={() => navegarERecolher('/Sobre')}>Sobre</button>
                            <button className="Botao-Menu-Geral-Visitante" onClick={() => navegarERecolher('/Contato')}>Contato</button>


                            <button className="Botao-Lista-Publica" onClick={() => {
                                console.log("");
                                console.warn(" ----------------------------");
                                console.warn(" Botão ListaUsuariosPublico");
                                console.warn(" ----------------------------");
                                navegarERecolher('/ListaUsuariosPublico');
                            }}>
                                Lista Publica
                            </button>


                            
                        </>
                    )}

                    
                    {dadosToken?.func === 'cuidadora' && (
                        <>
                            <button onClick={() => navegarERecolher('/interno/Diretrizes')}>Diretrizes</button>
                            <button onClick={() => navegarERecolher('/interno/Chamados')}>Chamados</button>
                            {/* <button onClick={() => navegarERecolher('/interno/Mensagem')}>Mensagem</button> */}
                        </>
                    )}

    
                    {dadosToken?.func === 'cliente' && (
                        <>
                            <button 
                                className="btn-apresentacao-empresa" 
                                onClick={() => navegarERecolher('/interno/PacienteApresentacaoEmpresa')}
                            >
                                Apresentação
                            </button>

                            <button onClick={() => navegarERecolher('/interno/Diretrizes')}>Diretrizes</button>

                            <button 
                                onClick={() => navegarERecolher('/interno/ClienteSolicitacao')}
                                disabled={!pacienteEstaCompleto || !perfilEstaCompleto}
                                className={pacienteEstaCompleto && perfilEstaCompleto ? "BotaoAtivo" : "BotaoBloqueado"}
                            >
                                Solicitação
                            </button>


                            <div 
                                className="submenu-tudo"
                                onMouseEnter={() => abrirSecao('cadastro-paciente')}
                                onMouseLeave={() => {
                                    if (secaoAberta !== null) {
                                        setSecaoAberta('aberto');
                                    }
                                }}
                            >
                                <button className="Botao-submenu">
                                    Paciente
                                    {pacienteEstaCompleto ? " ✔️" : " ❌"}
                                </button>
                                
                                {secaoAberta === 'cadastro-paciente' && (


                                    <div className="submenu-flutuante">

                                        <button 
                                            onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}
                                        >
                                            Identificação
                                            {statusPaciente.identificacao ? " ✔️" : " ❌"}
                                        </button>

                                        <button 
                                            onClick={() => navegarERecolher('/interno/PacienteEndereco')}
                                        >
                                            Endereço
                                            {statusPaciente.endereco ? " ✔️" : " ❌"}
                                        </button>

                                        <button 
                                            onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}
                                        >
                                            Alimentação
                                            {statusPaciente.alimentacao ? " ✔️" : " ❌"}
                                        </button>

                                        <button 
                                            onClick={() => navegarERecolher('/interno/PacienteBanho')}
                                        >
                                            Banho
                                            {statusPaciente.banho ? " ✔️" : " ❌"}
                                        </button>

                                        <button 
                                            onClick={() => navegarERecolher('/interno/PacienteEmergencia')}
                                        >
                                            Emergência
                                            {statusPaciente.emergencia ? " ✔️" : " ❌"}
                                        </button>

                                    </div>


                                )}
                            </div>

                        </>
                    )}

                </div>

                {/* ---------------------------------- */}
                {/* FIM do - 🔩 Conteiner geral individualizado */}
                {/* ---------------------------------- */}













                {/* // ------------------------------------------------- */}
                {/* 🔘 SUBMENU FLUTUANTE DE PERFIL (Abertura por Clique) */}
                {/* // ------------------------------------------------- */}

                {dadosToken?.func !== 'visitante' ? (


                    // ---------------------------------------------------
                    // INICIO - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL
                    // ---------------------------------------------------

                    <div className="submenu-container-perfil">





                        {/* BOTAO CHAT */}
                        <div 
                            className="Botao-Chat" 
                            onClick={() => {
                                console.log("");
                                console.warn(" ----------------------------");
                                console.warn(" Botão Botao-Chat");
                                console.warn(" ----------------------------");
                                navigate('/interno/Chat'); 
                            }}
                        >
                            <img 
                                className="Img-Chat-Icone" 
                                alt="Chat"
                                src="/imagens/chat.png"    
                            />
                        </div>









                        
                        {/* INICIO - BOTAO MEU PERFIL */}
                        <button 
                            className={`Botao-Acao-Meu-Perfil ${secaoAberta === 'perfil' ? 'Ativo' : ''}`}
                            onClick={() => setSecaoAberta(secaoAberta === 'perfil' ? null : 'perfil')}
                        >
                            <div className="Avatar-Circulo">
                                {dadosToken?.nome ? dadosToken.nome.charAt(0).toUpperCase() : "?"}
                            </div>
                            <span>Meu Perfil</span>
                            <span className={`Seta-Drop ${secaoAberta === 'perfil' ? 'Aberta' : ''}`}>▼</span>
                        </button>
                        {secaoAberta === 'perfil' && (
                            <div className="Cortina-Fechar" onClick={() => setSecaoAberta(null)} />
                        )}




                        {/* INICIO DO - SUB MENU - DADOS DO USUARIO */}

                        <div className={`SubmenuFlutuante-Estilizado ${secaoAberta === 'perfil' ? 'Ativo' : ''}`}>
                            
                            <div className="Header-Menu-Perfil">
                                <strong>{dadosToken?.nome || "Usuário"}</strong>
                                <span>{formatarCPF(dadosToken?.cpef)}</span>
                            </div>

                            <div className="Divisor-Menu" />

                            <div className="Header-Funcao">
                                <span>Função/Permissão:</span>
                                <strong>{dadosToken?.func}</strong>   
                            </div>


                            {/* PROGRAMADOR - NAO PRECISA PREENCHER DADOS PESSOAIS */}
                            {dadosToken?.func !== 'programador' && (
                                <>



                                    <div className="Divisor-Menu" />


                                    {/* ADMINISTRADOR - PRECISA PREENCHER NOME E SENHA */}
                                    {(dadosToken?.func === 'administrador' && dadosToken?.nome === '') && (
                                        <>

                                            <button onClick={() => navegarERecolher('/interno/UsuarioIdentificacao')}>
                                                Identificação {statusCards.identificacao ? "✔️" : "❌"}
                                            </button>

                                        </>
                                    )}


                                   
                                    <button onClick={() => navegarERecolher('/interno/UsuarioContato')}>
                                        Contato {statusCards.contato ? "✔️" : "❌"}
                                    </button>
                                    <button onClick={() => navegarERecolher('/interno/Endereco')}>
                                        Endereço {statusCards.endereco ? "✔️" : "❌"}
                                    </button>




                                    


                                    {dadosToken?.func !== 'cliente' && (
                                        <>
                                            <button onClick={() => navegarERecolher('/interno/Cnpj')}>
                                                CNPJ {statusCards.cnpj ? "✔️" : "❌"}
                                            </button>
                                            <button onClick={() => navegarERecolher('/interno/Formacao')}>
                                                Formação {statusCards.formacao ? "✔️" : "❌"}
                                            </button>
                                        </>
                                    )}


                                </>
                            )}








                            {/* BOTAO SAIR - PARA TODOS O USUARIOS */}
                            <div className="Divisor-Menu" />

                            <button 
                                className="Botao-Acao-Sair" 
                                onClick={() => { 
                                    onClickSair(); 
                                    navegarERecolher('/'); 
                                }}
                            >
                                Sair
                            </button>

                           






                            {/* ------------------------------------ */}
                            {/* MEUS TESTES DE PERMISSAO NO FIREBASE */}
                            {/* ------------------------------------ */}

                            <div className="Divisor-Menu" />
                           
                            {/* <button onClick={() => {

                                console.log("");
                                console.error(" --------------------------------------------------");
                                console.error(" Botão (Teste Permissao) clicado! Indo para componente");
                                console.error(" --------------------------------------------------");

                                navegarERecolher('/interno/TestePermissao');
                                }}>
                                Teste Permissao
                            </button> */}




                            <button onClick={() => {

                                console.log("");
                                console.error(" --------------------------------------------------");
                                console.error(" Botão (Teste Permissao) clicado! Indo para componente");
                                console.error(" --------------------------------------------------");

                                navegarERecolher('/interno/TestePermissaoMelhor');
                                }}>
                                Teste Permissao
                            </button>





                        </div>

                        {/* FIM DO - SUB MENU - DADOS DO USUARIO */}




                    </div>

                    // ---------------------------------------------------
                    // FIM - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL
                    // ---------------------------------------------------


                ) : (
                    
                    // ------------------------------------
                    // INICIO - PARA VISITANTES - ENTRAR OU CADASTRAR
                    // ------------------------------------

                    <div className="submenu-container-visitante">
                        <button className="Botao-Acao-Visitante-Perfil" onClick={() => navegarERecolher('/Cadastrar')}>
                            <span>Criar Conta</span>
                        </button>
                        <button className="Botao-Acao-Visitante-Perfil" style={{ width: '90px'}} onClick={() => navegarERecolher('/Logar')}>
                            <span>Entrar</span>
                        </button>
                    </div>

                    // ------------------------------------
                    // FIM - PARA VISITANTES - ENTRAR OU CADASTRAR
                    // ------------------------------------


                )}




             


            </header>











            {/* 🧱 AREA-PALCO: Onde os CARDS brilham */}
            <main className="main-area-principal">

            <div className="header-spacer"></div>

                <Routes>





                    {/* 🌍 Rotas Públicas */}
                    <Route 
                        path="/" 
                        element={
                            <Inicio 
                                exibirDica={exibirDica} 
                            />
                        } 
                    />

                    <Route path="/sobre" element={<Sobre />} /> 
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/logar" element={<Logar socket={socket} />} />
                    <Route path="/cadastrar" element={<Cadastrar socket={socket} />} />


                    <Route
                        
                        path="ListaUsuariosPublico" 
                        element={<ListaUsuariosPublico />} 
                    
                    />
                 









                    {/* 🛠️ Rotas de Administração Técnica (Programador) */}
                    <Route 
                        path="/ListaUsuarios" 
                        element={
                            dadosToken?.func === 'programador' ? (
                                <ListaUsuarios />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />


                    <Route 
                        path="/ListaUsuariosToken" 
                        element={
                            dadosToken?.func === 'programador' ? (
                                <ListaUsuariosToken />
                            ) : (
                                /* // 🚀 Se o token expirar e ele virar visitante, a mola dispara: */
                                <Navigate to="/" replace />
                            )
                        } 
                    />










                    {/* 🔐 Setor Privativo: Acesso condicionado ao fim do carregamento */}
                    <Route 
                        path="/interno/*" 
                        element={

                            carregandoModal ? null :

                            dadosToken?.func && dadosToken.func !== 'visitante' ? (
                                <Logado 

                                // Não preciso disso mais, só vou de8ixar aqui para lembrar do aprendizado
                                    sinalInternet={sinalInternet}
                                    sinalFirebase={sinalFirebase}
                                    perfilEstaCompleto={perfilEstaCompleto} 
                                    pacienteEstaCompleto={pacienteEstaCompleto}

                                />
                            ) : (
                                <Navigate 

                                    to="/" replace 

                                />
                            )


                        } 
                    >












                        {/* 🚪 Sub-cômodos (Rotas Filhas de /interno) */}
                       
                        <Route path="UsuarioIdentificacao" element={<UsuarioIdentificacao />} />
                        <Route path="UsuarioContato" element={<UsuarioContato />} />
                        
                        <Route path="Endereco" element={<Endereco />} />
                        <Route path="Cnpj" element={<Cnpj />} />
                        <Route path="Formacao" element={<Formacao />} />
                        <Route path="UsuarioReferencias" element={<UsuarioReferencias />} />

                        <Route path="CadAdministrador" element={<CadAdministrador />} />
                        <Route path="diretrizes" element={<Diretrizes />} />
                        <Route path="Chamados" element={<Chamados />} />

                        <Route path="RelCuidadoras" element={<RelCuidadoras />} />
                        <Route path="RelClientes" element={<RelClientes />} />
                        <Route path="RelSolicitacoes" element={<RelSolicitacoes />} />
                        


                        
















                        {/* 🧱 Controle do Programador dentro do Interno */}
                        <Route 

                            path="PainelMaster" 
                            element={
                                dadosToken?.func === 'programador' ? (
                                    <PainelMaster />
                                ) : (
                                    <Navigate to="/interno" replace />
                                )
                            } 

                        />












                        {/* 🧱 Botoes texte - dentro do app.jsx */}

                        {/* <Route
                        
                            path="CardTerceiros" 
                            element={<CardTerceiros />} 
                            
                        /> */}
                 
                        <Route
                        
                            path="TestePermissao" 
                            element={<TestePermissao />} 
                        
                        />



                        <Route
                            
                            path="TestePermissaoMelhor" 
                            element={<TestePermissaoMelhor />} 
                        
                        />


                        <Route
                            
                            path="Notificacoes" 
                            element={<Notificacoes />} 
                        
                        />


                        <Route
                            
                            path="Chat" 
                            element={<Chat />} 
                        
                        />







                        {/* /* 🛣️ Definição de rotas para os setores de Pacientes */}
                        <Route path="PacienteApresentacaoEmpresa"element={<PacienteApresentacaoEmpresa />} />
                        <Route path="PacienteIdentificacao" element={<PacienteIdentificacao />} />
                        <Route path="PacienteEndereco" element={<PacienteEndereco />} />
                        <Route path="PacienteAlimentacao" element={<PacienteAlimentacao />} />
                        <Route path="PacienteBanho" element={<PacienteBanho />} />
                        <Route path="PacienteEmergencia" element={<PacienteEmergencia />} />
                        <Route path="ClienteSolicitacao" element={<ClienteSolicitacao />} />
                        





                    </Route>






                    {/* 🛡️ Trava de Segurança: Redireciona qualquer rota inexistente para o Início */}
                    <Route path="*" element={<Navigate to="/" />} />




                </Routes>

            </main>









        </div> /* FIM DO - 🛡️ CONTAINER-EXTERNO-BLINDADO */

    );

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */






} 

