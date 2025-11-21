import express from 'express';
//Кроссплатформенность
import cors from 'cors';
//токен
import jwt from 'jsonwebtoken';
//Шифрование пароля
import bcrypt from 'bcrypt';
//Куки
import cookieParser from 'cookie-parser';
//Импорт БД
import {db} from './config/db.js'
//Сохранение картинок на сервер
import multer from 'multer';
import path from 'path';

const salt = 10;
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

//Верификаия при авторизации на сайте
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token)  {
        return res.json({Error: "Вы не аторезированны"});
    } else {
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) {
                return res.json({Error: "Токен не подходит"});
            } else {
                req.user_login = decoded.user_login;
                req.user_name = decoded.user_name;
                req.user_surname = decoded.user_surname;
                req.user_regist_date = decoded.user_regist_date;
                req.user_role = decoded.user_role;
                req.id_user = decoded.id_user;
                req.user_photo = decoded.user_photo;
                next();
            }
        })
    }
};

//Маршурт при авторизации на сайте
app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Успешно",
        user_login: req.user_login,
        user_name: req.user_name,
        user_surname: req.user_surname,
        user_regist_date: req.user_regist_date,
        user_role: req.user_role,
        id_user: req.id_user,
        user_photo: req.user_photo
    });
});

//Маршрут регистрации на сайте
app.post('/register', (req, res) => {
    const sql = "INSERT INTO User(user_name, user_surname, user_login, user_password, user_regist_date, user_role) VALUES (?)";
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).split('/').join('.');
    // Проверка существования логина
    db.query("SELECT * FROM User WHERE user_login = ?", [req.body.user_login], (err, results) => {
        if (err) return res.json({ Error: "Ошибка проверки логина" });
        if (results.length > 0) {
            return res.json({ Error: "Логин уже существует" });
        } else {
            // Хеширование пароля
            bcrypt.hash(req.body.user_password.toString(), salt, (err, hash) => {
                if (err) return res.json({ Error: "Ошибка хеширования пароля" });
                const value = [
                    req.body.user_name,
                    req.body.user_surname,
                    req.body.user_login,
                    hash,
                    currentDate,
                    req.body.user_role = 'Пользователь',
                ];
                db.query(sql, [value], (err, result) => {
                    if (err) console.log(err);
                    return res.json({ Status: "Успешно" });
                });
            });
        }
    });
});

//Маршрут авторизации на сайте
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM User WHERE user_login = ?';
    db.query(sql, [req.body.user_login, req.body.user_name, req.body.user_surname, req.user_regist_date, req.user_role, req.id_user, req.user_photo], (err, data) => {
        if(err) return res.json({Error: "Ошибка авторизации на сервере"});
        if(data.length > 0 ) {
            bcrypt.compare(req.body.user_password.toString(), data[0].user_password, (err, response) => {
                if(err) return res.json({Error: "Ошибка хеширования пароля"});

                if(response) {
                    const user_login = data[0].user_login;
                    const user_name = data[0].user_name;
                    const user_surname = data[0].user_surname;
                    const user_regist_date = data[0].user_regist_date;
                    const user_role = data[0].user_role;
                    const id_user = data[0].id_user;
                    const user_photo = data[0].user_photo;
                    const token = jwt.sign({user_login, user_name, user_surname, user_regist_date, user_role, id_user, user_photo}, 'secret', {expiresIn: '1d'});
                    res.cookie('token', token);
                    if(data[0].user_role === 'Пользователь') {
                        return res.json({Status: "Пользователь"});
                    }
                    if (data[0].user_role === 'Администратор') {
                        return res.json({Status: "Администратор"});
                    }
                }else {
                    return res.json({Error: "Пароль не совпадает"});
                }
                console.log(res.json({Status: "Пользователь"}))
            })
        } else {
            return res.json({Error: "Логин не сущесвтует"});
        }
    });
});

//Выход с сайта
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    console.log(res.clearCookie('token'))
    return res.json({ Status: "Вы вышли из системы" });
});
//Маршрут вывода всех данных из таблицы User
app.get('/user', (req,
                res) => {
    const user = "SELECT * FROM User WHERE user_role = 'Пользователь'";
    db.query(user, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

//Маршурт удаление пользователя из таблицы User
app.delete('/user/:id', (req, res) => {
    const userID = req.params.id;
    const idPost = req.body.id_post;
    // Удаление связанных записей из таблицы "Post_favorites2"
    const deletePostFavorites = 'DELETE FROM Post_favorites2 WHERE id_user = ?';
    db.query(deletePostFavorites, [userID], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        // Удаление связанных записей из таблицы "Post"
        const deletePost = 'DELETE FROM Post WHERE id_post = ?';
        db.query(deletePost, [idPost], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            // Удаление записи из таблицы "User"
            const deleteUser = 'DELETE FROM User WHERE id_user = ?';
            db.query(deleteUser, [userID], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Ошибка сервера' });
                }
                return res.json(results);
            });
        });
    });
});

//Маршрут вывода всех данных из таблицы Post
app.get('/article', (req, res) => {
    const article = "SELECT * FROM Post ORDER BY id_post";
    db.query(article, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

//Маршрут вывода последних 2 записей из таблицы User
app.get('/articleNew', (req,
                        res) => {
    const user = "SELECT * FROM Post ORDER BY id_post DESC LIMIT 4 OFFSET 2";
    db.query(user, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

//Маршрут вывода последних 6 записей из таблицы Post
app.get('/articleNew2', (req, res) => {
    const user = "SELECT * FROM Post ORDER BY id_post DESC LIMIT 2";
    db.query(user, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

//Маршрут добавления новых статей в таблицу Post
app.post('/article', verifyUser, (req, res) => {
    const art = "INSERT INTO Post(post_preface, post_title, post_subtitle, post_author, post_data, user_text, User_id_user) VALUES (?)";
    const nameAuthor = req.user_name;
    const UserIdUser = req.id_user;

    const currentDat = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).split('/').join('.');

    const val = [
        req.body.post_preface,
        req.body.post_title,
        req.body.post_subtitle,
        req.body.post_author = nameAuthor,
        req.body.post_data = currentDat,
        req.body.user_text,
        req.body.User_id_user = UserIdUser,
    ];
    db.query(art, [val], (err, data) => {
        if(err) console.log(err);
        return res.json('Статья была создана');
    });
    console.log(val);
});

//Маршурут обновления статьи в таблице Post
app.put('/article/:id', (req, res) => {
    const articleID = req.params.id;
    let updateFields = [];
    let val = [];

    if (req.body.post_preface) {
        updateFields.push('post_preface = ?');
        val.push(req.body.post_preface);
    }
    if (req.body.post_title) {
        updateFields.push('post_title = ?');
        val.push(req.body.post_title);
    }
    if (req.body.post_subtitle) {
        updateFields.push('post_subtitle = ?');
        val.push(req.body.post_subtitle);
    }
    if (req.body.user_text) {
        updateFields.push('user_text = ?');
        val.push(req.body.user_text);
    }

    const updateQuery = `UPDATE Post SET ${updateFields.join(', ')} WHERE id_post = ?`;

    db.query(updateQuery, [...val, articleID], (err, results) => {
        if (err) { console.log(err); }
        res.json(results);
    });
});

//Маршурт удаление статьи из таблицы Post
app.delete('/article/:id', (req, res) => {
    const articleID = req.params.id;

    // Удаляем из таблицы Post_favorites2
    const deleteFromFavorites = 'DELETE FROM Post_favorites2 WHERE id_post = ?';
    db.query(deleteFromFavorites, [articleID], (err, results) => {
        if (err) {console.log(err)}

        // Затем удаляем из таблицы Post
        const deletePost = 'DELETE FROM Post WHERE id_post = ?';
        db.query(deletePost, [articleID], (err, results) => {
            if (err) {console.log(err)}
            res.json(results);
        });
    });
});

//Маршурт переадресации на страницу с описанием статьи
app.get('/articlePerson/:id', (req, res) => {
    const itemId = req.params.id
    const query = `SELECT * FROM Post WHERE id_post = ${itemId}`
    db.query(query, (err, results) => {
        if (err) {console.log(err)}
        res.json(results);
    });
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image');
    },
    filename:  (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})

//Добавление фото
app.post('/upload', upload.single('file'), (req, res) => {
    const image = req.file.filename;
    const sql = "UPDATE Post SET image_post  = ? WHERE id_post = (SELECT * FROM (SELECT MAX(id_post) FROM Post) AS Post)"
    db.query(sql, [image], (err, results) => {
        if (err) {console.log(err)}
        return res.json({Status: "Успешно"})
    });
});

//Вывод добавленного фото
app.get('/upload', (req, res) => {
    const sql = "SELECT * FROM Post";
    db.query(sql, (err, results) => {
        if (err) {console.log(err)}
        return res.json(results)
    });
});

app.post('/addFavourite', verifyUser, (req, res) => {
    const id_user = req.id_user;
    const id_post = req.body.id_post;
    // Проверка на существование записи в таблице
    db.query("SELECT * FROM Post_favorites2 WHERE id_post = ? AND id_user = ?", [id_post, id_user], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка базы данных' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Статья уже добавлена в избранное' });
        } else {
            // Вставка новой записи
            db.query('INSERT INTO Post_favorites2 (id_post, id_user) VALUES (?, ?)', [id_post, id_user], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Ошибка добавления статьи в избранное' });
                }
                res.status(200).json({ message: 'Статья добавлена в избранное' });
            });
        }
    });
});

//Маршурт вывода статей из Post_favorites
app.get('/favouriteArticles', verifyUser, (req, res) => {
    const id_user  = req.id_user;
    const sql2 = "SELECT p.* FROM Post p JOIN Post_favorites2 fp ON p.id_post = fp.id_post WHERE fp.id_user = ?"
    db.query(sql2, [id_user], (err, results) => {
        if (err) {console.log(err)}
        return res.json(results)
    });
});

//Маршурт удаление статьи из таблицы Post_favorites
app.delete('/favouriteArticles/:id', (req, res) =>{
    const articleID = req.params.id;
    const article = 'DELETE FROM `Post_favorites2` WHERE `id_post` = ?';
    db.query(article, [articleID], (err, results) => {
        if (err) {console.log(err)}
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Сервер на порте 5000 запущен');
});