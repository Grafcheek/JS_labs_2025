const { DBConnector } = require('../db/db');

class BankProductRepository {
    constructor() {
        this.db = new DBConnector('bank_offers.json');
    }

    async findAll() {
        try {
            return this.db.read();
        } catch (error) {
            console.error('Repository error (findAll):', error);
            throw new Error('Failed to read products');
        }
    }

    async create(product) {
        const products = await this.findAll();
        const newProduct = { 
            id: this._generateNextId(products),
            title: product.title || product.categoryName,
            type: product.type || product.clientType,
            elements: product.elements || product.offers || [] // правильно обрабатываем оба варианта
        };
        
        products.push(newProduct);
        await this._saveAll(products);
        return newProduct;
    }

    async update(id, updateData) {
        const products = await this.findAll();
        const index = products.findIndex(p => p.id === Number(id));
        
        if (index === -1) return null;
        
        // Обновляем только переданные поля
        products[index] = { 
          ...products[index], 
          ...updateData,
          id: products[index].id // Сохраняем оригинальный ID
        };
        
        await this._saveAll(products);
        return products[index];
      }

    async delete(id) {
        const products = await this.findAll();
        const initialLength = products.length;
        const filtered = products.filter(p => p.id !== Number(id));
        
        if (filtered.length === initialLength) return false;
        
        await this._saveAll(filtered);
        return true;
    }

    _generateNextId(products) {
        const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);
        return maxId + 1;
    }

    async _saveAll(products) {
        try {
            this.db.write(products);
        } catch (error) {
            console.error('Repository error (save):', error);
            throw new Error('Failed to save products');
        }
    }
}

module.exports = { BankProductRepository };