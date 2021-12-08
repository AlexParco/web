package user

import (
	"database/sql"
)
type UserCmd struct {
    Id         string `json:"id"`
    ProfileImg string `json:"profile_img"`
    Username   string `json:"username"`
    Email      string `json:"email"`
    Password   string `json:"password"`
}

type UserService struct {
    *sql.DB
}

func (u *UserService) Create(user *UserCmd) (error) {

	query := `INSERT INTO user VALUES (?, ?, ?, ?, ?)`

	_, err := u.Exec(query, user.Id, user.ProfileImg, user.Username,user.Email, user.Password)
	if err != nil {
		return err 
	}

	return nil
}

func (u *UserService) Update(setItem, userItem, userID  string) error{
    query := `UPDATE user SET `+ setItem +`=? WHERE id=?`

    _,err := u.Exec(query, userItem, userID)
    if err != nil {
        return err
    }

    return nil
}

func (u *UserService) Delete(userID string) error{
    query := `DELETE FROM user WHERE id=?`

    _,err := u.Exec(query, userID)

    if err != nil {
        return err
    }
    return nil
}

func (u *UserService) Get(setItem, element string) (UserCmd, error) {
    var user UserCmd
    query := `SELECT * FROM user WHERE `+setItem

    if err := u.QueryRow(query, element).Scan(&user.Id, &user.ProfileImg,&user.Username, &user.Email, &user.Password); err != nil{
        return user, err  
    }

    return user, nil 
}


