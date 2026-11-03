import { useState, useEffect, useCallback } from 'react';
import BotonAccion from '../atomos/BotonAccion';
import BarraProgreso from '../moleculas/BarraProgreso';
import ModalConfirmacion from '../moleculas/ModalConfirmacion';
import { enviar_puntaje_final } from '../servicios/comunicacion_api';

const JuegoMatematicas = ({ categoria_matematica, id_actividad_bd, funcion_salir }) => {
    const [reto_numerico, actualizar_reto] = useState({ pregunta: '', respuesta_esperada: '', alternativas: [] });
    const [puntaje_logrado, actualizar_puntaje] = useState(0);
    const [rondas_jugadas, aumentar_ronda] = useState(0);
    const [mensaje_visual, cambiar_mensaje] = useState('');
    const [modulo_completado, marcar_completado] = useState(false);
    const [alerta_salida, alternar_alerta] = useState(false); // Estado para el modal
    const total_rondas = 5;

    const armar_nuevo_desafio = useCallback(() => {
        // ... (Mantén exactamente la misma lógica matemática que ya tenías aquí) ...
        let enunciado = '';
        let solucion_correcta = '';

        if (categoria_matematica === 'tablas') {
            const factor_uno = Math.floor(Math.random() * 9) + 2;
            const factor_dos = Math.floor(Math.random() * 9) + 2;
            enunciado = `¿Cuánto es ${factor_uno} x ${factor_dos}?`;
            solucion_correcta = String(factor_uno * factor_dos);
        } else if (categoria_matematica === 'quebrados') {
            const denominador = Math.floor(Math.random() * 6) + 2;
            const numerador_uno = Math.floor(Math.random() * 5) + 1;
            const numerador_dos = Math.floor(Math.random() * 5) + 1;
            enunciado = `Suma: ${numerador_uno}/${denominador} + ${numerador_dos}/${denominador}`;
            solucion_correcta = `${numerador_uno + numerador_dos}/${denominador}`;
        } else if (categoria_matematica === 'decimales') {
            const decimal = (Math.random() * 5 + 1).toFixed(1);
            const entero = Math.floor(Math.random() * 4) + 2;
            enunciado = `Multiplica: ${decimal} x ${entero}`;
            solucion_correcta = (parseFloat(decimal) * entero).toFixed(1);
        }

        let conjunto_opciones = [solucion_correcta];
        while (conjunto_opciones.length < 3) {
            let distractor = '';
            if (categoria_matematica === 'quebrados') {
                distractor = `${Math.floor(Math.random() * 10) + 1}/${Math.floor(Math.random() * 6) + 2}`;
            } else if (categoria_matematica === 'decimales') {
                distractor = (parseFloat(solucion_correcta) + (Math.random() > 0.5 ? 1.5 : -1.2)).toFixed(1);
            } else {
                distractor = String(Number(solucion_correcta) + (Math.floor(Math.random() * 10) - 5));
            }
            if (!conjunto_opciones.includes(distractor) && distractor !== "0" && !distractor.includes('-')) {
                conjunto_opciones.push(distractor);
            }
        }
        
        actualizar_reto({
            pregunta: enunciado,
            respuesta_esperada: solucion_correcta,
            alternativas: conjunto_opciones.sort(() => Math.random() - 0.5)
        });
    }, [categoria_matematica]);

    useEffect(() => { armar_nuevo_desafio(); }, [armar_nuevo_desafio]);

    const validar_respuesta_estudiante = async (valor_seleccionado) => {
        let calculo_puntos = puntaje_logrado;
        
        if (valor_seleccionado === reto_numerico.respuesta_esperada) {
            cambiar_mensaje('¡Respuesta Brillante! 🚀');
            calculo_puntos += 20;
            actualizar_puntaje(calculo_puntos);
        } else {
            cambiar_mensaje('¡Casi! Piensa un poco más 🧠');
        }

        setTimeout(async () => {
            cambiar_mensaje('');
            const ronda_siguiente = rondas_jugadas + 1;
            if (ronda_siguiente < total_rondas) {
                aumentar_ronda(ronda_siguiente);
                armar_nuevo_desafio();
            } else {
                aumentar_ronda(total_rondas); // Llenar la barra al final
                marcar_completado(true);
                const identificador_infante = sessionStorage.getItem('identificador_estudiante');
                await enviar_puntaje_final(identificador_infante, id_actividad_bd, calculo_puntos);
            }
        }, 1500);
    };

    if (modulo_completado) {
        return (
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '40px', border: 'var(--borde-grueso)', borderRadius: '20px', boxShadow: 'var(--sombra-dura)' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primario)' }}>¡Reto Matemático Superado! 🏆</h2>
                <p style={{ fontSize: '1.5rem' }}>Puntos obtenidos: {puntaje_logrado}</p>
                <BotonAccion texto_mostrar="Elegir otro reto" color_fondo="var(--color-secundario)" evento_presionar={funcion_salir} />
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
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Estrellitas: {puntaje_logrado} ⭐</span>
                    <BotonAccion texto_mostrar="Salir ❌" color_fondo="#ff8b94" evento_presionar={() => alternar_alerta(true)} />
                </div>
                
                <BarraProgreso paso_actual={rondas_jugadas} total_pasos={total_rondas} />

                <h2 style={{ fontSize: '3rem', textShadow: '2px 2px 0px var(--color-acento)', margin: 0 }}>{reto_numerico.pregunta}</h2>
                
                <div style={{ height: '40px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: mensaje_visual.includes('Brillante') ? '#4ecdc4' : '#ff6b6b' }}>
                        {mensaje_visual}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {reto_numerico.alternativas.map((opcion, indice) => (
                        <div 
                            key={indice} 
                            className="figura_gigante"
                            style={{ padding: '20px 40px', fontSize: '2rem' }}
                            onClick={() => !mensaje_visual && validar_respuesta_estudiante(opcion)}
                        >
                            <span className="texto_figura">{opcion}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default JuegoMatematicas;