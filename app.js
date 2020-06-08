const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')
const path = require('path')

//Bellow are custom imports
const hashMethod = require('./utils/hash')
const mainRouter = require('./routes/regular')
const studentApiRoutes = require('./routes/studentsapiroutes')
const staffsApiRoutes = require('./routes/staffsapiroutes')
const adminRoutes = require('./routes/adminroutes')
const app = express();

app.engine('handlebars',expressHbs());
app.set('view engine','handlebars');
app.set('views','views');



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(mainRouter)

app.use('/api/students',studentApiRoutes)
app.use('/api/staffs',staffsApiRoutes)
app.use(adminRoutes)




app.listen(3000)