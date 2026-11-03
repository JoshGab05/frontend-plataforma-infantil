import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JuegoPrePrimaria from '../organismos/JuegoPrePrimaria';
import JuegoMemoria from '../organismos/JuegoMemoria';
import BotonAccion from '../atomos/BotonAccion';

const PantallaJuegosPrePrimaria = () => {
    const enrutador_navegacion = useNavigate();
    const [actividad_activa, definir_actividad] = useState(null);

    return (
        <main className="fondo_preprimaria">
            <div className="contenedor_ludico">
                {!actividad_activa && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--color-primario)' }}>🐥 Pre-Primaria</h1>
                        <BotonAccion texto_mostrar="Regresar" color_fondo="#ff6b6b" evento_presionar={() => enrutador_navegacion('/seleccion-nivel')} />
                    </div>
                )}
                
                {!actividad_activa ? (
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.8rem' }}>¿A qué jugaremos hoy?</h2>
                        <BotonAccion texto_mostrar="Formas y Espacio" color_fondo="var(--color-secundario)" evento_presionar={() => definir_actividad('formas')} />
                        <BotonAccion texto_mostrar="Juego de Memoria" color_fondo="var(--color-acento)" evento_presionar={() => definir_actividad('memoria')} />
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        {actividad_activa === 'formas' ? (
                            <JuegoPrePrimaria funcion_salir={() => definir_actividad(null)} />
                        ) : (
                            <JuegoMemoria funcion_salir={() => definir_actividad(null)} />
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default PantallaJuegosPrePrimaria;