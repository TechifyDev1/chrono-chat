import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase-config";

interface harmProp {
    toggleSideBar: () => void;
}

const NavBar: React.FC<harmProp> = ({ toggleSideBar }) => {
    const [userImage, setUserImage] = useState<string | undefined>(undefined);
    useEffect(() => {
        const fetchUserImage = async () => {
            const userId = auth.currentUser?.uid;
            if (!userId) return;
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData?.image) setUserImage(userData.image);
            }
        }
        fetchUserImage();
    }, []);
    const navigate = useNavigate();
    return (
        <Navbar className='sticky-top px-4'>
            <Navbar.Brand className="d-flex align-items-center gap-2">
                <button className="d-flex justify-content-center align-items-center" onClick={toggleSideBar} style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <FaBars style={{ cursor: 'pointer' }} size={30} color="rgb(228, 228, 228)" />
                </button>
                <h2 style={{ color: 'rgb(228, 228, 228)' }}>ChronoChat</h2>
            </Navbar.Brand>
            <Navbar.Collapse className="d-flex justify-content-end">
                {userImage?.length ? <img onClick={() => navigate('/settings')} src={userImage} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: "pointer" }} /> : <MdPerson size={30} color="rgb(228, 228, 228)" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')} />}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
