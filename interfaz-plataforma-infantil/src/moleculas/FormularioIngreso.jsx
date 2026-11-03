import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonAccion from '../atomos/BotonAccion';
import { enviar_datos_infante } from '../servicios/comunicacion_api';

const FormularioIngreso = () => {
    const enrutador_navegacion = useNavigate();
    const [nombre_capturado, actualizar_nombre] = useState('');
    const [edad_capturada, actualizar_edad] = useState('');

    const procesar_ingreso = async (evento_formulario) => {
        evento_formulario.preventDefault();
        try {
            const respuesta_servidor = await enviar_datos_infante(nombre_capturado, edad_capturada);
            if (respuesta_servidor.id_asignado) {
                sessionStorage.setItem('identificador_estudiante', respuesta_servidor.id_asignado);
                sessionStorage.setItem('nombre_estudiante', nombre_capturado); // Guardamos el nombre para el saludo
                enrutador_navegacion('/seleccion-nivel'); // <-- Redirección corregida
            }
        } catch (falla_red) {
            alert("No se pudo conectar con el servidor central.");
        }
    };

    return (
        <form onSubmit={procesar_ingreso} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
            <input 
                type="text" 
                placeholder="¿Cómo te llamas?" 
                value={nombre_capturado}
                onChange={(e) => actualizar_nombre(e.target.value)}
                style={{ padding: '15px', fontSize: '1.2rem', border: '4px solid #1a1a1a', borderRadius: '8px' }}
                required 
            />
            <input 
                type="number" 
                placeholder="¿Cuántos años tienes?" 
                value={edad_capturada}
                onChange={(e) => actualizar_edad(e.target.value)}
                style={{ padding: '15px', fontSize: '1.2rem', border: '4px solid #1a1a1a', borderRadius: '8px' }}
                min="3" max="15" required 
            />
            <BotonAccion texto_mostrar="¡A Jugar!" color_fondo="var(--color-primario)" tipo_boton="submit" />
        </form>
    );
};

export default FormularioIngreso;