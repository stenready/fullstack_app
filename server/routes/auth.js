const { Router }=require('express')
const router=Router()

const { check, validationResult }=require('express-validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

const User=require('../models/User')

router.post(
  '/register',
  [
    check('email', 'Некоректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
    check('name', "Имя - обязательно").exists()
  ],
  async (req, res) => { //регистрация пользователя

    try {
      const errors=validationResult(req)
      if (!errors.isEmpty()) return res.json({ errors: errors.array() })

      const { email, password, name }=req.body
      const candidate=await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hash=await bcrypt.hash(password, 12)
      const user=new User({ email, password: hash, name })
      await user.save()

      const token = jwt.sign(
        { userId: user.id },
        config.secret_key,
        { expiresIn:config.time_acsess_token }
      )

      res.status(201).json({ user, token: `Bearer ${token}`, message: 'User is created', })

    } catch (error) {
      res.status(500).json({ message: `Что-то пошло не так`, error })
    }
  })

router.post(    //логин пользователя
  '/login', 
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors=validationResult(req)
    if (!errors.isEmpty()) return res.json({ errors: errors.array() })

    const { email, password }=req.body

    const user = await User.findOne( { email } )
    if( !user ) return res.status(400).json( { message: 'Пользователь не найден' } )

    const match = await bcrypt.compare(password, user.password)
    if( !match  ) return res.status(400).json( { message: 'пароль не правильный' } )

    const token = jwt.sign(
      { userId: user.id },
      config.secret_key,
      { expiresIn:config.time_acsess_token }
    )
    console.log(token)
    res.json({ token: `Bearer ${token}`, user })


  } catch (error) {
    res.status(500).json({ message: `Что-то пошло не так при логине`, error })
  }
})



module.exports=router