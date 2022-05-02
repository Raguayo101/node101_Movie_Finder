const express = require('express');
const morgan = require("morgan");
const axios = require('axios');
const e = require('express');

// Calling our variables from our .env file
require('dotenv').config();
let API_Key = process.env.API_KEY

//we want an empty array so we can push off of our movie data onto this array
let movies = [];


const app = express();
app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
// here we are getting our required 'get' response
app.get('/', (req, res) => {
    if (movies.hasOwnProperty(req.url)) {
        console.log(movies);
        res.json(movies[req.url]);
    }
    else {
        // we get the data from our movie database
        axios.get('https://www.omdbapi.com/' + req.url + '&apikey=' + API_Key)
            // once we get our data we then require a response
            .then((response) => {
                movies[req.url] = response.data;
                res.send(response.data);
            })
            .catch((err) => {
                res.send('error as occured!')
            })
    }



    // 
    // console.log(url)
    // axios('https://www.omdbapi.com/' + req.url + '&apikey=' + API_Key)
    //     .then(response => {
    //         let {title, Year, imdbID} = response.data;
    //         movies.push({title, Year, imdbID});
    //         res.send({title, Year, imdbID})
    //         console.log(movies)
    //     })
    //     // .catch(e => )
})


module.exports = app;