class Repository {
    constructor(db) {
      this.db = db;
    }
  
    find(filters = {}) {
      let bankProducts = this.db.read();
      
      if (filters.title) {
        bankProducts = bankProducts.filter(bp =>
          bp.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
  
      if (filters.id) {
        bankProducts = bankProducts.filter(bp => bp.id === filters.id);
        return bankProducts[0];
      }
  
      return bankProducts;
    }

    update(id, updatedData) {
        const bankProducts = this.db.read();
        const index = bankProducts.findIndex(bp => bp.id === id);

        if (index === -1) return null;

        bankProducts[index] = { ...bankProducts[index], ...updatedData };
        this.db.write(bankProducts);

        return bankProducts[index];
    }

    findById(id) {
        return this.db.read().find(bp => bp.id === id) || null;
    }

    insert(bankProduct) {
        const bankProducts = this.db.read();
        const updatedBankProducts = [...bankProducts, bankProduct];
        this.db.write(updatedBankProducts);
        return bankProduct;
    }

    delete(id) {
        const bankProducts = this.db.read();
        const index = bankProducts.findIndex(bp => bp.id === id);

        if (index === -1) return null;
        
        const filteredBankProducts = bankProducts.filter(bp => bp.id !== id);
        this.db.write(filteredBankProducts);
        return filteredBankProducts;
    }

    getNextId() {
        const bankProducts = this.db.read();
        const maxId = Math.max(...bankProducts.map(bp => bp.id), 0);
        return maxId + 1;
    }
}

module.exports={
    Repository,
}