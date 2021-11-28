import useMovie from '../../Hooks/useMovie'
import './btndelete.css'
import { useHistory } from "react-router-dom";

export const BtnDelete = ({id}) => {
    const { deleteMovie } = useMovie() 
    let history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/movie')
        deleteMovie(id)
    }

    return (
        <button className="btnDelete" onClick={handleClick}></button>
    )
}
