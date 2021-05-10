This Poller-Web Application provides a user interface to the user to do the below functionalities
- Add a new URL to monitor
- View status of all added URLs
- Edit/Delete the added URL details
- Get quick stats about total number of success/Fail

This Web Application contains two Pages,

[http://localhost:3000](homepage) provides the home menu to the user to opt either to add URL, view dashboard of already added URLs and to get the quick stats.

[http://localhost:3000/dashboard](dashboard) provides the view of already added URLs, along with the options to edit/Delete the details.

### Prerequisite
- Make sure Poller Api application is up and running on [http://localhost:8080/poller](poller-api)

To run the API. Please follow the steps mentioned in 

### To run in Local
- Clone the code from the repository
- Please ensure node is installed on dev machine 
- Run the following commands one-by-one

```bash
yarn install
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser. You can see start `pages/index.js` rendering.


### To run using Docker 

```bash
docker build -t poller-web .
docker run -p 3000:3000 poller-web
```
