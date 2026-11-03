import FormularioIngreso from '../moleculas/FormularioIngreso';

const PantallaRegistro = () => {
    return (
        <main className="fondo_inicio">
            <div className="contenedor_ludico" style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '3rem', textShadow: '3px 3px 0px var(--color-secundario)', margin: '0 0 10px 0', lineHeight: '1.2' }}>
                    Aventura Educativa
                </h1>
                
                <img 
                    src="/imagenes/Niños_jugando.jpg" 
                    alt="Niños construyendo con bloques" 
                    style={{ width: '220px', marginBottom: '20px', borderRadius: '15px' }} 
                />
                
                <FormularioIngreso />
            </div>
        </main>
    );
};

export default PantallaRegistro;