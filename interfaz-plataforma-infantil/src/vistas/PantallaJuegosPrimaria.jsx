import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JuegoMatematicas from '../organismos/JuegoMatematicas';
import BotonAccion from '../atomos/BotonAccion';

const PantallaJuegosPrimaria = () => {
    const enrutador_navegacion = useNavigate();
    const [actividad_activa, definir_actividad] = useState(null);

    const renderizar_juego = () => {
        switch (actividad_activa) {
            // Pasamos "funcion_salir" para que el componente hijo controle el flujo
            case 'tablas': return <JuegoMatematicas categoria_matematica="tablas" id_actividad_bd={10} funcion_salir={() => definir_actividad(null)} />;
            case 'quebrados': return <JuegoMatematicas categoria_matematica="quebrados" id_actividad_bd={11} funcion_salir={() => definir_actividad(null)} />;
            case 'decimales': return <JuegoMatematicas categoria_matematica="decimales" id_actividad_bd={12} funcion_salir={() => definir_actividad(null)} />;
            default: return null;
        }
    };

    return (
        <main className="fondo_inicio">
            <div className="contenedor_ludico">
                {!actividad_activa && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--color-primario)' }}>🎒 Primaria</h1>
                        <BotonAccion texto_mostrar="Regresar" color_fondo="#ff6b6b" evento_presionar={() => enrutador_navegacion('/seleccion-nivel')} />
                    </div>
                )}
                
                {!actividad_activa ? (
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.8rem' }}>Selecciona tu Reto</h2>
                        <BotonAccion texto_mostrar="Tablas de Multiplicar" color_fondo="var(--color-primario)" evento_presionar={() => definir_actividad('tablas')} />
                        <BotonAccion texto_mostrar="Suma de Quebrados" color_fondo="#a8e6cf" evento_presionar={() => definir_actividad('quebrados')} />
                        <BotonAccion texto_mostrar="Decimales" color_fondo="#ff8b94" evento_presionar={() => definir_actividad('decimales')} />
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        {renderizar_juego()}
                    </div>
                )}
            </div>
        </main>
    );
};

export default PantallaJuegosPrimaria;