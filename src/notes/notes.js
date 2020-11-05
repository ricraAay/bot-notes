const NotesControl = require("./NotesControl")

class Notes extends NotesControl {
	constructor(dataUser) {
		super(dataUser)
	}

	timer() {
		const now = Date.now()
		const time = Date.parse(this.dateAndTime)
		return time - now  
	}
}

module.exports = Notes