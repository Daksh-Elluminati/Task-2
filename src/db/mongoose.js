const mongoose = require('mongoose')
/**Connect the mongodb server on the port 27017 */
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/User-Collection', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})