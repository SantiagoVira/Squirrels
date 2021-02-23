# Squirrels
Our CS4All Hackathon submission

# Usage
1. Run `npm install` in the client folder to install all client dependencies
2. Run `npm run build` to create a production build
3. Run `cd ../server` to go into the server folder
4. Run `pip install` to install all server dependencies
5. Run `python ./manage.py createsuperuser`
6. Run `python ./manage.py seed` to add OpenData stories to your DB
7. Run `python ./manage.py runserver` to start the django server
8. Go your django server's url

## Development
Instead of running `npm run build`, you can run `npm start` to start a React development server. The remaining steps should be done in a separate terminal window.

In the end, you should have both the development server and django server running. To test the app, go to your development server's url.
