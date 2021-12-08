import useUser from '../../Hooks/useUser';
import { BtnImg } from '../../Components/BtnImg/btnimg';
import { useHistory } from 'react-router-dom';
import './profile.css';

export const Profile = () =>{
    const {user, isLogged} = useUser(); 
    let history = useHistory();
    console.log(user)
    if(!isLogged){
        history.push("/movie")
    }

    return(
        <div className="app_user">
            <div className="user_content">
                <img src={"/img/"+user.profile_img} alt="profile_img" className="profile_img"/>
                <div className="user_content_body">
                    <span className="user_username">{user.username}</span>
                </div>
                <BtnImg/>
            </div>
        </div>
    )
}
