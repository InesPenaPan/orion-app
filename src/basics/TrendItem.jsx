// src/basics/TrendItem.jsx (Componente TrendItem con gráfica de color azul)
import React from 'react';

const TrendItem = ({ title, trendData, isPositive = true }) => {
    // Título más pequeño y color neutro (text-gray-800)
    const titleColor = "text-gray-800"; 

    const SimpleLineChart = ({ data, positive }) => {
        // --- 1. CONFIGURACIÓN DEL VIEWPORT Y COLORES ---
        const WIDTH = 120; 
        const HEIGHT = 35;
        
        // 💡 CAMBIO CLAVE: Color fijo cambiado a azul
        const lineColor = "#1E88E5"; // 👈 Código Hexadecimal para un azul brillante/corporativo
        
        const gradientId = `trendGradient-${Math.random().toString(36).substring(7)}`; 

        if (!data || data.length < 2) {
            return (
                <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x={WIDTH / 2} y={HEIGHT / 2} fontSize="10" textAnchor="middle" fill={lineColor}>No Data</text>
                </svg>
            );
        }

        // --- 2. Lógica de Escalado (Sin cambios) ---
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        const scaleY = (value) => {
            if (range === 0) return HEIGHT / 2;
            return HEIGHT - ((value - minValue) / range) * (HEIGHT - 2);
        };

        const scaleX = (index) => {
            return (index / (data.length - 1)) * WIDTH;
        };

        const pathData = data.map((value, index) => {
            const x = scaleX(index);
            const y = scaleY(value);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        
        // --- 3. RENDERIZADO DEL SVG ---
        return (
            <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* El gradiente también usa el nuevo color azul */}
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: lineColor, stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: lineColor, stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                
                <path 
                    d={pathData}
                    stroke={`url(#${gradientId})`} // Usa el gradiente del color fijo
                    strokeWidth="2" 
                    fill="none"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </svg>
        );
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            {/* Izquierda: Palabra más pequeña y neutra (text-base) */}
            <span className={`text-base font-semibold ${titleColor}`}>
                {title}
            </span>

            {/* Derecha: Gráfica más grande (w-34 h-12) */}
            <div className="w-34 h-12 flex items-center justify-center">
                <SimpleLineChart data={trendData} positive={isPositive} />
            </div>
        </div>
    );
};

export default TrendItem;