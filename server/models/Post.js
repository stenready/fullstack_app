const { Schema, model, Types }=require('mongoose')

const post=new Schema({
  title: { type: String},
  body: { type: String},
  //links: [{ type: Types.ObjectId, ref: 'Link' }]
  userId: { type: Types.ObjectId, ref: 'users' },
  published: { type: Boolean, default: false },
  date: { type: Date, required: true, default: Date.now },
})


module.exports=model('Post', post)