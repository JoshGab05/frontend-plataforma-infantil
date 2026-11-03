import { useState, useEffect } from 'react';
import { extraer_historial_docente } from '../servicios/comunicacion_api';
import estilos from './TablaReportes.module.css';
import BotonAccion from '../atomos/BotonAccion';

const TableroDocente = () => {
    const [listado_progresos, cargar_progresos] = useState([]);
    const [termino_busqueda, actualizar_busqueda] = useState('');
    const [estado_carga, cambiar_estado_carga] = useState(true);

    useEffect(() => {
        const obtener_datos = async () => {
            try {
                const respuesta = await extraer_historial_docente();
                cargar_progresos(respuesta.registros || []);
            } catch (error) {
                console.error("Fallo al obtener el historial", error);
            } finally {
                cambiar_estado_carga(false);
            }
        };
        obtener_datos();
    }, []);

    const registros_filtrados = listado_progresos.filter((registro) => 
        registro.nombre_completo.toLowerCase().includes(termino_busqueda.toLowerCase())
    );

    if (estado_carga) return <h2>Cargando registros...</h2>;

    return (
        <div style={{ width: '100%', maxWidth: '1000px' }}>
            <div className={estilos.contenedor_filtros}>
                <input 
                    type="text" 
                    placeholder="🔍 Buscar por nombre del estudiante..." 
                    value={termino_busqueda}
                    onChange={(e) => actualizar_busqueda(e.target.value)}
                    className={estilos.caja_busqueda}
                />
                <BotonAccion 
                    texto_mostrar="Limpiar" 
                    color_fondo="var(--color-primario)" 
                    evento_presionar={() => actualizar_busqueda('')} 
                />
            </div>

            <table className={estilos.tabla_brutalista}>
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th>Edad</th>
                        <th>Juego</th>
                        <th>Tema</th>
                        <th>Puntaje</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {registros_filtrados.length > 0 ? (
                        registros_filtrados.map((fila, indice) => (
                            <tr key={indice}>
                                <td>{fila.nombre_completo}</td>
                                <td>{fila.edad_anios}</td>
                                <td>{fila.titulo_juego}</td>
                                <td>{fila.clasificacion_tema}</td>
                                <td>{fila.puntuacion_obtenida}</td>
                                <td>{new Date(fila.fecha_ejecucion_juego).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No hay registros para este estudiante.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableroDocente;