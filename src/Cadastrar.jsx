
// 🏗️ 2 ⚙️ Hooks (Ferramentas de trabalho) do 🧠 Gerente do React na 🏠 Casa (react)
import { useState, useEffect, useRef } from 'react'; 

// 🏗️ 🚕 useNavigate (O Motorista): O Hook que contrata o piloto para a viagem entre páginas da 🏠 Casa (react).
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from './AutenticacaoContexto.jsx';


import { BASE_URL_SERVIDOR } from './config/api.js';



import { doc, setDoc, getDoc } from "firebase/firestore";
import { db_firestore } from "./firebaseConfig";





import './Cadastrar.css';





export function Cadastrar() {
    

    // Chamando o 🚕 motorista para ficar de prontidão no portão da 🏠 Casa
    const navigate = useNavigate();



    const { setCarregandoModal } = useAuth();






    
    // 👁️ Controle do Sensor de Visibilidade
    const [mostrarSenha, setMostrarSenha] = useState(false);












    // ===========================================
    // INICIO - MOSTRA o erro na <div className="MsgForm">
    // ===========================================

    const [msgVisivel, setMsgVisivel] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const [tipoMsg, setTipoMsg] = useState("erro");

    /* // 🧱 1. Referência persistente para o timer (não reseta no render) */
    // const timerGavetaRef = useRef(null);

    const dispararMensagem = (texto, deveRedirecionar = false, dadoExtra = null, tipo = "erro") => {

        /* // 🧱 2. RESET DE OBRA: Se já existir um timer rodando, nós o cancelamos usando o .current */
        // if (timerGavetaRef.current) {
        //     clearTimeout(timerGavetaRef.current);
        // }

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
        // timerGavetaRef.current = setTimeout(() => {

        //     setMsgVisivel(false);

        //     setTimeout(() => { 

        //         setMsgErro(""); 

        //         if (deveRedirecionar) {

        //             navigate('/logar', {

        //                 state: { 
                            
        //                     cadastroSucesso: true,
        //                     cpfVindoDoCadastro: dadoExtra

        //                 } 

        //             });

        //         }

        //     }, 1000);


        // }, 4000);


    };

    // ===========================================
    // INICIO - MOSTRA o erro na <div className="MsgForm">
    // ===========================================






    






    // ===========================================
    // INICIO - MODAL SUCESSO - redirecionamento para Login
    // ===========================================

    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(() => {
        const valorInicial = false;
        console.log("📐 ----------------------------------");
        console.log("📐 useState() - componente - 🏛️ Cadastro.jsx");
        console.log("📐 Lazy Initialization - 🔵 mostrarModalSucesso");
        console.log("📐 🔵 mostrarModalSucesso nasceu como = ", valorInicial);
        console.log("📐 ----------------------------------");
        return valorInicial;
    });

    // ===========================================
    // FIM - MODAL SUCESSO - redirecionamento para Login
    // ===========================================















    // ===============================================================
    // INICIO - MODAL SUCESSO - temporizador para chamar form de login
    // ===============================================================

    const [cpfParaDespacho, setCpfParaDespacho] = useState("");
    const [contagem, setContagem] = useState(3);

    useEffect(() => {

        let cronometro;

        if (mostrarModalSucesso && contagem > 0) {

            cronometro = setInterval(() => {

                setContagem((v) => v - 1);

            }, 1000);

        }

        return () => clearInterval(cronometro);

    }, [mostrarModalSucesso, contagem]); 


    useEffect(() => {

        if (contagem === 0 && mostrarModalSucesso) {

            console.log("📐 🔵 contagem final alcançada = ", 0);
            console.log("📐 👔 CPF pronto para despacho = ", novoUsuario?.cpef);

            const timeoutSaida = setTimeout(() => {

                setMostrarModalSucesso(false);
                
                navigate('/Logar', {
                    state: { 
                        cadastroSucesso: true, 
                        cpfVindoDoCadastro: cpfParaDespacho 
                    }
                });

            }, 1000); 

            return () => clearTimeout(timeoutSaida);
        }

    }, [contagem, mostrarModalSucesso, cpfParaDespacho, navigate]);

    useEffect(() => {
        if (mostrarModalSucesso) {
            console.log("📐 🔵 contagem atual = ", contagem);
        }
    }, [contagem]);

    // ===============================================================
    // FIM - MODAL SUCESSO - temporizador para chamar form de login
    // ===============================================================













    // ===========================================
    // INICIO - MONITORA MENSAGEM DE ERRO
    // ===========================================

    useEffect(() => {

        // Só entra aqui se a gaveta tiver algo (ou se acabar de ser limpa)
        // Apos atualizacao do setMsgErro(dadosServidor.mensagem);
        // const [msgErro, setMsgErro] = useState("");

        if (msgErro) {

            console.log("📅 ----------------------------------");
            console.log("📅 useEffect - if (msgErro) - Cadastrar.jsx");
            console.log("📅 ----------------------------------");
            console.log("📅 🗂️ Gaveta (msgErro) - contém agora:", msgErro);
            console.log("📅 ----------------------------------");

        } else {

            console.log("📅 🧹 O Fiscal viu que a fachada foi limpa.");
            
        }

    // 🎯 O SEGREDO: Este Sentinela só acorda quando a msgErro muda!

    }, [msgErro]); 

    // ===========================================
    // FIM - MONITORA MENSAGEM DE ERRO
    // ===========================================













    //  --------------------------------------------------------------
    //  INICIO DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO CADASTRAR
    //  --------------------------------------------------------------

    // 📅 Gerando a data no padrão brasileiro (substituindo o PHP)
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    // 📝 1. Prancheta de Cadastro (Exclusiva desta página)
    const [novoUsuario, setNovoUsuario] = useState(() => {

        const valorInicial = {
            nome: "",
            cpef: "",
            mail: "",
            fone: "",
            func: "",
            datc: dataHoje,
            senh: ""
        };

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 useState() - componente - 🏛️ Cadastro.jsx");
        console.log("📐 Lazy Initialization - 📝 novoUsuario");
        console.log("📐 📝 novoUsuario nasceu como = ", valorInicial);
        console.log("📐 ----------------------------------");

        return valorInicial;

    });

    // ✨ Dispara sempre que o 'novoUsuario' mudar de fato (Vigia da Prancheta)
    useEffect(() => {

        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - componente - 🏛️ Cadastro.jsx");
        console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        console.log("✨ 📝 novoUsuario = ", novoUsuario);
        console.log("✨ ----------------------------------");
    
    }, [novoUsuario]);

    //  --------------------------------------------------------------
    //  FIM DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO
    //  --------------------------------------------------------------











    // ---------------------------------------------------------------------------
    // INICIO DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------

    // Função para automatizar o preenchimento do FORM
    // Pertence a CpefTextes e na pruducao vai ser preenchida pelo usuario
    const preencherCampos = (dadosVindosDoForm) => {

        console.log("");
        console.log("📮 ----------------------------------");
        console.log("📮 🚚 O caminhão do rádio chegou com a entrega!");
        console.log("📮 👍 <div className=CadUsuarioTudo> preenchido com sucesso!");
        console.log("📮 👍 Dados do Form:", dadosVindosDoForm);
        console.log("📮 ----------------------------------");

        setNovoUsuario({

            nome: dadosVindosDoForm.nome || "",
            cpef: dadosVindosDoForm.cpef || "",
            mail: dadosVindosDoForm.mail || "",
            fone: dadosVindosDoForm.fone || "",

            func: dadosVindosDoForm.func || "",

            datc: dadosVindosDoForm.datc || "",
            senh: dadosVindosDoForm.senh || ""

        });
    
    };

    // ---------------------------------------------------------------------------
    // FIM DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------










    // ----------------------------
    // INICIO DO - Nome em maiusculo
    // ----------------------------

    // 2. ✍️ Escriturário do Cadastro
    const handleChange = (e) => {

        // ✅ Correto: Use 'let' para permitir a transformação
        let { name, value } = e.target;

        // 🛠️ Se o pincel estiver no campo "nome", transformamos em MAIÚSCULO
        if (name === "nome") {
            value = value.toUpperCase();
        }

        setNovoUsuario(prev => ({ ...prev, [name]: value }));

    };

    // ----------------------------
    // FIM DO - Nome em maiusculo
    // ----------------------------













    // ----------------------------------------------------
    // INICIO DO - Enviar dados de cadastro para o servidor
    // ----------------------------------------------------

    const enviarDadosCadastroParaServidor = async (e) => {
        
        if (e) e.preventDefault(); 

        setCarregandoModal(true);

        setMsgVisivel(false);

        console.log("🚀 Enviando novo usuário para a fundação...");

        try {

            const resposta = await fetch(`${BASE_URL_SERVIDOR}/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                setCarregandoModal(false);

                // const cpfParaLogin = novoUsuario.cpef;

                setCpfParaDespacho(novoUsuario.cpef);

                console.log("✅ Cadastro concluído no banco de dados!");

                setNovoUsuario({

                    cpef: "",

                    nome: "",
                    mail: "", 
                    fone: "", 

                    func: "",

                    datc: dataHoje,
                    senh: ""  

                });

                setMostrarModalSucesso(true);

              

                /* 🧱 Timer de 5 segundos para redirecionar */
                // setTimeout(() => {

                //     setMostrarModalSucesso(false);

                //     navigate('/Logar', {
                //         state: { 
                //             cadastroSucesso: true,
                //             cpfVindoDoCadastro: cpfParaLogin 
                //         }
                //     });

                // }, 5000);

            } else {

                setTimeout(() => {

                    dispararMensagem(resultado.erro);

                }, 500);

            }

        } catch (error) {

            setTimeout(() => {

                dispararMensagem("Erro de conexão com o servidor.");

            }, 500);

        }

    };

    // ----------------------------------------------------
    // FIM DO - Enviar dados de cadastro para o servidor
    // ----------------------------------------------------







    





    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (



        <div className="componente-de-pagina">






            {/* 🔘 MODAL DE SUCESSO E REDIRECIONAMENTO */}
            {mostrarModalSucesso && (
                <div className="Overlay-Modal-Sucesso">
                    <div className="Card-Modal-Redirecionamento">
                        <div className="Icone-Sucesso-Animado">✅</div>
                        <h2>Cadastro Realizado!</h2>
                        <p>Sua conta foi criada com sucesso na nossa fundação.</p>
                        <div className="Aviso-Destaque">
                        <span>Você será redirecionado para a tela de login em {contagem} segundos...</span>
                        </div>



                        {/* <div className="Barra-Progresso-Container">
                            <div className="Barra-Progresso-Ativa"></div>
                        </div> */}


                        <div className="Barra-Progresso-Container">
                            <div 
                                className="Barra-Progresso-Ativa"
                                style={{ 
                                   transition: 'width 1s linear',
                                    width: `${((3 - contagem) / 3) * 100}%` 
                                   
                                }}
                            ></div>
                        </div>






                    </div>
                </div>
            )}









            {/* 📋 CARD CADASTRAR */}
            <div className="Card-Cadastrar">






                <div className="CadUsuarioTudo"> 




                    {/* <div className="info-gaveta">
                        <div>
                            <p>📡 Monitorando da gaveta - novoUsuario:</p>

                            <div><span>👔 cpef: </span> <strong>{novoUsuario.cpef || "---"}</strong></div>

                            <div><span>✨ nome: </span> <strong>{novoUsuario.nome || "---"}</strong></div>
                            <div><span>📧 mail: </span> <strong>{novoUsuario.mail || "---"}</strong></div>
                            <div><span>📞 fone: </span> <strong>{novoUsuario.fone || "---"}</strong></div>

                            <div><span>🎟️ func: </span> <strong>{novoUsuario.func || "---"}</strong></div>
                    
                            <div><span>📅 datc: </span> <strong>{novoUsuario.datc || "---"}</strong></div>
                            <div><span>🔑 senh: </span> <strong>{novoUsuario.senh || "---"}</strong></div>

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





                    {/* 🏢 CAD-USUARIO-FORM */ }

                    <form className="CadUsuarioForm" onSubmit={enviarDadosCadastroParaServidor}> 

                        <h3>CADASTRO DE USUARIO</h3> 

                        {/* --- NOME --- */}
                        <div className="CadUsuarioLargNome">
                            <label>Nome:</label>
                            <input 
                                type="text" 
                                name="nome" // 🔑 Etiqueta para o Escriturário
                                placeholder="Nome Completo"
                                value={novoUsuario.nome}
                                onChange={handleChange} 
                                required
                            />
                        </div>  

                        {/* --- CPF --- */}
                        <div className="CadUsuarioLargCpef">
                            <label>CPF:</label>
                            <input 
                                type="text" 
                                name="cpef" // 🔑 Etiqueta para o Escriturário
                                placeholder="000.000.000-00"
                                value={novoUsuario.cpef}
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        
                        {/* --- E-MAIL --- */}
                        <div className="CadUsuarioLargMail">                  
                            <label>E-mail:</label>                                                                                      
                            <input 
                                type="email" 
                                name="mail" // 🔑 Etiqueta para o Escriturário
                                placeholder="exemplo@email.com"
                                value={novoUsuario.mail} 
                                onChange={handleChange} 
                                required
                            />   
                        </div> 

                        {/* --- WHATSAPP --- */}
                        <div className="CadUsuarioLargFone">                  
                            <label>WhatsApp:</label>                                                                                    
                            <input 
                                type="text" 
                                name="fone" // 🔑 Etiqueta para o Escriturário
                                placeholder="(00) 00000-0000"
                                value={novoUsuario.fone} 
                                onChange={handleChange} 
                                required
                            />   
                        </div> 

                        {/* --- FUNÇÃO / INTERESSE --- */}
                        <div className="CadUsuarioLargFunc">                  
                            <label>Interesse:</label>                                                                                    
                            <select 
                                name="func" // 🔑 Etiqueta para o Escriturário
                                value={novoUsuario.func} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">---Selecione---</option>   
                                <option value="cuidadora">Trabalhar como cuidadora</option>
                                <option value="cliente">Contratar serviços</option> 
                                {/* <option value="visitante">Conhecer apenas</option> */}
                            </select>     
                        </div>
                    



                        {/* --- SENHA --- */}
                        <div className="CadUsuarioLargSenh">                  
                            <label>Senha:</label>
                        
                            <div className="InputWrapper">

                                <input 
                                    type={mostrarSenha ? "text" : "password"} 
                                    name="senh"
                                    value={novoUsuario.senh} 
                                    onChange={handleChange}
                                    required 
                                />

                                <img 
                                    className="CLargImg" 
                                    src={mostrarSenha ? "imagens/olhofechado.png" : "imagens/olhoaberto.png"} 
                                    alt="Toggle Password" 
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    style={{ cursor: 'pointer' }} 
                                /> 

                            </div>

                        </div>





                        {/* --- DATA (APENAS LEITURA) --- */}
                        <div className="CadUsuarioLargDatC">                  
                            <label>Data Cadastro:</label>                                                                                    
                            <input 
                                type="text" 
                                name="datc" 
                                disabled 
                                value={dataHoje} 
                            />           
                        </div>
                        
                        <div className="CampoBotoes">
                            {/* <button type="button" onClick={() => navigate('/')}>Voltar</button> */}
                            <button type="submit">Cadastrar</button> 
                        </div>
                    </form>

                    {/* fim do - 🏢 CAD-USUARIO-FORM */ }




                </div> {/* FIM DO - <div className="CadUsuarioTudo"> */}


                



                <div className="CpefTextes">

                    <input type="button" className="bot4" value="JOANA (CUIDADORA)" 
                        onClick={() => preencherCampos({

                            nome: "JOANA DE CASSIA MEDEIROS", 
                            cpef: "103.646.340-06",
                            mail: "gromanholo722@gmail.com",
                            fone: "(16) 9-8185-0365",

                            func: "cuidadora", 

                            // datc: dataHoje, 
                            senh: "1"

                        })}/> 

                    <input type="button" className="bot5" value="PAULA (CUIDADORA)" 
                        onClick={() => preencherCampos({

                            nome: "PAULA TOLER DO PASSADO", 
                            cpef: "663.745.531-87",
                            mail: "aromanholo7724@gmail.com", 
                            fone: "(16) 9-7777-6666",

                            func: "cuidadora", 

                            // datc: dataHoje,
                            senh: "12"

                        })}/>

                    <input type="button" className="bot6" value="MARIA (CUIDADORA)" 
                        onClick={() => preencherCampos({

                            nome: "MARIA DAS GRAÇAS MENEGUEL", 
                            cpef: "519.310.058-93",
                            mail: "gromanholoere44@gmail.com", 
                            fone: "(16) 9-7777-6666",

                            func: "cuidadora", 

                            // datc: dataHoje,
                            senh: "123"

                        })}/>

                    <input type="button" className="bot7" value="ISABEL (CUIDADORA)" 
                        onClick={() => preencherCampos({

                            nome: "ISABEL PILANTRA PRA SEMPRE", 
                            cpef: "200.335.920-63",
                            mail: "gromanholoere44@gmail.com", 
                            fone: "(16) 9-7777-6666",

                            func: "cuidadora", 
                            
                            // datc: dataHoje,
                            senh: "123"

                        })}/>

                    <input type="button" className="bot8" value="BEATRIZ (CLIENTE)" 
                        onClick={() => preencherCampos({

                            nome: "BEATRIZ QUE GOSTA DO PAI", 
                            cpef: "060.915.660-83",
                            mail: "aromanholo7745@gmail.com", 
                            fone: "(16) 9-4545-4545",

                            func: "cliente", 
                            // datc: dataHoje,

                            senh: "12345"

                        })}/> 
                    
                    <input type="button" className="bot9" value="LUCIANA (CLIENTE)" 
                        onClick={() => preencherCampos({

                            nome: "LUCIANA AMARAL MATADO MATARAIA", 
                            cpef: "763.626.770-56",
                            mail: "aromanholo7745@gmail.com", 
                            fone: "(16) 9-4545-4545",

                            func: "cliente", 
                            // datc: dataHoje,
                            senh: "12345"

                        })}/> 

                    <input type="button" className="bot10" value="MARCO (CLIENTE)" 
                        onClick={() => preencherCampos({

                            nome: "MARCO ANTONIO CASALE", 
                            cpef: "844.450.750-43",
                            mail: "aromanholo7745@gmail.com", 
                            fone: "(16) 9-4545-4545",

                            func: "cliente", 
                            // datc: dataHoje,
                            senh: "12345"

                        })}/> 


                
                </div>  {/* FIM DO - <div className="CpefTextes"> */}



            </div>







        </div> // FIM DO - <div className="DivConteudo">


    ); 

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */




}