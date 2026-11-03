import BotonAccion from '../atomos/BotonAccion';

const ModalConfirmacion = ({ visibilidad_activa, accion_confirmar, accion_cancelar }) => {
    if (!visibilidad_activa) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div className="contenedor_ludico" style={{ maxWidth: '450px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#ff6b6b', margin: 0 }}>¡Espera un momento! 🛑</h2>
                <p style={{ fontSize: '1.4rem' }}>Si sales ahora, perderás las estrellitas que llevas en este juego. ¿Seguro que quieres salir?</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <BotonAccion texto_mostrar="No, me quedo 🎮" color_fondo="var(--color-secundario)" evento_presionar={accion_cancelar} />
                    <BotonAccion texto_mostrar="Sí, salir 🏃" color_fondo="#ff8b94" evento_presionar={accion_confirmar} />
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;