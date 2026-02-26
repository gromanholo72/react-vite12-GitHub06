import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaMenuHamburguer.css';

export const BalaoDicaMenuHamburguer = ({ 

    exibirBalaoDicaMenuHamburguer, 
    setExibirBalaoDicaMenuHamburguer, 
    dadosToken, 
    acaoAbrirMenu,
    secaoAberta, 
    setSecaoAberta 
    
}) => {
    
    return (
        /* 🧱 O Container externo fica SEMPRE presente */
        <div className="container-externo-blindado-sincronizado" data-func={dadosToken?.func}>
            
            {/* 🍔 O Botão que NUNCA some */}
            <button 
                className={`btn-menu-base ${exibirBalaoDicaMenuHamburguer ? 'pulsar-ativo' : ''}`}
                onClick={() => {
                    // Se a dica estiver aberta, fecha a dica.
                    if (exibirBalaoDicaMenuHamburguer) {
                        setExibirBalaoDicaMenuHamburguer(false);
                    }

                    // ✨ Lógica de Toggle: Se estiver aberto, fecha (null). Se estiver fechado, abre.
                    if (secaoAberta === 'menu-aberto') {
                        console.log("📐 🔵 Fechando menu via Hambúrguer");
                        setSecaoAberta(null);
                    } else {
                        console.log("📐 🔵 Abrindo menu via Hambúrguer");
                        acaoAbrirMenu(); 
                    }
                }}
            >
                ☰
            </button>

            {/* 🎈 Apenas o BALÃO e o efeito extra entram no AnimatePresence */}
            <AnimatePresence>
                {exibirBalaoDicaMenuHamburguer && (
                    <motion.div 
                        key="balao-dica"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="BalaoDicaCorpo"
                    >
                        👋 Toque aqui para navegar!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};