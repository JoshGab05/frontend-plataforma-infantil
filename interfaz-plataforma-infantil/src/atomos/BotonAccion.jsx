import estilos from './BotonAccion.module.css';

const BotonAccion = ({ texto_mostrar, evento_presionar, color_fondo, tipo_boton = "button" }) => {
    return (
        <button 
            type={tipo_boton}
            className={estilos.boton_interactivo} 
            style={{ backgroundColor: color_fondo }}
            onClick={evento_presionar}
        >
            {texto_mostrar}
        </button>
    );
};

export default BotonAccion;