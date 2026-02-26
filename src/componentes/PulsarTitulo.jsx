
/* // 🧱 Componente Especializado: PulsarTitulo.jsx */
import React from 'react';
import './PulsarTitulo.css';

export const PulsarTitulo = ({ children, ativo, className = "" }) => {
    
    // 🧱 Se estiver ativo, injetamos a classe de animação
    const classeAnimacao = ativo ? 'efeito-pulsar-ativo' : '';

    console.log("");
    console.log("📐 ----------------------------------");
    console.log("📐 Componente - 💡 PulsarTitulo.jsx");
    console.log("📐 🔵 Estado 'ativo' = ", ativo);
    console.log("📐 🧱 Children: ", children);
    console.log("📐 ----------------------------------");

    return (
        <span className={`${className} ${classeAnimacao} container-pulsar-titulo`}>
            {children}
        </span>
    );
};