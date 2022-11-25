// module.exports = {
//     db: 'mongodb+srv://hall:1111@cluster0.najih36.mongodb.net/?retryWrites=true&w=majority',
//     //db: 'mongodb://127.0.0.1:27017/blog',
//     secret: 'no_some_secret_key'
// }

module.exports.db = process.env.MONGO_URL
module.exports.secret = 'no_some_secret_key'