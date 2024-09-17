// src/App.js
import React, { useState } from 'react';
import Form from './Form';
import './App.css';

const App = () => {
    const [jugadores, setJugadores] = useState([]);
    const [error, setError] = useState('');

    // Contar la cantidad de arqueros actuales
    const contarArqueros = () => {
        return jugadores.filter(jugador => jugador.posicion === 'arquero').length;
    };

    const agregarJugador = (jugador) => {
        if (jugador.posicion === 'arquero' && contarArqueros() >= 2) {
            setError('Solo se permiten 2 arqueros.');
        } else {
            setError('');
            setJugadores([...jugadores, jugador]);
        }
    };

    const generarEquipos = () => {
        const equipo1 = [];
        const equipo2 = [];
        let habilidadEquipo1 = 0;
        let habilidadEquipo2 = 0;
        let arqueros = 0;

        const jugadoresOrdenados = [...jugadores].sort((a, b) => b.habilidad - a.habilidad);

        jugadoresOrdenados.forEach((jugador) => {
            // Asignar arqueros a equipos diferentes
            if (jugador.posicion === 'arquero') {
                if (arqueros === 0) {
                    equipo1.push(jugador);
                    habilidadEquipo1 += jugador.habilidad;
                } else {
                    equipo2.push(jugador);
                    habilidadEquipo2 += jugador.habilidad;
                }
                arqueros += 1;
            } else {
                // Balancear el resto de jugadores
                if (habilidadEquipo1 <= habilidadEquipo2) {
                    equipo1.push(jugador);
                    habilidadEquipo1 += jugador.habilidad;
                } else {
                    equipo2.push(jugador);
                    habilidadEquipo2 += jugador.habilidad;
                }
            }
        });

        return { equipo1, equipo2 };
    };

    const equipos = generarEquipos();

    return (
        <div className="container mt-5">
            <h1 className="text-center">Fulbito de los miércoles (en desarrollo)</h1>
            <div className="card p-4 mt-4 shadow">
                {error && <div className="alert alert-danger">{error}</div>}
                <Form agregarJugador={agregarJugador} />
            </div>

            <div className="mt-4">
                <h2 className="text-center">Anotados</h2>
                <ul className="list-group">
                    {jugadores.map((jugador, index) => (
                        <li className="list-group-item" key={index}>
                            {jugador.nombre} - {jugador.posicion} (Habilidad: {jugador.habilidad})
                        </li>
                    ))}
                </ul>
            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <h3 className="text-center">Equipo Celeste y Blanca</h3>
                    <ul className="list-group">
                        {equipos.equipo1.map((jugador, index) => (
                            <li className="list-group-item" key={index}>
                                {jugador.nombre} - {jugador.posicion} (Habilidad: {jugador.habilidad})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center">Equipo Lila</h3>
                    <ul className="list-group">
                        {equipos.equipo2.map((jugador, index) => (
                            <li className="list-group-item" key={index}>
                                {jugador.nombre} - {jugador.posicion} (Habilidad: {jugador.habilidad})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;