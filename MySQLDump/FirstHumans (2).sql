-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 31 2024 г., 04:53
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `FirstHumans`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Post`
--

CREATE TABLE `Post` (
  `id_post` int NOT NULL,
  `post_preface` varchar(500) DEFAULT NULL,
  `post_title` varchar(100) DEFAULT NULL,
  `post_subtitle` varchar(300) DEFAULT NULL,
  `post_author` varchar(45) DEFAULT NULL,
  `post_data` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_text` longtext NOT NULL,
  `image_post` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `User_id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Post`
--

INSERT INTO `Post` (`id_post`, `post_preface`, `post_title`, `post_subtitle`, `post_author`, `post_data`, `user_text`, `image_post`, `User_id_user`) VALUES
(276, '132', '123', '123', 'admin', '29.05.2024', '123', 'file_1716975108977.jpg', 71),
(278, '123', '123', '123', 'admin', '29.05.2024', '123', 'file_1716975283846.jpg', 71),
(281, '234', '234', '234', 'admin', '29.05.2024', '234', NULL, 71),
(282, '123', '123', '123', 'admin', '29.05.2024', '123', NULL, 71),
(283, '123', '123', '123', 'admin', '29.05.2024', '123', 'file_1716975613762.jpg', 71),
(284, '1', '1', '1', 'admin', '29.05.2024', '1', 'file_1716975630434.png', 71),
(285, '4', '4', '4', 'admin', '29.05.2024', '4', 'file_1716975650984.jpg', 71),
(286, '123', '123', '123', 'admin', '29.05.2024', '123', 'file_1716976892882.png', 71);

-- --------------------------------------------------------

--
-- Структура таблицы `Post_favorites2`
--

CREATE TABLE `Post_favorites2` (
  `id_Post_favorites2` int NOT NULL,
  `id_post` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id_user` int NOT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_surname` varchar(45) DEFAULT NULL,
  `user_login` varchar(45) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_regist_date` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_role` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id_user`, `user_name`, `user_surname`, `user_login`, `user_password`, `user_regist_date`, `user_role`) VALUES
(71, 'admin', 'Романченко', 'admin', '$2b$10$dR3bEVDFwA6Qqy2HXm5zie3FFd9bwGw/d4MQ3QGKSwqeh3zilGo6O', '29.05.2024', 'Пользователь');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `fk_Post_User_idx` (`User_id_user`);

--
-- Индексы таблицы `Post_favorites2`
--
ALTER TABLE `Post_favorites2`
  ADD PRIMARY KEY (`id_Post_favorites2`),
  ADD KEY `id_post` (`id_post`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Post`
--
ALTER TABLE `Post`
  MODIFY `id_post` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=287;

--
-- AUTO_INCREMENT для таблицы `Post_favorites2`
--
ALTER TABLE `Post_favorites2`
  MODIFY `id_Post_favorites2` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `fk_Post_User` FOREIGN KEY (`User_id_user`) REFERENCES `User` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `Post_favorites2`
--
ALTER TABLE `Post_favorites2`
  ADD CONSTRAINT `Post_favorites2_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `Post` (`id_post`),
  ADD CONSTRAINT `Post_favorites2_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
