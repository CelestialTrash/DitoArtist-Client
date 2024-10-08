//REACT
import { useState } from "react"
//CSS
import "./FormStyles.css"
//AXIOS
import axios from "axios"
//CLOUDINARY
import UploadWidget from "./UploadWidget"

const API_URL = import.meta.env.VITE_API_URL

function EditReleaseForm({id, title, producer, imageUrl, date, linkToPlatform, cancelEdit, getReleases}) {
    const [newTitle, setNewTitle] = useState(title)
    const [newDate, setNewDate] = useState(date)
    const [newProducer, setNewProducer] = useState(producer)
    const [newImageUrl, setNewImageUrl] = useState(imageUrl)
    const [errorMessage, setErrorMessage] = useState()
    const [newLinkToPlatform , setNewLinkToPlatform] = useState(linkToPlatform)

    const authToken = localStorage.getItem("Authorization")

    const handleEditRelease = (e) => {
        e.preventDefault()

        const updatedRelease = {
            title: newTitle,
            date: newDate,
            producer: newProducer,
            imageUrl: newImageUrl,
            linkToPlatform: newLinkToPlatform,
        }

        if(authToken) {
            axios.put(`${API_URL}/api/releases/${id}`, updatedRelease, { headers: { Authorization: `Bearer ${authToken}`} })
            .then(() => {
                getReleases();
            })
            .then(() => cancelEdit())
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.response.data.message);
        
                setTimeout(() => {
                    setErrorMessage(null);
                }, 10000);
            });
        }
        
    }

    const handleUpload = (e) => {
        setNewImageUrl(e);
    }


    return(
        <section className="form-section">
            <form id="edit-form" onSubmit={handleEditRelease}>
            <h1>Edit release</h1>
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setNewTitle(e.target.value)} required type="text" name="title" className="title" value={newTitle} />
                <label htmlFor="date">Date of release</label>
                <input onChange={(e) => setNewDate(e.target.value)} type="date" name="date" className="date" value={newDate} />
                <label htmlFor="producer">Producer</label>
                <input onChange={(e) => setNewProducer(e.target.value)} required type="text" name="producer" className="producer" value={newProducer} />
                <label htmlFor="link">Link to platform</label>
                <input onChange={(e) => setNewLinkToPlatform(e.target.value)} type="text" name="linkToPlatform" className="linkToPlatform" value={newLinkToPlatform} />
                <label htmlFor="imageUrl">Image</label>
                <div>{<UploadWidget onUpload={handleUpload} />}
                <img src={imageUrl} alt="" />

                <button className="save-btn" type="submit">Save</button>
                <button className="cancel-btn" type="button" onClick={cancelEdit}>Cancel</button>
                <p className="error">{errorMessage}</p>
                </div>
            </form>
        </section>
    )
}

export default EditReleaseForm