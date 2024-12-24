import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const Settings: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

    // Function to handle image upload to Cloudinary
    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            setSelectedImage(data.secure_url);
            console.log("Image uploaded successfully:", data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            uploadImageToCloudinary(file);
        }
    };

    return (
        <div className="Setting-page d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh", backgroundColor: "#0a0f23", color: "rgb(160, 160, 160)", }}>
            <form className="setting-container d-flex flex-column justify-content-center align-items-center w-100 h-100" style={{ maxWidth: "500px" }}>
                <div className="d-flex flex-column position-relative">
                    <input type="file" accept="image/*" style={{ display: "none" }} id="imageUpload" onChange={handleImageChange} />
                    <label htmlFor="imageUpload">
                        {imagePreview || selectedImage ? (
                            <img src={imagePreview || selectedImage} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgb(160, 160, 160)", padding: "1rem", }} />
                        ) : (
                            <MdPerson size={100} style={{ border: "1px solid rgb(160, 160, 160)", borderRadius: "50%", padding: "1rem", }} />
                        )}
                        <FaPencilAlt size={20} style={{ transform: "translate(4.7rem, -1.9rem) rotate(270deg)", cursor: "pointer", position: "absolute", top: "60%", left: "50%", color: "white", }} />
                    </label>
                </div>
                <div className="form-group email-container d-flex flex-column p-3 w-100">
                    <label htmlFor="name" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Name</label>
                    <input className="username form-control" name="name" id="name" style={{ color: "rgb(160, 160, 160)", fontSize: "25px", background: "transparent", border: "none", }}
                        value="Yusuf Abdulqudus"
                        required
                    />
                </div>
                <div className=" form-group email-container d-flex flex-column p-3 w-100">
                    <label htmlFor="email" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Email</label>
                    <input className="username form-control" name="email" id="email" style={{ color: "rgb(160, 160, 160)", fontSize: "25px", background: "transparent", border: "none" }} value="yusufabdulqudus02@gmail.com" required />
                </div>
                <div className="memory-container d-flex p-3 form-control d-flex flex-column gap-2" style={{ background: "transparent", border: "none" }}>
                    <label htmlFor="memory" style={{ color: "rgb(160, 160, 160)", letterSpacing: "3px" }}>Memory</label>
                    <textarea cols={5} rows={5} name="memory" id="memory" className="form-control" value={"User's name is Abdulqudus"} style={{ color: "rgb(160, 160, 160)", fontSize: "25px", background: "transparent", border: "none", }} />
                </div>
                <button type="submit" className="w-100" style={{ padding: "1rem", color: "rgb(160, 160, 160)", backgroundColor: "rgb(68, 56, 208)", border: "none", borderRadius: "10px" }}>Update</button>
            </form>
        </div>
    );
};

export default Settings;
