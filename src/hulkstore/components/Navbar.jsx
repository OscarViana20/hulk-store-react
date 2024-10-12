import { NavLink } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useAuthStore } from "../../hooks/useAuthStore";

import './styles.css';

export const Navbar = () => {
    const { startLogout, user } = useAuthStore();

    const navLinks = [
        { label: 'Products', to: "/products" },
        { label: 'Categories', to: "/categories" },
        { label: 'Shopping', to: "/shopping" },
        { label: 'Reports', to: "/reports" },
    ];

    const startContent = (
        <span>
            <i className="pi pi-user" style={{ fontSize: '1.5rem' }}/>
            &nbsp;
            {user?.username}
        </span>
    );

    const centerContent = (
        <>
            {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {link.label}
                </NavLink>
            ))}
        </>
    );

    const endContent = (
        <Button
            icon="pi pi-sign-out"
            tooltip="Logout"
            tooltipOptions={{ position: 'bottom' }}
            onClick={startLogout} text raised />
    );

    return (
        <div className="custom-navbar">
            <Toolbar start={startContent} center={centerContent} end={endContent}
                style={{ border: 0, backgroundColor: 'transparent' }}
            />
        </div>
    );
}