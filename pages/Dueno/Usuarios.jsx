import React from 'react';
import { UserCog, Briefcase, Users as UsersIcon, UserCircle } from 'lucide-react';
import { InformacionUsuarios } from '../../components/InformacionUsuarios';
import './Usuarios.css';

export default function Usuarios() {
    const stats = [
        { label: 'Superadmin', count: 1, icon: <UserCog size={20} color="#e11d48" />, bg: '#fff1f2' },
        { label: 'Dueños', count: 1, icon: <Briefcase size={20} color="#2563eb" />, bg: '#eff6ff' },
        { label: 'Empleados', count: 2, icon: <UsersIcon size={20} color="#16a34a" />, bg: '#f0fdf4' },
        { label: 'Clientes', count: 1, icon: <UserCircle size={20} color="#9333ea" />, bg: '#f5f3ff' }
    ];

    return (
        <div className="usuarios-container">
            <div className="usuarios-header">
                <h2>Usuarios del Sistema</h2>
                <p>Visualiza los usuarios registrados (solo lectura)</p>
            </div>

            <div className="usuarios-stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card-user">
                        <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bg }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p>{stat.label}</p>
                            <h3>{stat.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="usuarios-table-card">
                <div className="table-header-info">
                    <h3>Lista de Usuarios Registrados</h3>
                    <p>Solo el superadministrador puede modificar usuarios</p>
                </div>
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Fecha de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InformacionUsuarios.map((u) => (
                            <tr key={u.id}>
                                <td className="user-name-cell">{u.nombre}</td>
                                <td className="user-text-muted">{u.email}</td>
                                <td className="user-text-muted">{u.rol}</td>
                                <td className="user-text-muted">{u.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}