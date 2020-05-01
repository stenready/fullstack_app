const { Router }=require('express')
const router=Router()

const passport=require('passport')
const Post=require('../models/Post')
const myModalUser=require('../models/User')


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const data=await Post.find({}).populate('userId', 'email name', myModalUser)
  res.status(200).json(data)
})
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const data=await Post.find({ userId: req.user.id }).sort({ "date": -1 }).populate('userId', 'email name', myModalUser)

  res.status(200).json(data)
})

router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, body }=req.body
  const data=new Post({ title, body, userId: req.user.id })
  await data.save()
  res.json({ data })
})

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const resm = await Post.findById({ '_id': req.params.id }).populate('userId', 'email name', myModalUser)
    // post.sayHello('stas privet')
    // req.user.sayHello('привет')
  res.status(200).json(resm)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Post.deleteOne({ '_id': req.params.id })
  res.status(202).json(req.params.id)
})

router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, body, id }=req.body
  const post=await Post.findByIdAndUpdate(id, { title, body, date: Date.now() }, { new: true })
  res.status(201).json(post)
})



module.exports=router