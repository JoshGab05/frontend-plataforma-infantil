import { useState, useEffect } from 'react';
import estilos from '../moleculas/TarjetaMemoria.module.css';
import BotonAccion from '../atomos/BotonAccion';
import BarraProgreso from '../moleculas/BarraProgreso';
import ModalConfirmacion from '../moleculas/ModalConfirmacion';
import { enviar_puntaje_final } from '../servicios/comunicacion_api';

const gran_catalogo_emojis = ['🐶', '🐱', '🚗', '🍎', '🐸', '🚀', '🎸', '⚽', '🍕', '🧸', '🌞', '🎈', '🐠', '🦋', '🚁'];

const JuegoMemoria = ({ funcion_salir }) => {
    const [tablero_fichas, definir_tablero] = useState([]);
    const [fichas_volteadas, actualizar_volteadas] = useState([]);
    const [pares_descubiertos, agregar_par] = useState([]);
    const pares_totales = 4;
    const [puntos_memoria, actualizar_puntos] = useState(0);
    const [juego_terminado, marcar_terminado] = useState(false);
    const [alerta_salida, alternar_alerta] = useState(false);

    useEffect(() => {
        // Seleccionar 4 emojis únicos al azar para esta partida
        const emojis_mezclados = [...gran_catalogo_emojis].sort(() => Math.random() - 0.5).slice(0, 4);
        
        // Duplicarlos para crear los pares
        const elementos_partida = [...emojis_mezclados, ...emojis_mezclados];
        
        const fichas_preparadas = elementos_partida
            .sort(() => Math.random() - 0.5)
            .map((icono, indice) => ({ identificador: indice, contenido: icono }));
            
        definir_tablero(fichas_preparadas);
    }, []);

    const procesar_clic_ficha = (ficha_pulsada) => {
        if (fichas_volteadas.length === 2 || pares_descubiertos.includes(ficha_pulsada.identificador) || fichas_volteadas.some(f => f.identificador === ficha_pulsada.identificador)) return;

        const nuevas_volteadas = [...fichas_volteadas, ficha_pulsada];
        actualizar_volteadas(nuevas_volteadas);

        if (nuevas_volteadas.length === 2) {
            if (nuevas_volteadas[0].contenido === nuevas_volteadas[1].contenido) {
                const nuevos_pares = [...pares_descubiertos, nuevas_volteadas[0].identificador, nuevas_volteadas[1].identificador];
                agregar_par(nuevos_pares);
                const nuevo_puntaje = puntos_memoria + 50;
                actualizar_puntos(nuevo_puntaje);
                actualizar_volteadas([]);

                // Validación de partida ganada (4 pares = 8 fichas descubiertas)
                if (nuevos_pares.length === 8) {
                    finalizar_partida(nuevo_puntaje);
                }
            } else {
                setTimeout(() => actualizar_volteadas([]), 1000);
            }
        }
    };

    const finalizar_partida = async (puntaje_obtenido) => {
        marcar_terminado(true);
        const identificador_infante = sessionStorage.getItem('identificador_estudiante');
        await enviar_puntaje_final(identificador_infante, 9, puntaje_obtenido);
    };

    if (juego_terminado) {
        return (
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '40px', border: 'var(--borde-grueso)', borderRadius: '20px', boxShadow: 'var(--sombra-dura)' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primario)' }}>¡Memoria de Elefante! 🐘</h2>
                <p style={{ fontSize: '1.5rem' }}>Puntuación final: {puntos_memoria} estrellitas</p>
                <BotonAccion texto_mostrar="Elegir otro juego" color_fondo="var(--color-secundario)" evento_presionar={funcion_salir} />
            </div>
        );
    }

    return (
        <>
            <ModalConfirmacion 
                visibilidad_activa={alerta_salida} 
                accion_confirmar={funcion_salir} 
                accion_cancelar={() => alternar_alerta(false)} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: '#fff', padding: '30px', border: 'var(--borde-grueso)', borderRadius: '20px', boxShadow: 'var(--sombra-dura)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Estrellitas: {puntos_memoria} ⭐</span>
                    <BotonAccion texto_mostrar="Salir ❌" color_fondo="#ff8b94" evento_presionar={() => alternar_alerta(true)} />
                </div>
                
                <BarraProgreso paso_actual={pares_descubiertos.length / 2} total_pasos={pares_totales} />

                <h2 style={{ fontSize: '2rem' }}>Encuentra las parejas</h2>
                
                <div className={estilos.cuadricula_memoria}>
                    {tablero_fichas.map((ficha) => {
                        const esta_revelada = fichas_volteadas.includes(ficha) || pares_descubiertos.includes(ficha.identificador);
                        return (
                            <div 
                                key={ficha.identificador} 
                                className={esta_revelada ? estilos.ficha_revelada : estilos.ficha_oculta}
                                onClick={() => procesar_clic_ficha(ficha)}
                            >
                                {esta_revelada ? ficha.contenido : '❓'}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default JuegoMemoria;