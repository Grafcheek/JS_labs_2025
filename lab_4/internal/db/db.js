const fs = require('fs')
const path = require('path')

class DBConnector {
    constructor(filename) {
		this.filename = filename
	}

    read() {
        const file = this._readFile()

        return JSON.parse(file)
    }

    write(json) {
        this._writeFile(JSON.stringify(json))
    }

    _readFile() {
		return fs.readFileSync(
			path.join(process.cwd(), 'db', this.filename),
			'utf8'
		)
	}

	_writeFile(data) {
		fs.writeFileSync(
			path.join(process.cwd(), 'db', this.filename),
			data,
			'utf8'
		)
	}
}

module.exports={
	DBConnector,
}