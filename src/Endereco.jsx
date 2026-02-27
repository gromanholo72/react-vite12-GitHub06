
import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';

import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './Endereco.css'; 



export function Endereco() {


    // const navigate = useNavigate();


    // 📡 Sinal da antena
    const { dadosToken, dadosUsuarioCompleto } = useAuth();
    
    // 📦 Buscando o crachá no Armário (localStorage)
    // const dadosArmario = JSON.parse(localStorage.getItem('dadosPublicos')) || {};




    // 🧰 Ferramentas de Trabalho (Hooks)
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    // 🔒 Controle de Edição

    const [podeEditar, setPodeEditar] = useState(false);




    useEffect(() => {

        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - componente - 📍 Endereco.jsx");
        console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        console.log("✨ 🎫 dadosToken = ", dadosToken);
        console.log("✨ ----------------------------------");

    }, [dadosToken]);


    







    




    

/* 🧱 FERRAMENTAS DE TRABALHO (useEffect) - MONITORAMENTO */
useEffect(() => {

    console.log("");
    console.warn("✨ 🛰️ ----------------------------------");
    console.warn("✨ 🛰️ useEffect() - componente - 📍 Endereco.jsx");
    console.warn("✨ 🛰️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");

    if (dadosUsuarioCompleto?.cpef) {

        console.warn("✨ 🛰️ 🧖‍♂️ dadosUsuarioCompleto.cpef = ", dadosUsuarioCompleto.cpef);
        distribuirDadosContexto();

    } else {

        console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar Endereço...");

    }

    console.warn("✨ 🛰️ ----------------------------------");

}, [dadosUsuarioCompleto]);


/* 🕵️‍♂️ FUNÇÃO: Distribui o endereço para os cards (Memória ou Banco) */
const distribuirDadosContexto = async () => {

    /* 🧱 Primeiro, verificamos se o endereço já está na memória (Contexto) */
    const infoEndereco = dadosUsuarioCompleto?.ende;

    /* 🚀 Se o cpef existe mas NÃO tem endereço na memória, busca na Antena Central */
    if (!infoEndereco || Object.keys(infoEndereco).length === 0) {
        
        console.warn("✨ 🛰️ Endereço vazio na memória. Buscando na Antena Central...");
        
        const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/ende`);

        try {
            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists()) {
                const dadosEnde = snapshot.val();
                console.warn("✨ ✅ Endereço encontrado no Realtime.");
                popularCamposEndereco(dadosEnde);
                setPodeEditar(false);
            } else {
                console.warn("✨ 📍 Nenhum endereço no banco. Liberando edição.");
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar endereço na Antena Central:", error);
            setPodeEditar(true); 
        }

    } else {
        /* Se já tem o endereço na memória (Contexto) */
        console.warn("✨ 🛰️ 🏠 Populando cards com endereço da memória.");
        popularCamposEndereco(infoEndereco);
        setPodeEditar(false);
    }
};


/* 🧱 Função Auxiliar para popular os estados dos cards de Endereço */
const popularCamposEndereco = (dados) => {
    setCep(String(dados.cepe || '').trim());
    setRua(String(dados.ruaa || '').trim());
    setBairro(String(dados.bair || '').trim());
    setCidade(String(dados.cida || '').trim());
    setEstado(String(dados.esta || '').trim());
    setNumero(String(dados.nume || '').trim());
};
































    // 🔍 BUSCA ViaCEP (Só se estiver em modo edição) - Versão Moderna 2026

    const realizarBuscaCep = async () => {

        if (!podeEditar) return;

        const apenasNumeros = cep.replace(/\D/g, '');

        if (apenasNumeros.length === 8) {

            try {
                
                /* 📡 Conexão com a antena do ViaCEP */
                const resposta = await fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);
                const dados = await resposta.json();

                if (!dados.erro) {

                    setRua(dados.logradouro || '');
                    setBairro(dados.bairro || '');
                    setCidade(dados.localidade || '');
                    setEstado(dados.uf || '');

                }

            } catch (error) {

                console.error("❌ Falha na comunicação com o serviço de CEP:", error);

            }

        }
    };

    useEffect(() => {
       
        realizarBuscaCep();

    }, [cep, podeEditar]);

















    // 🛠️ MÁSCARA DE CEP
    const mascaraCep = (e) => {
        // 🧱 Se a obra estiver travada (podeEditar = false), não faz nada
        if (!podeEditar) return;
    
        // 🧱 Passo 1: Captura o valor e limpa tudo o que não é número
        let v = e.target.value.replace(/\D/g, '');
    
        // 🧱 Passo 2: Limita a 8 números (o tamanho real do CEP)
        if (v.length > 8) v = v.substring(0, 8);
    
        // 🧱 Passo 3: Aplica o ponto e o traço (Padrão: 00.000-000)
        // Primeiro o ponto: 00.000
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        // Depois o traço: 00.000-000
        v = v.replace(/(\d{3})(\d)/, '$1-$2');
    
        // 📐 👔 console.log("📐 📍 cep = ", v);
    
        // 🧱 Passo 4: Atualiza o Estado (Sua variável 'cep')
        setCep(v);
    };




    const mascaraNume = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;
    
        // 🧱 Limpeza: Aceita apenas números (evita que digitem letras no Nº)
        let v = e.target.value.replace(/\D/g, '');
    
        // 📐 👔 console.log("📐 🏠 numero = ", v);
    
        // 💾 Salva na prancheta (Estado)
        setNumero(v);
    };
























    // 💾 SALVAR NO BANCO DE DADOS
    const salvarEnderecoNoBanco = async () => {

        try {

            const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");

            if (!cpfLimpo) {

                console.error("✨ 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;

            }

            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);

            const dadosEndereco = {
                cepe: cep,
                ruaa: rua,
                nume: numero,
                bair: bairro,
                cida: cidade,
                esta: estado
            };

            await update(caminhoNoBanco, { ende: dadosEndereco });

            console.log("📡🗼 ✅ Almoxarifado: Endereço atualizado com sucesso!");

            alert("✅ Dados salvos no banco de dados");

            // Trava após salvar
            setPodeEditar(false); 
            
        } catch (error) {

            console.error("❌ Erro ao salvar:", error);

            alert("Erro ao conectar com o banco de dados");

        }
    };



    

    // ✖️ CANCELAR EDIÇÃO: Descarta as mudanças locais e restaura o que está no Contexto
    const cancelarEdicao = () => {

        console.log("✨ 🔄 Cancelando edição. Restaurando dados do Contexto...");

        // Chamamos a função que já sabe ler o Contexto e preencher os inputs
        distribuirDadosContexto(); 

        // Trava os inputs novamente (Fecha o portão de edição)
        setPodeEditar(false); 
        
        console.log("✨ ✅ Edição cancelada e cards restaurados com sucesso!");
        
    };








    return (
       
        <div className="perfil-endereco-componente-principal">
        
        
            <div className="perfil-endereco-componente-suporte">


                {/* 🧱 O formulário agora vive dentro de um container com título próprio */}
                <div className="perfil-endereco-usuario-card">


                    <div className="perfil-endereco-card-titulo">📍 ENDEREÇO RESIDENCIAL</div>


                    <div className="perfil-endereco-card-corpo">


                                
                        <div className="Campo flex-cep">
                            <label>CEP</label>
                            <input 
                                type="text" 
                                name="cepe"
                                placeholder="00.000-000"
                                disabled={!podeEditar} 
                                value={cep} 
                                onChange={mascaraCep} 
                                autoComplete="postal-code"
                                maxLength="10" 
                                required
                            />
                        </div>

                        <div className="Campo flex-rua">
                            <label>Rua/Avenida</label>
                            <input type="text" disabled={!podeEditar} value={rua} onChange={(e) => setRua(e.target.value)} />
                        </div>
    
                        <div className="Campo flex-numero">    
                            <label>Nº</label>
                            <input 
                                type="text" 
                                name="nume"
                                placeholder="S/N"
                                disabled={!podeEditar} 
                                value={numero} 
                                onChange={mascaraNume} 
                                autoComplete="address-line2"
                            />  
                        </div>

                        <div className="Campo flex-bairro "> 
                            <label>Bairro</label>
                            <input type="text" disabled={!podeEditar} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>

                        <div className="Campo flex-cidade"> 
                            <label>Cidade</label>
                            <input type="text" disabled={!podeEditar} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </div>

                        <div className="Campo flex-estado "> 
                            <label>UF</label>
                            <input type="text" disabled={!podeEditar} value={estado} maxLength="2" onChange={(e) => setEstado(e.target.value.toUpperCase())} />
                        </div>
                        


                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar Endereço
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar" onClick={salvarEnderecoNoBanco}>
                                        💾 Salvar Alterações
                                    </button>
                                    <button type="button" className="BotaoCancelar" onClick={cancelarEdicao}>
                                        ✖️ Cancelar Edição
                                    </button>
                                </>
                            )}
                        </div>



                    </div>


                </div>


            </div>


        </div>

    );
}