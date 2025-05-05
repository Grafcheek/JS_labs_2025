class BankProductDTO {
  constructor(data, isUpdate = false) {
    // Проверка входных данных
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid product data');
    }

    // Нормализация данных
    this.id = data.id ? Number(data.id) : undefined;
    this.title = data.title || data.categoryName || '';
    this.type = (data.type || data.clientType || '').toUpperCase();
    
    // Нормализация элементов
    this.elements = (data.elements || data.offers || []).map(item => ({
      title: item.title || item.name || '',
      description: item.description || '',
      src: item.src || item.imageUrl || '',
      details: item.details || item.benefits || []
    }));

    this._validate(isUpdate);
  }

  _validate(isUpdate = false) {
    const validTypes = ['ФЛ', 'ЮЛ'];
    
    if (this.type && !validTypes.includes(this.type)) {
      throw new Error(`Invalid client type. Allowed: ${validTypes.join(', ')}`);
    }
    
    if (!isUpdate) {
      if (!this.title) throw new Error('Category title is required');
      if (!this.elements?.length) throw new Error('At least one offer is required');
    }
  }

  // Явно определяем метод toJSON
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      elements: this.elements
    };
  }
}

module.exports = { BankProductDTO };