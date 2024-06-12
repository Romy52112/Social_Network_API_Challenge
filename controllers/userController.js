// controllers/userController.js
const User = require('../models/User');

const userController = {
  getUsers(req, res) {
    User.find({})
      .populate('friends')
      .populate('thoughts')
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate('friends')
      .populate('thoughts')
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  }
};

module.exports = userController;
