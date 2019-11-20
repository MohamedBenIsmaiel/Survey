const router = require('express-promise-router')();

const User   = require('../models/user');
const Survey = require('../models/survey');

router.post('/user',async(req,res,next)=>{
    console.log('start insertion user');
    const userName = req.body.userName;
    const email    = req.body.email;
    const password = req.body.password;
    const result = await User.create({
        userName,
        email,
        password
    });
    console.log(result);
    res.send({
        result,
    })
});

router.get('/user',async(req,res,next)=>{
    const result = await User.findAll();
    console.log(result);
    res.send({
        result,
    })
})

router.get('/user/:id',async(req,res,next)=>{
    const result = await User.findAll({
        where: {
            id:req.params.id
        }
    });
    console.log(result);
    res.send({
        result,
    })
})

router.post('/survey',async(req,res,next)=>{
  let sur = await req.user.createSurvey({
       title:req.body.title,
       description:req.body.description
   });
   res.send({
       sur,
   })
})

router.get('/survey',async(req,res,next)=>{
    let sur = await req.user.getSurveys();
     res.send({
         sur,
     });
  });

  router.post('/question',async(req,res,next)=>{
    const surveys = await req.user.getSurveys();
    const survey = surveys[0];
    const questions = await survey.createQuestion({
        title:req.body.title
    });
    res.send({
        questions,
    })
 })

  router.get('/question',async(req,res,next)=>{
     const surveys = await req.user.getSurveys();
     const survey = surveys[0];
     const questions = await survey.getQuestions();
     res.send({
         questions,
     })
  })

  router.get('/answer',async(req,res,next)=>{
    const surveys = await req.user.getSurveys();
    const survey = surveys[0];
    const questions = await survey.getQuestions();
    const question  = questions[0];
    const answers  = await question.getAnswers();
    res.send({
        answers,
    })
 })

 router.post('/answer',async(req,res,next)=>{
    const surveys = await req.user.getSurveys();
    const survey = surveys[0];
    const questions = await survey.getQuestions();
    const question  = questions[0];
    const answers  = await question.createAnswer({
        title:req.body.title
    });
    res.send({
        answers,
    })
 })

 router.post('/rightAnswer',async(req,res,next)=>{
    const surveys = await req.user.getSurveys();
    const survey = surveys[0];
    const questions = await survey.getQuestions();
    const question  = questions[0];
    const rightAnswer  = await question.createRightAnswer({
        title:req.body.title
    });
    res.send({
        rightAnswer,
    })
 })

 router.get('/rightAnswer',async(req,res,next)=>{
    const surveys = await req.user.getSurveys();
    const survey = surveys[0];
    const questions = await survey.getQuestions();
    const question  = questions[0];
    const rightAnswer  = await question.getRightAnswer();
    res.send({
        rightAnswer,
    })
 })
module.exports = router;