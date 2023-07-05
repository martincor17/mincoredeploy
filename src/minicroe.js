import React, { useState, useEffect } from 'react';
import supabase from './supabase';

const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from('Usuarios').select('*');
    if (error) {
      console.error('Error fetching usuarios:', error);
    } else {
      setUsuarios(data);
      console.log(data);
    }
  };

  const filterUsuariosByDateRange = () => {
    if (!startDate || !endDate) return;

    const filteredData = usuarios.filter((usuario) => {
      const fechaVenta = new Date(usuario.FechaVenta);
      return fechaVenta >= startDate && fechaVenta <= endDate;
    });

    setFilteredUsuarios(filteredData);
  };

  const calculateTotalCuota = (nombre) => {
    const filteredData = filteredUsuarios.filter(
      (usuario) => usuario.Nombre === nombre
    );

    return filteredData.reduce((total, usuario) => total + usuario.Cuota, 0);
  };

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <div>
        <label htmlFor="start-date">Start Date: </label>
        <input
          type="date"
          id="start-date"
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date: </label>
        <input type="date" id="end-date" onChange={handleEndDateChange} />
      </div>
      <button onClick={filterUsuariosByDateRange}>Filter</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Producto</th>
            <th>Fecha Venta</th>
            <th>Cuota</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.length > 0
            ? filteredUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.Nombre}</td>
                  <td>{usuario.Producto}</td>
                  <td>{usuario.FechaVenta}</td>
                  <td>{usuario.Cuota}</td>
                </tr>
              ))
            : usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.Nombre}</td>
                  <td>{usuario.Producto}</td>
                  <td>{usuario.FechaVenta}</td>
                  <td>{usuario.Cuota}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {filteredUsuarios.length > 0 && (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Total Cuota</th>
      </tr>
    </thead>
    <tbody>
      {Array.from(new Set(usuarios.map((usuario) => usuario.Nombre))).map((nombre) => {
        const totalCuota = calculateTotalCuota(nombre);
        return (
          <tr key={nombre}>
            <td>{nombre}</td>
            <td>{totalCuota}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}
    </div>
  );
};

export default UsuariosTable;
