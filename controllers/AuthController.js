const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
exports.signUp = async (req, res) => {
  const { username, email, password } = req.body
  const hashPassword = await bcrypt.hash(password.toString(), 12)
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    })

    req.session.user = newUser

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.login = async (req, res) => {
  const { email, password, username } = req.body

  try {
    // bir method sadece bir kez res.send ile cevap verir aynı anda iki kez cevap veririse headers after they are sent to the client hatası alırsın
    const user = await User.findOne({ email })
    console.log(user)

    if (!user) {
      return res.status(404).send({
        status: 'fail',
        message: 'User not found',
      })
    }

    const isCorrect = await bcrypt.compare(password.toString(), user.password)

    if (isCorrect) {
      req.session.user = user
      return res.status(200).send({
        status: 'success',
        data: {
          user,
        },
      })
    } else {
      return res.status(404).send({
        status: 'fail',
        message: 'Incorrect password',
      })
    }
  } catch (err) {
    return res.status(400).send({
      status: 'fail',
      message: err,
    })
  }
}
