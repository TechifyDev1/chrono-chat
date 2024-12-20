import React from "react";
import { Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const NavBar: React.FC = () => {
    return (
        <Navbar className='sticky-top px-4'>
            <Navbar.Brand className="d-flex align-items-center gap-2">
                <FaBars style={{ cursor: 'pointer' }} size={30} color="rgb(228, 228, 228)" />
                <h2 style={{ color: 'rgb(228, 228, 228)' }}>ChronoChat</h2>
            </Navbar.Brand>
            <Navbar.Collapse className="d-flex justify-content-end">
                <MdPerson size={40} style={{ cursor: 'pointer' }} />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
