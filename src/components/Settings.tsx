import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "./firebase-config";
import { updateSettings } from "./updateSettings";
import { uploadImageToCloudinary } from "./uploadImage";

const Settings: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState({ name: "", email: "", memory: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData({ name: userData.name || "", email: userData.email || "", memory: userData.memory || "" });
                    if (userData.image) setSelectedImage(userData.image);
                }
                document.title = "Settings";
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            const uploadedImageUrl = await uploadImageToCloudinary(file);
            if (uploadedImageUrl) setSelectedImage(uploadedImageUrl);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedImage) {
            await updateSettings(formData.name, formData.email, formData.memory, selectedImage);
            toast.success("Settings updated successfully!");
            navigate("/");
        } else {
            toast.error("Please upload an image");
        }
    }

    const handleLogout = () => {
        try {
            auth.signOut();
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("Error signing out");
        }
    }
    return (
        <div className="Setting-page d-flex gap-0 flex-column p-2 justify-content-center align-items-center" style={{ width: "100vw", height: "100vh", backgroundColor: "#0a0f23", color: "rgb(160, 160, 160)" }}>
            <form onSubmit={handleSubmit} className="setting-container d-flex flex-column justify-content-center align-items-center w-100 h-100" style={{ maxWidth: "500px" }}>
                <div className="d-flex flex-column position-relative">
                    <input type="file" accept="image/*" style={{ display: "none" }} id="imageUpload" onChange={handleImageChange} />
                    <label htmlFor="imageUpload">
                        {imagePreview || selectedImage ? (
                            <img src={imagePreview || selectedImage} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgb(160, 160, 160)", padding: "1rem" }} />
                        ) : (
                            <MdPerson size={100} style={{ border: "1px solid rgb(160, 160, 160)", borderRadius: "50%", padding: "1rem" }} />
                        )}
                        <FaPencilAlt size={20} style={{ transform: "translate(4.7rem, -1.9rem) rotate(270deg)", cursor: "pointer", position: "absolute", top: "60%", left: "50%", color: "white" }} />
                    </label>
                </div>
                <div className="form-group email-container d-flex flex-column p-3 w-100">
                    <label htmlFor="name" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Name</label>
                    <input className="username form-control" name="name" id="name" style={{ color: "rgb(160, 160, 160)", fontSize: "18px", background: "transparent", border: "none" }} value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group email-container d-flex flex-column p-3 w-100">
                    <label htmlFor="email" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Email</label>
                    <input className="username form-control" name="email" id="email" style={{ color: "rgb(160, 160, 160)", fontSize: "18px", background: "transparent", border: "none" }} value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="memory-container d-flex p-3 form-control d-flex flex-column gap-2" style={{ background: "transparent", border: "none" }}>
                    <label htmlFor="memory" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Memory</label>
                    <textarea cols={5} rows={5} name="memory" id="memory" className="form-control" value={formData.memory} onChange={handleInputChange} style={{ color: "rgb(160, 160, 160)", fontSize: "18px", background: "transparent", border: "none" }} />
                </div>
                <button type="submit" className="w-100" style={{ padding: "1rem", color: "rgb(160, 160, 160)", backgroundColor: "rgb(68, 56, 208)", border: "none", borderRadius: "10px" }}>Update</button>
            </form>
            <button onClick={handleLogout} className="d-flex p-2 justify-content-center align-items-center" style={{ backgroundColor: "red", width: "40%", border: "none", color: "rgb(160, 160, 160)", borderRadius: "10px", transform: "translateY(-3rem)" }}>Log out</button>
        </div>
    );
};

export default Settings;
