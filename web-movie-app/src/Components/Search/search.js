import { useState } from "react";
import { useHistory } from "react-router-dom";
import css from "./search.module.css";

export const Search = () => {
    const [key, setKey] = useState("");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/movie/${key}`);
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)} className={css["search-bar"]}>
            <input 
                type="text" 
                onChange={(e) => setKey(e.target.value)}
                placeholder="Search"
            />
        </form>
    )
}

