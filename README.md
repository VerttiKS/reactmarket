[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qCtVf2Dd)
# React Market
Final Project for my Web Programming course


# Installation
Clone the git and open up three terminals

In the first terminal do a `docker-compose up -d`

In the second terminal, go to the backend folder. Then `npm install` and `npm run dev`

In the third termnail, go to the frontend folder. Then `npm install` and `npm run dev`

You should be able to reach the server in `http://localhost:5173/`. You can also reach the backend with the rest files.

Also make a .env file in every one of the folders
```
MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=market_password
MYSQL_DATABASE=react_market
JWT_KEY=my_secret_market_key
PORT=5000
VITE_API_URL=http://localhost:5000
```


# Development summary
The development was completed using the same methods as the course taught us. React frontend and Node + SQL database backend 

The biggest roadblock that I faced was the deployment. The env file needed a `MYSQL_HOST = db`. It took me way too long to figure it out, but I finally did in the end.

I created the website in a similar style as ReactDine, because I really love the style of it. I really like the brick texture. It's comfortable


# Website tour
When first entering the site, you can see the homepage full of people selling
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/7928eb91-9af0-4c2e-bf15-195b4cd8ac10)

You can click on individual items to see the information that the seller was giving
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/7788b412-d335-4354-a013-6af4b453a315)

Clicking the button on the right allows us to login or sign up
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/54334817-2722-47df-b582-d58c65593d2a)

We will be signing up
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/359c0f84-13dc-4976-af64-d98062d37a37)

After signing up three new icons appear on the top right
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/4e71d1f6-5d7a-45c2-a761-dc5f042ed39d)

In the first button we can add an item
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/336767f6-96f2-470f-99fb-b84a2a789f2a)

![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/7cf80806-17d8-4fbe-b03b-3a3186011403)

![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/a9c6c172-8c73-4b83-af60-1943e797a229)

In the second button we can edit or remove an item
![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/8a8f2883-9e46-4690-9f2e-895b61bb94a2)

Third button logs us out

![kuva](https://github.com/TiTe-5G00EV16-3003/2024-final-project-VerttiKS/assets/122641331/39807daa-3bb7-402d-9940-1fa7f9f7db2b)








