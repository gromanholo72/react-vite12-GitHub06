
import { useState, useEffect, useRef } from 'react';

import { useNavigate, useLocation} from 'react-router-dom';

import { useAuth } from './AutenticacaoContexto.jsx';

import { BASE_URL_SERVIDOR } from './config/api.js';

import './Logar.css';





export function Logar() {



    // 🚕 Contratando o motorista para este cômodo
    const navigate = useNavigate();


    const { logarNoFirebase, setCarregandoModal } = useAuth();


    

    // 🧭 Sensor de localização
    const location = useLocation(); 
    /* // 🧱 Verifica se o usuário veio redirecionado do cadastro com sucesso */
    const veioDoCadastro = location.state?.cadastroSucesso;





    // const location = useLocation();
    // console.log("");
    // console.log("📡📻 ✈️ ----------------------------------");
    // console.log("📡📻 ✈️ Arquivo - Logar.jsx");
    // console.log("📡📻 ✈️ export function Logar()");
    // console.log("📡📻 ✈️Teste de Rádio:", socket);
    // console.log("📡📻 📍 Cômodo atual da 🏠 Casa:", location.pathname);
    // console.log("📡📻 ✈️ ----------------------------------");

    




    // ----------------------------------------------------------------------
    // INICIO DA - 🗂️ 🚨 GAVETA DE ALERTA: Para mostrar o erro na <div className="MsgForm">
    // ----------------------------------------------------------------------

    const timerGavetaRef = useRef(null);
    const [msgVisivel, setMsgVisivel] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const [tipoMsg, setTipoMsg] = useState("erro");

    const dispararMensagem = (texto, deveRedirecionar = false, dadoExtra = null, tipo = "erro") => {

        console.log("");
        console.log("🔫 ----------------------------------");
        console.log("🔫 Componente - Logar.jsx");
        console.log("🔫 const dispararMensagem = (texto, deveRedirecionar, dadoExtra, tipo) => {");
        console.log("🔫 📢 MENSAGEM DISPARADA");
        console.log("🔫 📝 Texto =", texto);
        console.log("🔫 🚀 Redirecionar =", deveRedirecionar);
        console.log("🔫 🎟️ dadoExtra =", dadoExtra);
        console.log("🔫 🎨 Tipo =", tipo);
        console.log("🔫 ----------------------------------");


        /* // 🧱 2. RESET DE OBRA: Se já existir um timer rodando, nós o cancelamos usando o .current */
        if (timerGavetaRef.current) {
            clearTimeout(timerGavetaRef.current);
        }

        setCarregandoModal(false);

        setTipoMsg(tipo);
        setMsgErro(texto);
        setMsgVisivel(true);
    
        /* 🚀 Localiza o container pela CLASSNAME e comanda a subida */
        const topo = document.querySelector('.container-externo-blindado');
        
        if (topo) {
            topo.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    
        /* 🚨 Reforço para garantir a subida no celular */
        window.scrollTo({ top: 0, behavior: 'smooth' });
    


        /* // 🧱 3. Guardamos o novo timer dentro do .current da referência */
        timerGavetaRef.current = setTimeout(() => {

            setMsgVisivel(false);

            setTimeout(() => { 

                setMsgErro(""); 

                if (deveRedirecionar) {

                    navigate('/interno', {

                        state: { 
                            
                            cadastroSucesso: true,
                            cpfVindoDoCadastro: dadoExtra

                        } 

                    });

                }

            }, 1000);


        }, 4000);


    };

    // ----------------------------------------------------------------------
    // FIM DA - 🗂️ 🚨 GAVETA DE ALERTA: Para mostrar o erro na <div className="MsgForm">
    // ----------------------------------------------------------------------










    //  --------------------------------------------------------------
    //  INICIO DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO LOGAR
    //  --------------------------------------------------------------

    const [credenciais, setCredenciais] = useState(() => {

        const valorInicial = {
            cpef: "",
            senh: ""
        };

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ Logar.jsx");
        // console.log("📐 Lazy Initialization - 📝 credenciais");
        // console.log("📐 📝 credenciais nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");

        return valorInicial;
    });

    // ✨ Dispara sempre que as 'credenciais' mudarem de fato
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - componente - 🏛️ Logar.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 📝 credenciais = ", credenciais);
        // console.log("✨ ----------------------------------");
    
    }, [credenciais]);

    //  --------------------------------------------------------------
    //  FIM DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO LOGAR
    //  --------------------------------------------------------------













    // ---------------------------------------------------------------------------
    // INICIO DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------

    const preencherCampos = (dadosVindosDoForm) => {

        // console.log("");
        // console.log("📇 ----------------------------------");
        // console.log("📇 componente - 🧿 App.jsx");
        // console.log("📇 preencherCampos = (dados vindo do CpefTextes)");
        // console.log("📇 essa funcao pertence a CpefTextes e na");
        // console.log("📇 na producao será substituida pelo");
        // console.log("📇 preenchimento dos inputs pelo usuario");
        // console.log("📇 👍 Dados preenchidos no Form:", dadosVindosDoForm);
        // console.log("📇 ----------------------------------");
        // console.log("📇 COMANDOS EXECUTADOS AQUI");
        // console.log("📇 setCredenciais(dadosVindosDoForm.cpef)");
        // console.log("📇 setCredenciais(dadosVindosDoForm.senh)");
        // console.log("📇 ----------------------------------");

        setCredenciais({
            cpef: dadosVindosDoForm.cpef,
            senh: dadosVindosDoForm.senh
        });

    };

    // ---------------------------------------------------------------------------
    // FIM DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------











    // monitora o trabalho manual (digitação) em tempo real.
    const handleChange = (e) => {

        const { name, value } = e.target;

        setCredenciais(prev => ({ ...prev, [name]: value }));

    };











    useEffect(() => {

        if (location.state?.cpfVindoDoCadastro) {

            console.log("");
            console.log("✨ ----------------------------------");
            console.log("✨ useEffect() - componente -  Logar.jsx");
            console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
            console.log("✨ 🕶️ location.state = ", location.state);
            console.log("✨ 🕶️ ----------------------------------");
            console.log("✨ 🕶️ 📦 CPF recebido do cadastro:", location.state.cpfVindoDoCadastro);
            console.log("✨ 🕶️ ----------------------------------");
            
            setCredenciais(prev => ({

                ...prev,
                cpef: location.state.cpfVindoDoCadastro

            }));

        }

    }, [location.state]);












    const enviarDadosLoginParaServidor = async (e) => {

        if (e) e.preventDefault(); 

        setCarregandoModal(true);

        setMsgVisivel(false);

        try {

            // 🧱 Fazendo a chamada para o seu servidor Node
            const resposta = await fetch(`${BASE_URL_SERVIDOR}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciais),
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                /* // 🧱 1. Autenticação oficial no Firebase */
                if (resultado.firebaseToken) {

                    try {

                        // console.log("");
                        // console.warn("🔄 ----------------------------------");
                        // console.warn("🔄 Componente - Logar.jsx");
                        // console.warn("🔄 onSubmit={enviarDadosLoginParaServidor}");
                        // console.warn("🔄 const enviarDadosLoginParaServidor = async (e) => {");
                        // console.warn("🔄 📦 Retorno do servidor = ", resultado);
                        // console.warn("🔄 ----------------------------------");
                        // console.warn("🔄 🔥 signInWithCustomToken(auth, resultado.firebaseToken);");
                        // console.warn("🔄 🔥 ✅ PASSO 1: Firebase autenticado!");
                        // console.warn("🔄 🔥 ----------------------------------");

                        await logarNoFirebase(resultado.firebaseToken);

                        setCarregandoModal(false);

                        navigate('/interno');

                    } catch (fbError) {

                        // console.log("");
                        // console.error("🔄 ----------------------------------");
                        // console.error("🔄 Componente - Logar.jsx");
                        // console.error("🔄 onSubmit={enviarDadosLoginParaServidor}");
                        // console.error("🔄 const enviarDadosLoginParaServidor = async (e) => {");
                        // console.error("🔄 ✅ Login autorizado! Atualizando os cards...");
                        // console.error("🔄 📦 Conteudo completo dodos dados do ");
                        // console.error("🔄 📦 usuario enviado para o servidor:");
                        // console.error("🔄 📦 resultado (retorno) = ", resultado);
                        // console.error("🔄 ----------------------------------");
                        // console.error("🔄 🔥 📡 Ação: signInWithCustomToken()");
                        // console.error("🔄 🔥 🆔 Código do Erro: ", fbError.code);
                        // console.error("🔄 🔥 📝 Mensagem: ", fbError.message);
                        // console.error("🔄 🔥 🧱 Stack: ", fbError.stack);
                        // console.error("🔄 🔥 ----------------------------------");

                        setTimeout(() => {

                            dispararMensagem("Erro na validação de segurança. Tente novamente.");
                            
                        }, 500)

                    }

                }

            } else {

                setTimeout(() => {
        
                    dispararMensagem(resultado.erro);

                }, 500)

            }

        } catch (error) {

            setTimeout(() => {
        
                dispararMensagem("Erro de conexão com o servidor.");

            }, 500);

        }

    };











    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (

       <div className="componente-de-pagina">





       {/* 📋 CARD CADASTRAR */}
       <div className="Card-Logar">





            <div className="LoginTudo">
    


                {/* <div className="info-gaveta">
                    <div>
                        <p>📡 Monitorando da gaveta - credenciais:</p>
                        <div><span>👔 cpef: </span> <strong>{credenciais.cpef}</strong></div>
                        <div><span>🔑 senh: </span> <strong>{credenciais.senh}</strong></div>
                    </div>
                </div> */}




                <div className={`MsgForm ${msgVisivel ? 'ativo' : ''} ${tipoMsg}`}>
                        <span className="alerta-erro">
                            {tipoMsg === "sucesso" ? (
                                <>
                                    <div className="linha-topo">✅ Cadastro realizado com sucesso!</div>
                                    <div className="linha-foco">AGORA FAÇA SEU LOGIN</div>
                                </>
                            ) : (
                                <>⚠️ {msgErro}</>
                            )}
                        </span>
                    </div>






                <form className="LoginForm" onSubmit={enviarDadosLoginParaServidor}>  

                    <h3>LOGIN</h3>

                    <img src="imagens/login.jpg" alt="Login" />

                    <div className="InputLaguraTotal">
                        <label>CPF:</label>
                        <input 
                            type="text" 
                            name="cpef" 
                            value={credenciais.cpef}
                            onChange={handleChange} 
                            autocomplete="username"
                            placeholder="Digite seu nome"
                            required 
                        /> 
                    </div>

                    <div className="InputLaguraTotal">
                        <label>Senha:</label>
                        <input 
                            type="password" 
                            className={`${veioDoCadastro ? 'input-pulsar' : ''}`}
                            name="senh" 
                            value={credenciais.senh}
                            onChange={handleChange} 
                            // required 
                        />
                    </div>

                    <button type="submit" className="BotaoPadraoLogin">Entrar</button>

                    <div className="CampoLink"> 
                        <button type="button" id="BotaoLinkEsqueci">Esqueci a senha</button>  
                    </div>  

                </form> {/* FIM DO - className="LoginForm" */}







            </div> {/* FIM DO - className="LoginTudo"> */}
           
           



            <div className="CpefTextes">

                <input type="button" className="bot1" value="GIULIANO (PROGRAMADOR)" 
                    onClick={() => preencherCampos({
                        cpef: "121.149.148-01",
                        senh: "Olhoquetudove@7"
                    })}/> 


                <input type="button" className="bot2" value="ANDRESSA (ADMINISTRADORA)" 
                    onClick={() => preencherCampos({
                        cpef: "233.606.620-32",
                        senh: "123"
                    })}/>
  
                <input type="button" className="bot4" value="JOANA (CUIDADORA)" 
                    onClick={() => preencherCampos({
                        cpef: "103.646.340-06",
                        senh: "1"
                    })}/> 

                <input type="button" className="bot5" value="PAULA (CUIDADORA)" 
                    onClick={() => preencherCampos({ 
                        cpef: "663.745.531-87",
                        senh: "12"
                    })}/>

                <input type="button" className="bot6" value="MARIA (CUIDADORA)" 
                    onClick={() => preencherCampos({
                        cpef: "519.310.058-93",
                        senh: "123"
                    })}/>

                <input type="button" className="bot7" value="ISABEL (CUIDADORA)" 
                    onClick={() => preencherCampos({ 
                        cpef: "200.335.920-63",
                        senh: "123"
                    })}/>

                <input type="button" className="bot8" value="BEATRIZ (CLIENTE)" 
                    onClick={() => preencherCampos({
                        cpef: "060.915.660-83",
                        senh: "12345"
                    })}/> 


                <input type="button" className="bot9" value="LUCIANA (CLIENTE)" 
                    onClick={() => preencherCampos({
                        cpef: "763.626.770-56",
                        senh: "12345"
                    })}/> 




                <input type="button" className="bot10" value="MARCO (CLIENTE)" 
                    onClick={() => preencherCampos({    
                        cpef: "844.450.750-43",
                        senh: "12345"
                    })}/> 








            </div> {/* FIM DO - className="CpefTextes"> */}



            </div>


        </div> // FIM DO - <div className="DivConteudo">



    ); 

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */




}