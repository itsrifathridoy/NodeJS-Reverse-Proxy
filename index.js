const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const path = require('path');

const proxy = httpProxy.createProxyServer();

app.use(async (req, res, next) => {

    try {
        const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    let resolveTO = '';

    switch (subdomain) {
        case 'api':
            resolveTO = 'http://localhost:2000/';
            break;
        case 'auth':
            resolveTO = 'http://localhost:3000/';
            break;
        case 'app':
            resolveTO = 'http://localhost:3333/';
            break;
        default:
            return res.sendFile(path.join(__dirname, '/index.html'))
        }
    proxy.web(req, res, {
        target: resolveTO,
        changeOrigin: true
    }, function (e) {
        return res.sendFile(path.join(__dirname, '/index.html'))
    });
    } catch (error) {
        console.log(error);
        return res.sendFile({
            message: error.message
        })
        
    }
    
});



app.listen(80, () => {
    console.log('Server is running on port 80');
});