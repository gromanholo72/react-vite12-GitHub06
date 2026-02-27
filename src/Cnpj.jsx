

import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './EstiloForm.css';



export function Cnpj() {

     const { dadosToken, dadosUsuarioCompleto } = useAuth();

    // 📦 Buscando o crachá no Armário (localStorage)
    // const dadosArmario = JSON.parse(localStorage.getItem('dadosPublicos')) || {};

    // const dadosUsuarioCompleto = {
    //     cpef: dadosArmario.cpef || "",
    //     nome: dadosArmario.nome || "Usuário"
    // };

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [situacao, setSituacao] = useState('');
    const [atividades, setAtividades] = useState('');
    const [socios, setSocios] = useState('');

    // 🔒 Controle de Edição
    const [podeEditar, setPodeEditar] = useState(false);















useEffect(() => {

    console.log("");
    console.log("✨ ----------------------------------");
    console.log("✨ useEffect() - componente - 🏢 Cnpj.jsx");
    console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");

    if (dadosUsuarioCompleto?.cpef) {

        console.log("✨ 🧖‍♂️ dadosUsuarioCompleto (CPEF) identificado = ", dadosUsuarioCompleto.cpef);
        distribuirDadosCnpj();

    } else {

        console.warn("✨ ⏳ Aguardando sinal da Antena Central para carregar CNPJ...");

    }

    console.log("✨ ----------------------------------");

}, [dadosUsuarioCompleto]);



/* 🕵️‍♂️ FUNÇÃO: Distribui os dados da Antena Central para os cards de CNPJ */
const distribuirDadosCnpj = async () => {

    /* 🧱 Primeiro, tentamos ver se o dado já está na memória (Contexto) */
    const infoCnpjMemoria = dadosUsuarioCompleto?.cnpj_dados;

    if (infoCnpjMemoria) {

        console.log("✨ 🏢 Populando cards com dados existentes na memória.");
        popularCamposCnpj(infoCnpjMemoria);
        setPodeEditar(false);

    } else {

        /* 📡 Se não estiver na memória, buscamos direto na Antena Central (Firebase) */
        console.log("✨ 🛰️ Buscando dados de CNPJ direto no banco...");
        
        const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/cnpj_dados`);

        try {
            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists()) {
                const dados = snapshot.val();
                console.log("✨ ✅ Dados encontrados no Realtime.");
                popularCamposCnpj(dados);
                setPodeEditar(false);
            } else {
                console.warn("✨ 🏢 Nenhum CNPJ cadastrado. Liberando edição.");
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar CNPJ na Antena Central:", error);
        }
    }
};

/* 🧱 Função Auxiliar para evitar repetição de código (Clean Code) */
const popularCamposCnpj = (dados) => {
    setCnpj(dados.num_cnpj || '');
    setRazaoSocial(dados.razao || '');
    setNomeFantasia(dados.fantasia || '');
    setSituacao(dados.situ || '');
    setAtividades(dados.ativ || '');
    setSocios(dados.soci || '');
};
















    // 🔍 BUSCA CNPJ (BrasilAPI)
    useEffect(() => {

        if (!podeEditar) return;

        const apenasNumeros = cnpj.replace(/\D/g, '');

        if (apenasNumeros.length === 14) {
            fetch(`https://brasilapi.com.br/api/cnpj/v1/${apenasNumeros}`)
                .then(res => res.json())
                .then(dados => {
                    if (dados.cnpj) {
                        setRazaoSocial(dados.razao_social || '');
                        setNomeFantasia(dados.nome_fantasia || 'NÃO INFORMADO');
                        setSituacao(dados.descricao_situacao_cadastral || '');
                        const principal = dados.cnae_fiscal_descricao || '';
                        setAtividades(principal);
                        const listaSocios = dados.qsa?.map(s => s.nome_socio).join(', ') || 'NÃO INFORMADO';
                        setSocios(listaSocios);
                    }
                }).catch(() => console.log("Erro na busca do CNPJ"));
        }

    }, [cnpj, podeEditar]);











    // 🛠️ MÁSCARA DE CNPJ
    const mascaraCnpj = (e) => {
        // 🧱 Se a obra estiver travada (não pode editar), não faz nada
        if (!podeEditar) return;
        
        // 🧱 Passo 1: Limpeza (Remove tudo o que não é número)
        let v = e.target.value.replace(/\D/g, '');

        // 🧱 Passo 2: Corte (Limita aos 14 números do CNPJ)
        if (v.length > 14) v = v.substring(0, 14);

        // 🧱 Passo 3: Assentamento (Aplica a pontuação progressiva)
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');             // 00.
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // 00.000.
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');           // 00.000.000/
        v = v.replace(/(\d{4})(\d)/, '$1-$2');              // 00.000.000/0000-00

        // 📐 👔 console.log("📐 🏢 CNPJ Formatado = ", v);
        
        // 🧱 Passo 4: Atualiza a Planta (Estado)
        setCnpj(v);
    };















    // 💾 SALVAR NO FIREBASE
    const salvarCnpjNoBanco = async () => {

        try {

            const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);

            const dadosCnpj = {
                num_cnpj: cnpj,
                razao: razaoSocial,
                fantasia: nomeFantasia,
                situ: situacao,
                ativ: atividades,
                soci: socios
            };

            await update(caminhoNoBanco, { cnpj_dados: dadosCnpj });
            alert("✅ CNPJ registrado com sucesso!");

            setPodeEditar(false);

        } catch (error) {

            alert("Erro ao conectar com a Antena Central.");

        }

    };









    
    return (
        <div className="componente-principal-padrao">
        

            <div className="componente-suporte-padrao">


                <div className="card-padrao">
                    
                    <div className="card-padrao-titulo">🏢 DADOS EMPRESARIAIS</div>

                    <div className="card-padrao-corpo">

                        {/* <form className="FormularioEndereco"> */}

                            <div className="flex-cnpj">
                                <label>CNPJ (via BrasilAPI)</label>
                                <input 
                                    type="text" 
                                    name="cnpj"
                                    placeholder="00.000.000/0000-00"
                                    disabled={!podeEditar} 
                                    value={cnpj} 
                                    onChange={mascaraCnpj} 
                                    autoComplete="organization" /* ✨ Sinal para o celular sugerir dados de empresas */
                                    required
                                />
                            </div>

                            <div className="flex-razao">
                                <label>Razão Social</label>
                                <input type="text" disabled={true} value={razaoSocial} className="input-travado" />
                            </div>

                            <div className="flex-fantasia">
                                <label>Nome Fantasia</label>
                                <input type="text" disabled={true} value={nomeFantasia} />
                            </div>

                            <div className="flex-situacao">
                                <label>Situação</label>
                                <input type="text" disabled={true} value={situacao} />
                            </div>
                            
                            <div className="flex-atividade">
                                <label>Atividade Principal</label>
                                <input type="text" disabled={true} value={atividades} />
                            </div>

                            <div className="flex-socio">
                                <label>Sócios / Proprietários</label>
                                <input type="text" disabled={true} value={socios} />
                            </div>



                            <div className="AreaBotoes">
                                {!podeEditar ? (
                                    <button type="button" className="BotaoEditar" onClick={() => setPodeEditar(true)}>
                                        🔓 Editar CNPJ
                                    </button>
                                ) : (
                                    <>
                                        <button type="button" className="BotaoSalvar" onClick={salvarCnpjNoBanco}>💾 Salvar Empresa</button>
                                        <button type="button" className="BotaoCancelar" onClick={() => { carregarDadosCnpj(); setPodeEditar(false); }}>✖️ Cancelar</button>
                                    </>
                                )}
                            </div>

                        {/* </form> */}

                    </div>
                </div>

            </div>
        </div>
    );
}