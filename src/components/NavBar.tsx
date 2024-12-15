import React from "react";
import { Navbar } from "react-bootstrap";
import { MdPerson } from "react-icons/md";

const NavBar: React.FC = () => {
    return (
        <Navbar className='sticky-top px-4'>
            <Navbar.Brand>
                <h2 style={{ color: 'rgb(228, 228, 228)' }}>ChronoChat</h2>
            </Navbar.Brand>
            <Navbar.Collapse className="d-flex justify-content-end">
                <MdPerson size={40} style={{ cursor: 'pointer' }} />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
