import { useState, useEffect, useCallback } from 'react';
import BotonAccion from '../atomos/BotonAccion';
import BarraProgreso from '../moleculas/BarraProgreso';
import ModalConfirmacion from '../moleculas/ModalConfirmacion';
import { enviar_puntaje_final } from '../servicios/comunicacion_api';

// Diccionarios para generación procedimental
const pares_espaciales = {
    'Adentro': 'Afuera', 'Afuera': 'Adentro',
    'Arriba': 'Abajo', 'Abajo': 'Arriba',
    'Cerca': 'Lejos', 'Lejos': 'Cerca',
    'arriba': 'Debajo', 'Debajo': 'abajo'
};

const catalogo_bases = [
    { icono: '📦', nombre: 'la caja' }, { icono: '🏠', nombre: 'la casa' },
    { icono: '🪑', nombre: 'la silla' }, { icono: '🌳', nombre: 'el árbol' },
    { icono: '☁️', nombre: 'la nube' }
];

const catalogo_moviles = [
    { icono: '🐶', nombre: 'el perrito' }, { icono: '🐱', nombre: 'el gatito' },
    { icono: '🚗', nombre: 'el carro' }, { icono: '🍎', nombre: 'la manzana' },
    { icono: '✈️', nombre: 'el avión' }, { icono: '⚽', nombre: 'el balón' }
];

const figuras_geometricas = [
    { id: 'c_rojo', base: '🔴', texto: 'Círculo', tipo: 'figura' }, 
    { id: 'c_amar', base: '🟡', texto: 'Círculo', tipo: 'figura' },
    { id: 'cu_azul', base: '🟦', texto: 'Cuadrado', tipo: 'figura' }, 
    { id: 'cu_rojo', base: '🟥', texto: 'Cuadrado', tipo: 'figura' },
    { id: 't_rojo', base: '🔺', texto: 'Triángulo', tipo: 'figura' }, 
    { id: 't_inver', base: '🔻', texto: 'Triángulo', tipo: 'figura' },
    { id: 'r_verd', base: '🟩', texto: 'Rectángulo', tipo: 'rectangulo' }, 
    { id: 'r_nara', base: '🟧', texto: 'Rectángulo', tipo: 'rectangulo' }
];

const EscenaVisual = ({ opcion }) => {
    if (opcion.tipo === 'figura' || opcion.tipo === 'rectangulo') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '4.5rem', transform: opcion.tipo === 'rectangulo' ? 'scaleX(1.6)' : 'none', display: 'inline-block' }}>
                    {opcion.base}
                </span>
                <span className="texto_figura">{opcion.texto}</span>
            </div>
        );
    }

    let est_caja = { position: 'relative', width: '120px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
    let est_base = { fontSize: '4.5rem', zIndex: 1 };
    let est_movil = { fontSize: '2.5rem', position: 'absolute', zIndex: 2 };

    if (opcion.texto === 'Adentro') {
        est_movil.top = '40%'; est_movil.left = '50%'; est_movil.transform = 'translate(-50%, -50%)';
    } else if (opcion.texto === 'Afuera') {
        est_caja.justifyContent = 'space-between'; est_base.position = 'static'; est_movil.position = 'static';
    } else if (opcion.texto === 'Arriba' || opcion.texto === 'arriba') {
        est_movil.top = '-20px';
    } else if (opcion.texto === 'Abajo' || opcion.texto === 'abajo') {
        est_movil.bottom = '-20px';
    } else if (opcion.texto === 'Cerca') {
        est_caja.justifyContent = 'center'; est_caja.gap = '5px'; est_base.position = 'static'; est_movil.position = 'static';
    } else if (opcion.texto === 'Lejos') {
        est_caja.justifyContent = 'space-between'; est_caja.width = '180px'; est_base.position = 'static'; est_movil.position = 'static';
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div style={est_caja}>
                <span style={est_base}>{opcion.base}</span>
                <span style={est_movil}>{opcion.movil}</span>
            </div>
            <span className="texto_figura">{opcion.texto}</span>
        </div>
    );
};

const JuegoPrePrimaria = ({ funcion_salir }) => {
    const [reto_dinamico, actualizar_reto] = useState({ instruccion: '', alternativas: [], respuesta_esperada: {} });
    const [indice_turno, actualizar_turno] = useState(0);
    const [puntos_acumulados, actualizar_puntos] = useState(0);
    const [mensaje_pantalla, cambiar_mensaje] = useState('');
    const [actividad_finalizada, marcar_finalizacion] = useState(false);
    const [alerta_salida, alternar_alerta] = useState(false);
    const total_retos = 7; // Aumentamos las preguntas por sesión

    const armar_reto_aleatorio = useCallback(() => {
        const es_reto_espacial = Math.random() > 0.4; // 60% probabilidad espacial, 40% formas
        let instruccion = '';
        let opciones = [];
        let obj_correcto = {};

        if (es_reto_espacial) {
            const base_random = catalogo_bases[Math.floor(Math.random() * catalogo_bases.length)];
            const movil_random = catalogo_moviles[Math.floor(Math.random() * catalogo_moviles.length)];
            const llaves_conceptos = Object.keys(pares_espaciales);
            const concepto_random = llaves_conceptos[Math.floor(Math.random() * llaves_conceptos.length)];
            const concepto_opuesto = pares_espaciales[concepto_random];

            instruccion = `¿Dónde está ${movil_random.nombre} ${concepto_random.toUpperCase()} de ${base_random.nombre}?`;
            obj_correcto = { id: 'corr', base: base_random.icono, movil: movil_random.icono, texto: concepto_random, tipo: 'espacial' };
            const distractor = { id: 'dist', base: base_random.icono, movil: movil_random.icono, texto: concepto_opuesto, tipo: 'espacial' };
            
            opciones = [obj_correcto, distractor];
} else {
            const figura_objetivo = figuras_geometricas[Math.floor(Math.random() * figuras_geometricas.length)];
            instruccion = `¡Encuentra el ${figura_objetivo.texto}!`;
            obj_correcto = figura_objetivo;
            
            opciones = [obj_correcto];
            while (opciones.length < 3) {
                const distractor = figuras_geometricas[Math.floor(Math.random() * figuras_geometricas.length)];
                // Corrección: Solo agregamos el distractor si su nombre no existe ya en las opciones actuales
                if (!opciones.some(op => op.texto === distractor.texto)) {
                    opciones.push(distractor);
                }
            }
        }

        actualizar_reto({
            instruccion,
            respuesta_esperada: obj_correcto,
            alternativas: opciones.sort(() => Math.random() - 0.5)
        });
    }, []);

    useEffect(() => { armar_reto_aleatorio(); }, [armar_reto_aleatorio]);

    const evaluar_eleccion_infante = async (opcion_seleccionada) => {
        let calculo_puntos = puntos_acumulados;

        if (opcion_seleccionada.id === reto_dinamico.respuesta_esperada.id) {
            cambiar_mensaje('¡Excelente! 🌟');
            calculo_puntos += 20;
            actualizar_puntos(calculo_puntos);
        } else {
            cambiar_mensaje('¡Uy! Intenta de nuevo 🎈');
        }

        setTimeout(async () => {
            cambiar_mensaje('');
            const ronda_siguiente = indice_turno + 1;
            if (ronda_siguiente < total_retos) {
                actualizar_turno(ronda_siguiente);
                armar_reto_aleatorio();
            } else {
                actualizar_turno(total_retos);
                marcar_finalizacion(true);
                const identificador_infante = sessionStorage.getItem('identificador_estudiante');
                await enviar_puntaje_final(identificador_infante, 1, calculo_puntos);
            }
        }, 1500); 
    };

    if (actividad_finalizada) {
        return (
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '40px', border: 'var(--borde-grueso)', borderRadius: '20px', boxShadow: 'var(--sombra-dura)' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primario)' }}>¡Terminaste! 🏆</h2>
                <p style={{ fontSize: '1.5rem' }}>Tu puntuación: {puntos_acumulados} estrellitas</p>
                <BotonAccion texto_mostrar="Elegir otro juego" color_fondo="var(--color-secundario)" evento_presionar={funcion_salir} />
            </div>
        );
    }

    return (
        <>
            <ModalConfirmacion visibilidad_activa={alerta_salida} accion_confirmar={funcion_salir} accion_cancelar={() => alternar_alerta(false)} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: '#fff', padding: '30px', border: 'var(--borde-grueso)', borderRadius: '20px', boxShadow: 'var(--sombra-dura)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Estrellitas: {puntos_acumulados} ⭐</span>
                    <BotonAccion texto_mostrar="Salir ❌" color_fondo="#ff8b94" evento_presionar={() => alternar_alerta(true)} />
                </div>
                
                <BarraProgreso paso_actual={indice_turno} total_pasos={total_retos} />
                <h2 style={{ fontSize: '2rem', textShadow: '2px 2px 0px var(--color-acento)' }}>{reto_dinamico.instruccion}</h2>
                
                <div style={{ height: '40px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: mensaje_pantalla.includes('Excelente') ? '#4ecdc4' : '#ff6b6b' }}>{mensaje_pantalla}</span>
                </div>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {reto_dinamico.alternativas.map((opcion_obj, iterador) => (
                        <div key={iterador} className="figura_gigante" onClick={() => !mensaje_pantalla && evaluar_eleccion_infante(opcion_obj)}>
                            <EscenaVisual opcion={opcion_obj} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default JuegoPrePrimaria;