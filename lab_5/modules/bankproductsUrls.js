class BankProductsUrls {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    getTemplates() {
        return `${this.baseUrl}/bank-products`;
    }

    getTemplatesWithSearch(searchTerm) {
        return `${this.baseUrl}/bank-products?title=${encodeURIComponent(searchTerm)}`;
    }

    getTemplateById(id) {
        return `${this.baseUrl}/bank-products/${id}`;
    }

    createTemplate() {
        return `${this.baseUrl}/bank-products`;
    }

    updateTemplate(id) {
        return `${this.baseUrl}/bank-products/${id}`;
    }

    deleteTemplate(id) {
        return `${this.baseUrl}/bank-products/${id}`;
    }
}

export const bankproductsUrls = new BankProductsUrls(); 