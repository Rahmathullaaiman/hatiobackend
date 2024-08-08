const Todos = require('../SCHEMAS/Todoschema')


exports.AddText = async (req, res) => {
    const { title,description } = req.body;
    const userId = req.payload;

    try {
        const newTodo = new Todos({
            userId,
            title,
            description
        });
        await newTodo.save();
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: `Failed to add text: ${error.message}` });
    }
};

exports.GetTodos = async (req, res) => {
    const userId = req.payload
    try {
      const todos = await Todos.find({userId});
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch todos: ${error.message}` });
    }
  };

exports.DeleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Todos.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'ToDo item not found' });
        }

        res.status(200).json({ message: 'ToDo item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete ToDo: ${error.message}` });
    }
};


exports.UpdateTodo = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            id,
            { description },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'ToDo item not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: `Failed to update ToDo: ${error.message}` });
    }
};



exports.updateTodoStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            id,
            { status: 'completed', updatedDate: new Date() },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'ToDo item not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: `Failed to update ToDo status: ${error.message}` });
    }
};