const express = require('express');
const { setupBankRoutes } = require('../../internal/controller/bank_controller');
const { BankProductRepository } = require('../../internal/repository/bank_repository');
const { BankProductService } = require('../../internal/service/bank_service');

const app = express();
const PORT = 8000;
const HOST = 'localhost';


app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


const repository = new BankProductRepository();
const service = new BankProductService(repository);
const router = setupBankRoutes(service);


app.use('/api/bank-products', router);


app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    res.status(500).json({ error: 'Internal server error' });
});


app.listen(PORT, HOST, () => {
    console.log(`Raiffeisen Bank API запущен на http://${HOST}:${PORT}`);
});