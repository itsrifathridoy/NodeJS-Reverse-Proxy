const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const path = require('path');
const APIController = require('./src/Controllers/API.Controller');
const APIRoute = require('./src/APIRoute');
const DomainMappingController = require('./src/Controllers/DomainMapping.Controller');
const { db } = require('./src/config/db');
const { query } = require('./src/Service/db');

const proxy = httpProxy.createProxyServer();

app.get('/domain/api/mapping',DomainMappingController.GetMapping);
app.post('/domain/api/mapping',DomainMappingController.CreateMapping);
app.get('/domain/api/mapping/:domain',DomainMappingController.getMappingByDomain);


// app.use(async (req, res, next) => {

//     try {
//         const hostname = req.hostname;
//     const subdomain = hostname.split('.')[0];

//     let resolveTO = '';

//     switch (subdomain) {
//         case 'api':
//             resolveTO = 'http://localhost:2000/';
//             break;
//         case 'auth':
//             resolveTO = 'http://localhost:3000/';
//             break;
//         case 'app':
//             resolveTO = 'http://localhost:3333/';
//             break;
//         default:
//             return res.sendFile(path.join(__dirname, '/index.html'))
//         }
//     proxy.web(req, res, {
//         target: resolveTO,
//         changeOrigin: true
//     }, function (e) {
//         return res.sendFile(path.join(__dirname, '/index.html'))
//     });
//     } catch (error) {
//         console.log(error);
//         return res.sendFile({
//             message: error.message
//         })
        
//     }
    
// });


app.use(async (req, res, next) => {

    try {
        const hostname = req.hostname;
        const sql = `SELECT * FROM domain_mapping WHERE domain = ?`;
        const result = await query(sql, [hostname]);
        if(result.length === 0) {
            return res.sendFile(path.join(__dirname, '/index.html'))
        }
        else{
            const resolveTO = `http://${result[0].host}:${result[0].port}`;
            proxy.web(req, res, {
                target: resolveTO,
                changeOrigin: true
            }, function (e) {
                return res.sendFile(path.join(__dirname, '/index.html'))
            });
        }

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