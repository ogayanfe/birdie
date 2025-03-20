# Birdie

**_A social networking application with django and react._**
A fully functioning social media application that allows users to post content, view content like and comment on content, follow and unfollow users. Also supports dark and light theme modes.
> <strong>You can find a live demo of the app at <a href="https://birdie.netlify.app">https://birdie.netlify.app</a></strong>

## Demo


https://user-images.githubusercontent.com/95624629/206938826-7436f618-ea9b-4918-99e2-df208dde58e5.mp4



## Tools 
- Python
- Django and Django rest framework
- Javascript
- React
- React router
- Tailwind css
- Material ui and Material ui icons

## Setting up locally
- Clone the project to your local computer using git via command `git clone https://github.com/ogayanfe/birdie.git`. You can simply download the zip folder and unzip if you don't have git installed.
- `cd` into the application folder using your terminal.
-  `cd` into the backend direcory via the command `cd backend`.
- You can create and activate a virtual environment here.
- `cd` into the backend directory and run the command `python3 install -r requirments.txt` or `python install -r requirements.txt` on windows to install requirements. 
- Run the command `python3 manage.py migrate` or `python manage.py migrate` on windows to load the database. 
- Run the command `python3 manage.py runserver` or `python manage.py runserver` on windows to start the django development server. 
- Go back into the root folder of the repo and  `cd` into the frontend then the react directory via `cd frontend/birdie`
- Run the command `npm install` to install requirements
- Run the command `npm start` to start the react development server. 
- Navigate to the url `localhost:3000` on your browser

## Hosting information
- Backend - Hosted on <a href="https://www.pythonanywhere.com/">pythonanywhere</a>
- Frontend - Hosted on <a href="https://www.netlify.com/">netlify</a>
