const router = require('express-promise-router')();
const {validateQuestionsAnswersInsertin} = require('../validate/validate')
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

 router.post('/insertServy',async(req,res,next)=>{

    const {error} = validateQuestionsAnswersInsertin(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const survey = await req.user.createSurvey({
       title:req.body.survey.title,
       description:req.body.survey.description
    });

    const Question = await survey.createQuestion({
       title:req.body.question
    });
   
    for(let i=0; i< req.body.answers.length;i++){
    const createAnswers  = await Question.createAnswer({
        title:req.body.answers[i].title
    });
    const RightAnswer  = await Question.createRightAnswer({
        title:req.body.rightAnswer
    });
  }
  res.status(200).send({
   success:true,
   message:'your Servey has been inserted'
 });

});

router.get('/insertServy/:surveyId/:questionId',async(req,res,next)=>{
   
    if(req.params.surveyId <= 0){
        return res.status(400).send("The Id of survey should be Greater than Zero");
     }
     if(req.params.questinId <= 0){
         return res.status(400).send("The Id of question survey should be Greater than Zero");
     } 
    const surveyId = req.params.surveyId -1;
    const questionId = req.params.questionId -1;
   
    const surveys = await req.user.getSurveys();
    if(surveys.length === 0){
        return res.status(400).send("the survey is empty")
    }
    const survey  = surveys[surveyId];
    const questions = await survey.getQuestions();
    if(questions.length === 0){
        return res.status(400).send("No question Found");
    }
    const question  = questions[questionId];
    const answers   = await question.getAnswers();
    
    res.status(200).send({
       success:true,
       message:"succeed",
       survey:survey,
       question:question,
       availableAnswers:answers
    })
});


module.exports = router;
