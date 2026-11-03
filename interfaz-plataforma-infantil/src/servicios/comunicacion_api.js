const URL_BASE = 'https://multiplatafomra-ninos.onrender.com/api/v1/plataforma-infantil';

export const enviar_datos_infante = async (nombre_capturado, edad_capturada) => {
    const respuesta = await fetch(`${URL_BASE_BACKEND}/registrar-estudiante`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_completo: nombre_capturado, edad_anios: edad_capturada })
    });
    return respuesta.json();
};

export const extraer_historial_docente = async () => {
    const respuesta = await fetch(`${URL_BASE_BACKEND}/tablero-docentes`);
    return respuesta.json();
};

export const enviar_puntaje_final = async (id_infante, id_juego, puntaje) => {
    const respuesta = await fetch(`${URL_BASE_BACKEND}/guardar-resultado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_infante, id_juego, puntaje })
    });
    return respuesta.json();
};