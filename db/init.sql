CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(12, 2) NOT NULL,
  `description` varchar(6000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Mac & Cheese', '8.99', 'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.', 'images/mac-and-cheese.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Margherita Pizza', '12.99', 'A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.', 'images/margherita-pizza.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Caesar Salad', '7.99', 'Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.', 'images/caesar-salad.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Spaghetti Carbonara', '10.99', 'Al dente spaghetti with a creamy sauce made from egg yolk, pecorino cheese, pancetta, and pepper.', 'images/spaghetti-carbonara.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Veggie Burger', '9.99', 'A juicy veggie patty served on a whole grain bun with lettuce, tomato, and a tangy sauce.', 'images/veggie-burger.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Grilled Chicken Sandwich', '10.99', 'Tender grilled chicken breast with avocado, bacon, lettuce, and honey mustard on a toasted bun.', 'images/grilled-chicken-sandwich.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Steak Frites', '17.99', 'Succulent steak cooked to your preference, served with crispy golden fries and herb butter.', 'images/steak-frites.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Sushi Roll Platter', '15.99', 'An assortment of fresh sushi rolls including California, Spicy Tuna, and Eel Avocado.', 'images/sushi-roll-platter.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Chicken Curry', '13.99', 'Tender pieces of chicken simmered in a rich and aromatic curry sauce, served with basmati rice.', 'images/chicken-curry.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Vegan Buddha Bowl', '11.99', 'A hearty bowl filled with quinoa, roasted veggies, avocado, and a tahini dressing.', 'images/vegan-buddha-bowl.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Seafood Paella', '19.99', 'A Spanish delicacy filled with saffron-infused rice, shrimp, mussels, and chorizo.', 'images/seafood-paella.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Pancake Stack', '8.99', 'Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries.', 'images/pancake-stack.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Miso Ramen', '12.99', 'A warming bowl of ramen with miso broth, tender pork, soft-boiled egg, and green onions.', 'images/miso-ramen.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Beef Tacos', '9.99', 'Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.', 'images/beef-tacos.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Chocolate Brownie', '5.99', 'A rich and fudgy brownie, topped with a scoop of vanilla ice cream and chocolate sauce.', 'images/chocolate-brownie.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Lobster Bisque', '14.99', 'A creamy soup made from lobster stock, aromatic vegetables, and a touch of brandy.', 'images/lobster-bisque.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Mushroom Risotto', '13.99', 'Creamy Arborio rice cooked with a medley of wild mushrooms and finished with parmesan.', 'images/mushroom-risotto.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Eggplant Parmesan', '11.99', 'Layers of breaded eggplant, marinara sauce, and melted mozzarella and parmesan cheeses.', 'images/eggplant-parmesan.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Lemon Cheesecake', '6.99', 'A creamy cheesecake with a tangy lemon flavor, served on a crumbly biscuit base.', 'images/lemon-cheesecake.jpg');
INSERT INTO `menu` (`name`, `price`, `description`, `image`) VALUES ('Falafel Wrap', '8.99', 'Crispy falafels wrapped in a warm pita with lettuce, tomatoes, and a tahini sauce.', 'images/falafel-wrap.jpg');

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hashed_password` varchar(60) NOT NULL,
  `admin` boolean NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



