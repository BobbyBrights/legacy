novaball
========

Novaball Angular JS/Node

## To install
    npm install
    bower install
    
## To compile sass

    grunt compass

## To run node service on port 3000
    cd ..
    npm start

## or run on a custom port eg. 80 in Linux
    cd ..
    PORT=80 npm start

## NodeJS restify-oauth2 post-install fix
There's a problem with the restify-oauth2 node library in that it returns a WWW Authenticate header (which results in a Basic HTTP authentication dialog box).

Modify line 4 of `restify-oauth2\lib\cc\indes.js from

    var grantToken = require("./grantToken");
to

    var grantToken = require("../../../../providers/cc/grantToken");
