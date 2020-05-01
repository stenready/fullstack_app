const { Schema, model, Types }=require('mongoose')

const user=new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
  //links: [{ type: Types.ObjectId, ref: 'Link' }]
})

user.methods.sayHello = function(hello) {
  console.log(hello + ' ' + this.name);
  return this
}

module.exports=model('User', user)