
// 🏢 O Prédio (Express) - O projeto do prédio nasce na importação (Node.js)
import express from 'express';

// ⚡ Módulo nativo do Node.js para criar o servidor 
import { createServer } from 'http';

// 🛡️ Segurança do predio (CORS) - O porteiro que autoriza a 🏠 Casa (React) e o 📻 Rádio Portátil
import cors from 'cors';

// 📡 O Mensageiro - (Socket.io) - Tecnologia de comunicação em tempo real
import { Server } from 'socket.io';

// 🏗️ No server.js (O Arquiteto pegando as chaves no arquivo firebase.js)
import { db_realtime } from './src/firebaseConfig.js';

// 🛠️ E não esqueça das ferramentas de ação:
import { ref, get } from "firebase/database";

import admin from "firebase-admin";

import { createRequire } from "module";




const requireJSON = createRequire(import.meta.url);
const app = express();



// ---------------------------------------------------------
// 🏗️ 👔 1. PRIMEIRO: DETECTOR DE CANTEIRO (A Base de Tudo)
// ---------------------------------------------------------
// Esta linha deve vir ANTES de qualquer uso da variável isLocal
const isLocal = process.env.RENDER === undefined;


// ---------------------------------------------------------
// 🏗️ 👔 DETECTOR DE CANTEIRO (Lógica Híbrida)
// ---------------------------------------------------------
const CONFIG = {
    // 🏠 No seu PC usa o IP. No Render usa a URL oficial.
    API_URL: isLocal 
        ? "http://192.168.15.7:3001" 
        : "https://react-vite12-github03.onrender.com",
    
    NOME_SISTEMA: isLocal 
        ? "Sistema do Giuliano (Local - PC) 💻" 
        : "Sistema do Giuliano (Externo - Render) 🌐",
    
    PORTA: process.env.PORT || 3001,
    CHAVE_FIREBASE: process.env.GOOGLE_APPLICATION_CREDENTIALS || "./chave-privada-firebase.json"
};

console.log(`\n📐 🔵 O Prédio está mirando para: ${CONFIG.API_URL}`);


// ---------------------------------------------------------
// 🔑 INICIALIZAÇÃO DO FIREBASE (A Viga Mestra)
// ---------------------------------------------------------
try {

    let serviceAccount;

    // Se a chave começar com '{', o código entende que é o TEXTO do JSON (Modo Render)
    if (CONFIG.CHAVE_FIREBASE.trim().startsWith('{')) {

        serviceAccount = JSON.parse(CONFIG.CHAVE_FIREBASE);

    } else {

        // Caso contrário, ele abre o arquivo físico na sua pasta (Modo PC)
        serviceAccount = requireJSON(CONFIG.CHAVE_FIREBASE);

    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://react-vite01-644c9-default-rtdb.firebaseio.com"
    });

    console.log(`📐 🔵 ----------------------------------`);
    console.log(`📐 👔 ${CONFIG.NOME_SISTEMA}`);
    console.log(`📐 👔 FIREBASE CONECTADO COM SUCESSO! ✅`);
    console.log(`📐 🔵 ----------------------------------`);

} catch (erro) {
    console.log(`📐 🔵 ----------------------------------`);
    console.log(`📐 👔 ERRO CRÍTICO NA CONEXÃO FIREBASE ❌`);
    console.log(`📐 🎟️ Detalhe: ${erro.message}`);
    console.log(`📐 🔵 ----------------------------------`);
}




// CRIANDO ADMINISTRADOR

const db_admin = admin.database();

const garantirAdministradorRaiz = async () => {

    console.log("");
    console.log("🚨 🏗️  -------------------------------------------------------");
    console.log("🚨  INSPEÇÃO: BANCO DE DADOS do FireBase");
    console.log("🚨  INSPEÇÃO: Verificando se existe o programador");
    console.log("🚨  INSPEÇÃO: código está usando o Admin SDK (a sua Chave Mestra)");
    console.log("🚨  para conferir se as tabelas e os dados essenciais do sistema");
    console.log("🚨 🏗️  -------------------------------------------------------");

    const meuCpf = "121.149.148-01";
    const cpfLimpo = meuCpf.replace(/\D/g, "");
    const caminhoAdmin = db_admin.ref(`usuarios/${cpfLimpo}`);

    try {

        const snapshot = await caminhoAdmin.once("value");

        if (!snapshot.exists()) {

            await caminhoAdmin.set({

                cpef: meuCpf,
                nome: "GIULIANO APARECIDO ROMANHOLO",
                func: "programador",
                perm: "total",
                situ: "ativo",
                senh: "Olhoquetudove@7",
                datc: new Date()

            });

            console.log("");
            console.log("🚨 🏗️  -------------------------------------------------------");
            console.log("🚨 🏗️  Usuario programador criado no bando de dados com sucesso!");
            console.log("🚨 🏗️  -------------------------------------------------------");

        } else {

            console.log("");
            console.log("🚨 🏗️ ✅ -------------------------------------------------------");
            console.log("🚨 🏗️ ✅ O programador ja existe no banco de dados!");
            console.log("🚨 🏗️ ✅ -------------------------------------------------------");

        }

    } catch (error) {

        console.error("🚨 🏗️ ❌ Erro na criacao do programados no banco de dados: ", error.message);

    }

};

garantirAdministradorRaiz();

// ----------------------------------
// FIM - CRIAR ADMINISTRADOR
// ----------------------------------





























/* ----------------------------------------------------------------------------------- */
// INICIO - ⚡ Energia Elétrica (Node.js) - Criando a base física onde o Prédio se apoia
/* ----------------------------------------------------------------------------------- */

const httpServer = createServer(app);

// 📡 O Mensageiro (Socket.io) - Instalando a antena de rádio
const io = new Server(httpServer, {
    cors: {
        // 🏠 A Casa (React) - Permite conexões de qualquer lugar
        origin: "*",
        // ✈️ Avião (socket.emit) - Métodos autorizados
        methods: ["GET", "POST"]
    }
});

/* ----------------------------------------------------------------------------------- */
// INICIO - ⚡ Energia Elétrica (Node.js) - Criando a base física onde o Prédio se apoia
/* ----------------------------------------------------------------------------------- */









// -------------
// INICIO - 🔥 APP 🔥
// -------------

// 🏢 O Prédio (Express) - Colocando o porteiro na guarita

// 🛡️ Segurança (CORS) - Ativando a permissão de entrada (Obrigatório após o app)
app.use(cors());

app.use(cors({
    origin: "*", // Libera qualquer origem temporariamente
    credentials: true
}));

// 🧱 Traduz JSON vindo do React
app.use(express.json());


// 📐 🔵 Verificação de rota de teste
app.get('/teste', (req, res) => {
    res.send("O Prédio está de pé! 🏢");
});
















/* // 🧱 Rota de Cadastro no Servidor (exemplo) */
app.post('/cadastrar', async (req, res) => {

    const { nome, cpef, mail, fone, func, datc, senh } = req.body;

    const cpfLimpo = cpef.replace(/\D/g, "");

    try {
        
        const usuarioRef = db_admin.ref(`usuarios/${cpfLimpo}`);

        const snapshot = await usuarioRef.once("value");

        if (snapshot.exists()) {

            return res.status(409).json({ erro: "Este CPF já está cadastrado no sistema!" });

        }


        /* Definimos a função padrão como 'colaborador' se não for enviada */
        const novoUsuarioDados = {

            cpef: cpef,

            nome: nome,
            mail: mail,
            fone: fone,

            func: func,
            perm: "basica",
            situ: "ativo",

            datc: datc,
            senh: senh
            
        };

        await usuarioRef.set(novoUsuarioDados);

        console.log("");
        console.log("✅ ----------------------------------");
        console.log(`✅ Cadastro realizado pelo servidor (VPS) no banco de dados do Fire Base para:`);
        console.log(`✅ ${nome} | CPF: ${cpfLimpo} | Cargo: ${func}`);

        console.log("✅ ----------------------------------");

        /* 🧱 5. Retorno de Sucesso - 201: Novo usuário construído com sucesso na base de dados */
        res.status(201).json({ 

            mensagem: "Cadastro realizado com sucesso!",
            usuario: { nome: nome, cpef: cpfLimpo } 

        });

    } catch (error) {

        console.error("❌ ERRO NO CADASTRO:", error.message);

        res.status(500).json({ erro: "Erro ao salvar o novo colaborador no banco" }); 

    }
});







app.post('/login', async (req, res) => {

    const { cpef, senh } = req.body;

    const cpfLimpo = cpef.replace(/\D/g, "");

    try {

        /* // 🧱 1. Usando o db_admin para buscar o usuário */
        const usuarioRef = db_admin.ref(`usuarios/${cpfLimpo}`);
        const snapshot = await usuarioRef.once("value");

        if (!snapshot.exists()) {

            /* 404 (Not Found): O card deste CPF não foi encontrado no banco */
            return res.status(404).json({ erro: "Usuário não cadastrado!" });

        }

        const usuarioDados = snapshot.val();

        if (usuarioDados.senh !== senh) {

            /* 401 (Unauthorized): O usuário existe, mas a chave (senha) é inválida */
            return res.status(401).json({ erro: "Senha incorreta!" });
            
        }




        const claimsAdicionais = {
            cpef: cpfLimpo,
            nome: usuarioDados.nome,
            func: usuarioDados.func
        };

        const firebaseToken = await admin.auth().createCustomToken(cpfLimpo, claimsAdicionais);

        // Se deu certo: O servidor responde 200
        res.status(200).json({

            firebaseToken: firebaseToken 

        });

    } catch (error) {

        res.status(500).json({ erro: "Erro interno no servidor de autenticação" });

    }
});




















/* ------------------------------------------------------------ */
/* INICIO da - 🏠 ROTA DE TESTE: Aberta para visualização direta no Browser */
/* ------------------------------------------------------------ */

app.get('/dados-dos-cards-aberto', async (req, res) => {
    
    console.log("");
    console.log("🔓 ----------------------------------");
    console.log("🔓 VISTORIA: Rota aberta acessada pelo Browser!");
    console.log("🔓 ----------------------------------");

    try {

        const usuariosRef = db_admin.ref('usuarios');
        
        const snapshot = await usuariosRef.once('value');

        if (snapshot.exists()) {

            const todosUsuarios = snapshot.val();
            
            /* Transformamos o objeto em lista para os cards */
            const listaFormatada = Object.keys(todosUsuarios).map(id => {

                const user = todosUsuarios[id];

                return {

                    id: id,
                    /* Se o campo não existir, enviamos 'Não Informado' para não quebrar */
                    nome: user?.nome || 'Sem Nome',
                    cpef: user?.cpef || 'Sem CPF',
                    func: user?.func || 'Sem Função',
                    perm: user?.perm || 'comum',
                    situ: user?.situ || 'inativo'

                };

            });

            console.log(`📦 INFO: Enviando ${listaFormatada.length} usuários para o Browser.`);
            
            /* O navegador vai exibir este JSON na tela */
            res.json(listaFormatada);

        } else {

            res.status(404).json({ mensagem: "Nenhum morador encontrado." });

        }

    } catch (erro) {

        console.log("🚨 ERRO DE OBRA: Falha técnica ao buscar usuários.");

        res.status(500).json({ erro: "Erro interno" });

    }

});

/* ------------------------------------------------------------ */
/* FIM da - 🏠 ROTA DE TESTE: Aberta para visualização direta no Browser */
/* ------------------------------------------------------------ */














/* ------------------------------- */
/* INICIO DA - LISTA DE SUARIOS PARA O SIDEBAR */
/* ------------------------------- */

app.get('/api/lista-conversas', async (req, res) => {
    try {

        /* 📐 Mira na raiz das conversas para ver quem são os usuários */
        const ref = db_admin.ref('mensagens/conversas_individuais');
        const snapshot = await ref.once('value');
        const todasConversas = snapshot.val() || {};

        console.log("📐 🔵 Pastas encontradas no Firebase:", Object.keys(todasConversas).length);
        console.log("📐 🔵 todasConversas:", Object.keys(todasConversas));

        /* 🚀 Transforma as pastas de CPF em uma lista de cards para a Sidebar */
        const listaContatos = Object.keys(todasConversas).map(cpf => {
            const mensagens = Object.values(todasConversas[cpf]);
            
            const mensagemDoDonoDaPasta = mensagens.find(m => m.remetente_cpef === cpf);

            const ultimaMsg = mensagens[mensagens.length - 1]; // Pega a última mensagem para o resumo
            
            return {
                cpef: cpf,
                nome: mensagemDoDonoDaPasta ? mensagemDoDonoDaPasta.remetente_nome : (ultimaMsg.remetente_nome || "Usuário"),
                ultimaMsg: ultimaMsg.texto,
                time: ultimaMsg.time,
                timestamp: ultimaMsg.timestamp || 0
            };
        });

        listaContatos.sort((a, b) => b.timestamp - a.timestamp);

        console.log(`✨ 🔵 Sidebar atualizada: ${listaContatos.length} usuários encontrados.`);

        res.status(200).json(listaContatos);

    } catch (error) {

        console.log("❌ Erro ao listar conversas na VPS:", error);
        res.status(500).json({ erro: "Erro ao carregar lista" });

    }
});

/* ------------------------------- */
/* FIM DA - LISTA DE SUARIOS PARA O SIDEBAR */
/* ------------------------------- */













io.on('connection', (socket) => {


    const socketId = socket.id;

    const varTotalConect = io.engine.clientsCount;

    io.emit('totalConect', { 
        varTotalConect: varTotalConect
    });

    console.log(``);
    console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.log("📡🗼 🤝 [APERTO DE MÃO NO PRÉDIO] 🤝");
    console.log("📡🗼 ----------------------");
    console.log("📡🗼 socketId: ", socketId);
    console.log("📡🗼 varTotalConect: ", varTotalConect);
    console.log("📡🗼 ----------------------");
    console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
   







    
    socket.on('disconnect', (reason) => {


        const varTotalAposSaida = io.engine.clientsCount;

        // 🚀 io.emit (Grito Geral para todas as Casas)
        io.emit('totalConect', { 
            varTotalConect: varTotalAposSaida
        });

        console.log("");
        console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴");
        console.log(`📡🗼 Socket-Server percebeu um 📶 SINAL DE DESCONEXAO do SOCKET.IO`);
        console.log(`📡🗼 👤 Alguém saiu (se SE DESCONECTOU) do 🏢 Servidor/VPS (Prédio)`);
        console.log("📡🗼 ----------------------");
        console.log(`📡🗼 ID que se desconectou - socketId: `, socketId);
        console.log(`📡🗼 varTotalAposSaida: `, varTotalAposSaida);
        console.log(`📡🗼⚠️  Motivo: ${reason}`);
        console.log("📡🗼 ----------------------");
        console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴");

    });








    /* ------------------------------------------------------------- */
    /* 🧱 INICIO DO - SERVIDOR: RECEBENDO O BIND E ORGANIZANDO AS SALAS  */
    /* ------------------------------------------------------------- */

    socket.on('bind', (data) => {
        
        const { sender_cpef, user_role, sender_nome } = data;

        socket.join(sender_cpef);

        if (["administrador", "atendente"].includes(user_role)) {

            socket.join('sala_dos_admins');

            console.log(`📐 👔 Suporte Conectado: ${sender_nome} entrou na sala_dos_admins`);

        } else {

            console.log("");
            console.log("✨ 🔵 -------------------------------------------------");
            console.log(`✨ 🔵 Cliente Conectado: ${sender_nome} (CPF: ${sender_cpef})`);
            console.log("✨ 🔵 -------------------------------------------------");

        }

    });

    /* ------------------------------------------------------------- */
    /* 🧱 FIM DO - SERVIDOR: RECEBENDO O BIND E ORGANIZANDO AS SALAS  */
    /* ------------------------------------------------------------- */








    /* ------------------------------------------------------------- */
    /* INICIO DO - MESSAGE: Roteamento Inteligente e Persistência na VPS     */
    /* ------------------------------------------------------------- */

    socket.on('message', async (data) => {
        try {
            const { remetente_cpef, destino_cpef, remetente_func } = data;
            const eEquipe = ["administrador", "atendente"].includes(remetente_func);
            
            // 📐 Definição do destino da pasta no Firebase
            const pastaConversa = eEquipe ? destino_cpef : remetente_cpef;
            const timestamp = Date.now();

            /* 🚀 A. Gravação Soberana na VPS (Firebase) */
            const ref = db_admin.ref(`mensagens/conversas_individuais/${pastaConversa}/${timestamp}`);
            await ref.set({ ...data, timestamp });

            /* 🚀 B. Roteamento por Salas (Socket.io) */
            if (eEquipe) {
                // 1. Envia para a sala do Cliente (destino)
                io.to(destino_cpef).emit('message', data);
                
                // 2. Sincroniza outros dispositivos do próprio Admin (remetente)
                // Usamos socket.to().emit para enviar para TODAS as abas do remetente EXCETO a que enviou
                socket.to(remetente_cpef).emit('message', data);

                io.to('sala_dos_admins').emit('atualizar_sidebar');
                
                console.log(`✨ 👔 Admin enviou para Cliente ${destino_cpef}`);
            } else {
                // 1. Envia para a Sala dos Admins (quem dá o suporte)
                io.to('sala_dos_admins').emit('message', data);
                
                // 2. Sincroniza outros dispositivos do próprio Cliente (remetente)
                socket.to(remetente_cpef).emit('message', data);

                io.to('sala_dos_admins').emit('atualizar_sidebar');
                
                console.log(`✨ 🔵 Cliente ${remetente_cpef} enviou para Suporte`);
            }

        } catch (error) {
            console.log("❌ Erro ao processar mensagem na VPS:", error);
        }
    });

    /* ------------------------------------------------------------- */
    /* FIM DO - MESSAGE: Roteamento Inteligente e Persistência na VPS     */
    /* ------------------------------------------------------------- */
   







 }); // FIM DO io.on('connection', (socket) => {






httpServer.listen(CONFIG.PORTA, '0.0.0.0', () => {

    console.log("")
    console.log("🏢 ----------------------")
    console.log(`🏢 SERVIDOR/PREDIO RODANDO NA PORTA ${CONFIG.PORTA}`);
    console.log("🏢 ----------------------")
    console.log("🏢 📢 Porta 5173 (🏠 Casa/React): Vite");
    console.log("🏢 📢 Porta 3001 (🏢 Prédio/Node): Socket.io")
    console.log("🏢 ----------------------")

});