import User from '../models/users.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createUser = (req, res) => {
  res.send("Hello from Express!");
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });

    if (!updatedUser[1]) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser[1]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};