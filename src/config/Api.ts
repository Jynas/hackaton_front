const baseUrl: string = 'http://51.250.23.40:5000'
export default {
    signIn: `${baseUrl}/api/v1/Auth/SignIn`,
    signUp: `${baseUrl}/api/v1/Auth/SignUp`,
    questions: `${baseUrl}/api/v1/Questions`,
    questionsAnswer: `${baseUrl}/api/v1/Questions/Answer`,
    answers: `${baseUrl}/api/v1/Answers`,
    checkAnswer: `${baseUrl}/api/v1/Answers/Check`,
}