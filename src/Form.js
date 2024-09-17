import React, { useState } from 'react';

const Form = ({ agregarJugador }) => {
    const [nombre, setNombre] = useState('');
    const [habilidad, setHabilidad] = useState(1);
    const [posicion, setPosicion] = useState('arquero');

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarJugador({ nombre, habilidad, posicion });
        setNombre('');
        setHabilidad(1);
        setPosicion('arquero');
    };

    const handleHabilidadClick = (valor) => {
        setHabilidad(valor);
    };

    const handlePosicionChange = (e) => {
        setPosicion(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del jugador:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="habilidad" className="form-label">Habilidad del jugador:</label>
                <div id="habilidad" className="d-flex align-items-center">
                    {[1, 2, 3].map((valor) => (
                        <i
                            key={valor}
                            className={`fas fa-futbol fa-2x mx-2 ${habilidad >= valor ? 'text-warning' : 'text-secondary'}`}
                            onClick={() => handleHabilidadClick(valor)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Posición del jugador:</label>
                <div className="d-flex flex-column">
                    <label className="form-check">
                        <input 
                            type="radio" 
                            name="posicion" 
                            value="arquero" 
                            className="form-check-input" 
                            checked={posicion === 'arquero'}
                            onChange={handlePosicionChange} 
                        />
                        Arquero
                    </label>
                    <label className="form-check">
                        <input 
                            type="radio" 
                            name="posicion" 
                            value="defensor" 
                            className="form-check-input" 
                            checked={posicion === 'defensor'}
                            onChange={handlePosicionChange} 
                        />
                        Defensor
                    </label>
                    <label className="form-check">
                        <input 
                            type="radio" 
                            name="posicion" 
                            value="mediocampista" 
                            className="form-check-input" 
                            checked={posicion === 'mediocampista'}
                            onChange={handlePosicionChange} 
                        />
                        Mediocampista
                    </label>
                    <label className="form-check">
                        <input 
                            type="radio" 
                            name="posicion" 
                            value="atacante" 
                            className="form-check-input" 
                            checked={posicion === 'atacante'}
                            onChange={handlePosicionChange} 
                        />
                        Atacante
                    </label>
                </div>
            </div>

            <button type="submit" className="btn btn-success w-100">Agregar Jugador</button>
        </form>
    );
};

export default Form;
