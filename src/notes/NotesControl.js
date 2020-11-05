class NotesControl {
    constructor(data) {
        this.idMsg = data.idMsg
        this.msg = data.msg
        this.curDate = new Date()
        this.dateAndTime = data.dateAndTime
    }
}                       

module.exports = NotesControl

