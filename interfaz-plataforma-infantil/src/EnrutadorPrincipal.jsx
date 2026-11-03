import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PantallaRegistro from './vistas/PantallaRegistro';
import PantallaMenuNivel from './vistas/PantallaMenuNivel';
import PantallaJuegosPrePrimaria from './vistas/PantallaJuegosPrePrimaria';
import PantallaJuegosPrimaria from './vistas/PantallaJuegosPrimaria';
import PantallaReportes from './vistas/PantallaReportes';

const EnrutadorPrincipal = () => {
    return (
        <BrowserRouter>
            <Link to="/area-docente" style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', zIndex: 1000 }}>
                Acceso Docentes
            </Link>
            
            <Routes>
                <Route path="/" element={<PantallaRegistro />} />
                <Route path="/seleccion-nivel" element={<PantallaMenuNivel />} />
                <Route path="/zona-juegos/pre-primaria" element={<PantallaJuegosPrePrimaria />} />
                <Route path="/zona-juegos/primaria" element={<PantallaJuegosPrimaria />} />
                <Route path="/area-docente" element={<PantallaReportes />} />
            </Routes>
        </BrowserRouter>
    );
};

export default EnrutadorPrincipal;