import { useState } from "react"
import './btnimg.css'
import useUser from "../../Hooks/useUser"

export const BtnImg = () => {
    const {updateProfile, uploadImg} = useUser()
    const [archivo, setArchivo] = useState(null)

    const subirArchivo = (e) =>{
        setArchivo(e[0])
        console.log(e[0])
    }

    const insertarArchivos = async (e) => {
        e.preventDefault()
        const img = new FormData();
        img.append("file", archivo)
        console.log(archivo.name)
       
        uploadImg(img)
        updateProfile({"profile_img": archivo.name})
    }

    return (
        <form onSubmit={(e) => insertarArchivos(e)} className="form-img">
            <label>
                Profile image 
                <input type="file" name="file" className="form-img-input" onChange={(e) => subirArchivo(e.target.files)}/>
            </label>
            <button className="form-img-btn"> Enviar </button>
        </form>
    );
}
