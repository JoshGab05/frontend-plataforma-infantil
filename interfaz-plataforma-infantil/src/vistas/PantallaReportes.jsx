import { useState } from 'react';
import TableroDocente from '../organismos/TableroDocente';
import BotonAccion from '../atomos/BotonAccion';
import { useNavigate } from 'react-router-dom';

const PantallaReportes = () => {
    const enrutador_navegacion = useNavigate();
    const [acceso_concedido, autorizar_acceso] = useState(false);
    const [pin_ingresado, actualizar_pin] = useState('');

    const verificar_credenciales = (e) => {
        e.preventDefault();
        if (pin_ingresado === 'profe123') {
            autorizar_acceso(true);
        } else {
            alert('PIN incorrecto. Acceso denegado.');
        }
    };

    return (
        <main className="contenedor_pantalla" style={{ justifyContent: 'flex-start', paddingTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>📊 Panel de Docentes</h1>
                <BotonAccion 
                    texto_mostrar="Volver al Inicio" 
                    color_fondo="var(--color-acento)" 
                    evento_presionar={() => enrutador_navegacion('/')} 
                />
            </div>

            {!acceso_concedido ? (
                <form onSubmit={verificar_credenciales} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#fff', padding: '40px', border: '4px solid #1a1a1a', borderRadius: '15px', boxShadow: '6px 6px 0px #1a1a1a', marginTop: '50px' }}>
                    <h2 style={{ margin: 0 }}>Área Restringida</h2>
                    <input 
                        type="password" 
                        placeholder="Ingrese PIN docente" 
                        value={pin_ingresado}
                        onChange={(e) => actualizar_pin(e.target.value)}
                        style={{ padding: '15px', fontSize: '1.2rem', border: '4px solid #1a1a1a' }}
                    />
                    <BotonAccion texto_mostrar="Ingresar" color_fondo="var(--color-secundario)" tipo_boton="submit" />
                </form>
            ) : (
                <TableroDocente />
            )}
        </main>
    );
};

export default PantallaReportes;