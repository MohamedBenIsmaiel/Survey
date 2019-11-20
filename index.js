const express = require('express');

const sequelize = require('./db_connect');
const User      = require('./models/user');
const Survey    = require('./models/survey');
const Question  = require('./models/question');
const Answer    = require('./models/answer');
const RightAnswer = require('./models/rightAnswer');
const router    = require('./route/route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(async(req,res,next)=>{
   const user = await User.findByPk(1);
   req.user   = user;
    next();
});
app.use('/api',router);

Survey.belongsTo(User);
User.hasMany(Survey,{constraints:true,onDelete:'CASCADE'});

Question.belongsTo(Survey);
Survey.hasMany(Question,{constraints:true,onDelete:'CASCADE'});

Answer.belongsTo(Question);
Question.hasMany(Answer,{constraints:true,onDelete:'CASCADE'});

Question.hasOne(RightAnswer);
RightAnswer.belongsTo(Question);

sequelize.sync().then(res=>{
    const port = process.env.port || 3000;
    app.listen(port,()=>{
        console.log(`Server Listens on ${port}`);
        console.log('user table created');
    });
}).catch(err=>{
    console.log(err);
})
