import {useEffect, useState} from 'react';
import axios from 'axios';
//Стили
import styles from './UserPanel.module.sass'
//Иконки
import {MdDelete} from 'react-icons/md';
//Картинки
import imageAvatr from '../../../../asset/image/image_logo.png'

export const UserPanel = () => {

    //Вывод пользователей на старницу
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/`)
            .then((res => {
                    setUsers(res.data)
                }
            ))
            .catch((err) => {
                console.log(err)
            });
    }, []);

    // Удаление пользоватлей
    const UsersDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/` + id)
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            {users.map(user => (
                <div
                    className={styles.personalAreaRightUserWrapper}
                    key={user.id_user}
                >
                    <img
                        src={imageAvatr}
                        alt='avatar-user'
                        title='avatar-user'
                    />
                    <div className={styles.personalAreaRightUser}>
                        <span>
                            {user.user_regist_date}
                        </span>
                        <h4>
                            {user.user_name}
                        </h4>
                        <span>
                            {user.user_role}
                        </span>
                    </div>
                    <div className={styles.personalAreaRightUserControl}>
                        <span>
                            <MdDelete
                                size='30px'
                                onClick={() => UsersDelete(user.id_user)}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
