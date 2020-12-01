class SuccessMessage {

  constructor(content, field = null) {
    this.content = content;
    this.field = field;
  }

  send(response) {
    response.status(201);
    response.json({
      success: {
        message: this.content,
      }
    })
  }

}

module.exports = {
  SuccessMessage,
}