const fs = require('fs');
const http = require('http');
const replpaceTemplate = require('./module/replacetemp');

const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template.html`, 'utf-8');



const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {


    const { query, pathname } = url.parse(req.url, true);


    //OverView Page
    if (pathname === '/overview' || pathname === '/') {
        //res.end("this is overView");
        res.writeHead(200, {

            'Content-type': 'text/html'
        })

        const cardsHtml = dataObj.map(el => replpaceTemplate(tempCard, el)).join(' ');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
        // console.log(cardsHtml);

    }

    //Product Page
    else if (pathname === '/product') {

        const product = dataObj[query.id];
        const output = replpaceTemplate(tempProduct, product);
        res.end(output);
    }

    //API
    else if (pathname === '/api') {
        res.writeHead(200, {

            'Content-type': 'application/json'
        })
        res.end(data);



    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
})

server.listen(2000, () => {
    console.log("lis 2000");
})