import { useState } from 'react';
import JuegoPrePrimaria from '../organismos/JuegoPrePrimaria';
import JuegoMemoria from '../organismos/JuegoMemoria';
import JuegoMatematicas from '../organismos/JuegoMatematicas';
import BotonAccion from '../atomos/BotonAccion';

const PantallaJuegos = () => {
    const [actividad_activa, definir_actividad] = useState(null);

    // Los IDs corresponden a la base de datos SQL insertada previamente
    const renderizar_actividad_seleccionada = () => {
        switch (actividad_activa) {
            case 'formas': return <JuegoPrePrimaria />;
            case 'memoria': return <JuegoMemoria />;
            case 'tablas': return <JuegoMatematicas categoria_matematica="tablas" id_actividad_bd={10} />;
            case 'quebrados': return <JuegoMatematicas categoria_matematica="quebrados" id_actividad_bd={11} />;
            case 'decimales': return <JuegoMatematicas categoria_matematica="decimales" id_actividad_bd={12} />;
            default: return null;
        }
    };

    return (
        <main className="contenedor_pantalla">
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🕹️ Zona Mágica</h1>
            
            {!actividad_activa ? (
                <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h3 style={{ borderBottom: '4px solid #1a1a1a', paddingBottom: '10px' }}>🐥 Pre-Primaria</h3>
                        <BotonAccion texto_mostrar="Formas y Espacio" color_fondo="var(--color-secundario)" evento_presionar={() => definir_actividad('formas')} />
                        <BotonAccion texto_mostrar="Memoria" color_fondo="var(--color-acento)" evento_presionar={() => definir_actividad('memoria')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h3 style={{ borderBottom: '4px solid #1a1a1a', paddingBottom: '10px' }}>🎒 Primaria</h3>
                        <BotonAccion texto_mostrar="Tablas de Multiplicar" color_fondo="var(--color-primario)" evento_presionar={() => definir_actividad('tablas')} />
                        <BotonAccion texto_mostrar="Suma de Quebrados" color_fondo="#a8e6cf" evento_presionar={() => definir_actividad('quebrados')} />
                        <BotonAccion texto_mostrar="Decimales" color_fondo="#ff8b94" evento_presionar={() => definir_actividad('decimales')} />
                    </div>
                </div>
            ) : (
                renderizar_actividad_seleccionada()
            )}
        </main>
    );
};

export default PantallaJuegos;