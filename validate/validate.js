const Joi = require('joi');

const answers = Joi.object().keys({
    answer : Joi.string()
});

exports.validateQuestionsAnswersInsertin = (survey)=>{
    const Schema = {
        survey  : Joi.object().required(),
        question : Joi.string().required(),
        answers : Joi.array().items(answers).required()
    }
    return Joi.validate(survey,Schema);
}

                                    
