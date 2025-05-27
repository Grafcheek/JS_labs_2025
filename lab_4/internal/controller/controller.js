const { Router } = require("express")
const { BankProductDTO } = require("../domain/bank_product");
const express = require('express');
const router = express.Router();

class Controller {
    constructor(service) {
        this.service = service

        this.findBankProducts = this.findBankProducts.bind(this);
        this.addBankProduct = this.addBankProduct.bind(this);
        this.updateBankProduct = this.updateBankProduct.bind(this);
        this.deleteBankProduct = this.deleteBankProduct.bind(this);
        this.findBankProductById = this.findBankProductById.bind(this);
    }

    findBankProducts(req, res) {
        try {
            const filters = {};
            if (req.query.id) {
                filters.id = Number.parseInt(req.query.id);
            }
            if (req.query.title) {
                filters.title = req.query.title;
            }

            const result = this.service.findBankProducts(filters)
            
            res.json(result.map(item => new BankProductDTO(item).toJSON()))
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    findBankProductById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            if (Number.isNaN(id)) {
                throw new Error('Invalid ID');
            }

            const result = this.service.findBankProducts({id})
            if (!result) {
                return res.status(404).json({ error: 'Bank product not found' });
            }

            res.json(new BankProductDTO(result).toJSON())
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateBankProduct(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            if (Number.isNaN(id)) {
                throw new Error('Invalid ID');
            }

            const data = new BankProductDTO(req.body)
            const result = this.service.updateBankProduct(id, data)
            if (!result) {
                return res.status(404).json({ error: 'Bank product not found' });
            }

            res.json(new BankProductDTO(result).toJSON())
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    addBankProduct(req, res) {
        try {
            const data = new BankProductDTO(req.body)
            const result = this.service.addBankProduct(data)
            res.status(201).json(new BankProductDTO(result).toJSON())
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteBankProduct(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            if (Number.isNaN(id)) {
                throw new Error('Invalid ID');
            }

            const result = this.service.deleteBankProduct(id)
            if (!result) {
                return res.status(404).json({ error: 'Bank product not found' });
            }

            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

function SetupRoutes(service){
    controller=new Controller(service)

    router.get('/', controller.findBankProducts)
    router.get('/:id', controller.findBankProductById)
    router.post('/', controller.addBankProduct)
    router.delete('/:id', controller.deleteBankProduct)
    router.put('/:id', controller.updateBankProduct)

    return router
}

module.exports={
    SetupRoutes,
}