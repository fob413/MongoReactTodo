export default {
  /**
   * create a new todo
   * @param {any} req 
   * @param {any} res 
   */
  newTodo(req, res) {
    res.send({
      success: true
    });
  }
}
