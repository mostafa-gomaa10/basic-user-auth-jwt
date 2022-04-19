const JOI = require('@hapi/joi');

const registerValidation = (data) => {

    const registerValidationSchema = JOI.object({
        name: JOI.string().min(6).required(),
        email: JOI.string().min(6).required().email().lowercase(),
        password: JOI.string().min(6).required(),
    })

    return registerValidationSchema.validate(data);

}

const loginValidation = (data) => {

    const loginValidationSchema = JOI.object({
        email: JOI.string().min(6).required().email().lowercase(),
        password: JOI.string().min(6).required(),
    })

    return loginValidationSchema.validate(data);

}




module.exports = {
    registerValidation,
    loginValidation
}