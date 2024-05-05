CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` decimal(12, 2) NOT NULL,
  `description` varchar(6000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `items` (`title`, `price`, `description`, `image`, `owner`) VALUES ('Health Potion', '8.99', 'This potion will restore your health!', 'https://cdn.pixabay.com/photo/2023/10/02/14/42/bottle-8289312_960_720.jpg', 'LoremAlchemist');
INSERT INTO `items` (`title`, `price`, `description`, `image`, `owner`) VALUES ('Mana Potion', '12.99', 'This potion will fully restore your mana!', 'https://cdn.pixabay.com/photo/2024/03/12/18/13/bottle-8629309_960_720.png', 'LoremAlchemist');

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `admin` boolean NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
