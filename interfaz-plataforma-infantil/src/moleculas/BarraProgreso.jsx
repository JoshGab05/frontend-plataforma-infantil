const BarraProgreso = ({ paso_actual, total_pasos }) => {
    const porcentaje_llenado = (paso_actual / total_pasos) * 100;

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '10px auto 20px', border: '4px solid #1a1a1a', borderRadius: '15px', backgroundColor: '#fff', overflow: 'hidden', height: '30px', boxShadow: '4px 4px 0px #1a1a1a' }}>
            <div style={{ 
                width: `${porcentaje_llenado}%`, 
                backgroundColor: 'var(--color-secundario)', 
                height: '100%', 
                transition: 'width 0.4s ease-in-out' 
            }} />
        </div>
    );
};

export default BarraProgreso;