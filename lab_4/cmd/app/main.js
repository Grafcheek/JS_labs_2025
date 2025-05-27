const express = require('express')
const path = require('path')

const { SetupRoutes } = require('../../internal/controller/controller')
const { DBConnector } = require('../../internal/db/db')
const { Repository } = require('../../internal/repository/repository')
const { Service } = require('../../internal/service/service')
const app = express()
const host = 'localhost'
const port = 8000

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
};

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../public')))

db=new DBConnector("bank_products.json")

repo=new Repository(db)

service=new Service(repo)

router=SetupRoutes(service)

app.use('/bank-products', router)

app.listen(port, host, () => {
	console.log(`Raiffeisen Bank API запущен на http://${host}:${port}`)
})
