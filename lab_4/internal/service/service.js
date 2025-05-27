const { IDCounter } = require('../db/counter');

class Service {
    constructor(repo) {
      this.repo = repo;
    }
  
    findBankProducts(filters = {}) {
      return this.repo.find(filters);
    }
  
    addBankProduct(data) {
      const bankProductData = {
        ...data,
        id: this.repo.getNextId()
      };
      return this.repo.insert(bankProductData);
    }
  
    updateBankProduct(id, updatedData) {
      return this.repo.update(id, updatedData);
    }
  
    deleteBankProduct(id) {
      return this.repo.delete(id);
    }
}

module.exports={
    Service,
}