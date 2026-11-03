import { useNavigate } from 'react-router-dom';

const PantallaMenuNivel = () => {
    const enrutador_navegacion = useNavigate();
    const nombre_estudiante = sessionStorage.getItem('nombre_estudiante') || 'Amiguito';

    return (
        <main className="fondo_inicio">
            <div className="contenedor_ludico" style={{ maxWidth: '900px' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', textShadow: '3px 3px 0px var(--color-acento)' }}>
                    ¡Hola, {nombre_estudiante}! 👋
                </h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>¿Qué nivel vamos a explorar hoy?</p>
                
                <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div 
                        className="tarjeta_nivel" 
                        style={{ backgroundColor: '#ff8b94' }}
                        onClick={() => enrutador_navegacion('/zona-juegos/pre-primaria')}
                    >
                        <span style={{ fontSize: '4rem' }}>🐥</span>
                        <span>PRE-PRIMARIA</span>
                    </div>

                    <div 
                        className="tarjeta_nivel" 
                        style={{ backgroundColor: 'var(--color-secundario)' }}
                        onClick={() => enrutador_navegacion('/zona-juegos/primaria')}
                    >
                        <span style={{ fontSize: '4rem' }}>🎒</span>
                        <span>PRIMARIA</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PantallaMenuNivel;