class BankProductDTO {
	constructor(data) {
	  BankProductDTO._validate(data);
	  this.id = data.id || null;
	  this.title = data.title;
	  this.description = data.description;
	  this.src = data.src;
	  this.comments = data.comments || "";
	}
  
	static _validate(data) {
	  if (data.id !== undefined) {
		const numberId = Number.parseInt(data.id);
		if (Number.isNaN(numberId)) {
		  throw new Error('Invalid bank product ID');
		}
	  }
  
	  if (!data.title || typeof data.title !== 'string') {
		throw new Error('Title is required');
	  }
  
	  if (!data.description || typeof data.description !== 'string') {
		throw new Error('Description is required');
	  }

	  if (!data.src || typeof data.src !== 'string') {
		throw new Error('Image source is required');
	  }
	}
  
	toJSON() {
	  return {
		id: this.id,
		title: this.title,
		description: this.description,
		src: this.src,
		comments: this.comments
	  };
	}
  }

module.exports={
	BankProductDTO,
}