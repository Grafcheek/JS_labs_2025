const { Router } = require("express");
const { BankProductDTO } = require("../domain/product.dto");

class BankProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async getAllProducts(req, res) {
        try {
            const filters = {
                clientType: req.query.clientType,
                category: req.query.category
            };
            
            const products = await this.productService.getAllProducts(filters);
            res.json(products);
        } catch (error) {
            console.error('Controller error (getAll):', error);
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await this.productService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            console.error('Controller error (getById):', error);
            res.status(error.message.includes('not found') ? 404 : 400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async createProduct(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object') {
                throw new Error('Invalid request body');
            }
            
            const newProduct = await this.productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Controller error (create):', error);
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.productService.updateProduct(
                req.params.id,
                req.body
            );
            
            res.json(updatedProduct);
        } catch (error) {
            console.error('Controller error (update):', error);
            res.status(error.message.includes('not found') ? 404 : 400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            await this.productService.deleteProduct(req.params.id);
            res.json({
                status: 'success',
                message: `Product ${req.params.id} deleted`
            });
        } catch (error) {
            console.error('Controller error (delete):', error);
            res.status(error.message.includes('not found') ? 404 : 400).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

function setupBankRoutes(productService) {
    const controller = new BankProductController(productService);
    const router = Router();

    router.get('/', controller.getAllProducts.bind(controller));
    router.get('/:id', controller.getProductById.bind(controller));
    router.post('/', controller.createProduct.bind(controller));
    router.put('/:id', controller.updateProduct.bind(controller));
    router.patch('/:id', controller.updateProduct.bind(controller));
    router.delete('/:id', controller.deleteProduct.bind(controller));

    return router;
}

module.exports = { setupBankRoutes };