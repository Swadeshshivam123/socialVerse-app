const express = require('express');

const path = require('path');

const port = 6556;

const app = express();


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:  ${err}`);
        return;
    }

    console.log(`Yup.! My express server is up and running on port: ${port}`);
})


