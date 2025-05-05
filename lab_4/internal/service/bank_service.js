const { BankProductDTO } = require('../domain/product.dto');

class BankProductService {
    constructor(repository) {
        this.repo = repository;
    }

    async getAllProducts(filters = {}) {
        try {
            let products = await this.repo.findAll();
            
            if (filters.clientType) {
                products = products.filter(p => 
                    p.type && p.type.toUpperCase() === filters.clientType.toUpperCase()
                );
            }
            
            if (filters.category) {
                products = products.filter(p => 
                    p.title && p.title.toLowerCase().includes(filters.category.toLowerCase())
                );
            }
            
            return products;
        } catch (error) {
            console.error('Service error (getAll):', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.repo.findAll()
                .then(products => products.find(p => p.id === Number(id)));
            
            if (!product) {
                throw new Error('Product not found');
            }
            
            return product;
        } catch (error) {
            console.error('Service error (getById):', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const dto = new BankProductDTO(productData);
            const normalizedData = {
                categoryName: dto.title,
                clientType: dto.type,
                offers: dto.elements.map(el => ({
                    name: el.title,
                    description: el.description,
                    imageUrl: el.src,
                    benefits: el.details
                }))
            };
            return await this.repo.create(normalizedData);
        } catch (error) {
            console.error('Service error (create):', error);
            throw error;
        }
    }

    async updateProduct(id, updateData) {
        try {
          const existing = await this.getProductById(id);
          if (!existing) throw new Error('Product not found');
          
          // Создаём DTO с объединёнными данными
          const mergedData = { ...existing, ...updateData };
          const dto = new BankProductDTO(mergedData, true);
          
          // Преобразуем в простой объект
          const updatePayload = dto.toJSON();
          
          // Удаляем id из payload, чтобы не обновлять его
          delete updatePayload.id;
          
          return await this.repo.update(id, updatePayload);
        } catch (error) {
          console.error('Service error (update):', error);
          throw error;
        }
      }

    async deleteProduct(id) {
        try {
            const exists = await this.getProductById(id);
            if (!exists) throw new Error('Product not found');
            
            return await this.repo.delete(id);
        } catch (error) {
            console.error('Service error (delete):', error);
            throw error;
        }
    }
}

module.exports = { BankProductService };