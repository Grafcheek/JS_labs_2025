const fs = require('fs');
const path = require('path');

class IDCounter {
    constructor() {
        this.counterFile = path.join(process.cwd(), 'db', 'counter.json');
        this._initializeCounter();
    }

    _initializeCounter() {
        if (!fs.existsSync(this.counterFile)) {
            fs.writeFileSync(this.counterFile, JSON.stringify({ lastId: 0 }), 'utf8');
        }
    }

    getNextId() {
        const data = JSON.parse(fs.readFileSync(this.counterFile, 'utf8'));
        const nextId = data.lastId + 1;
        fs.writeFileSync(this.counterFile, JSON.stringify({ lastId: nextId }), 'utf8');
        return nextId;
    }
}

module.exports = {
    IDCounter
}; 