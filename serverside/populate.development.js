const { faker } = require('@faker-js/faker')
const LevelModel = require('./src/models/Level')
const LessonModel = require('./src/models/Lesson')
const User = require('./src/models/User')
const LanguageModel = require('./src/models/Language')
const SubscriptionModel = require('./src/models/Subscription')
const { wait, translate } = require('./src/utils')



async function populateDataset() {

    try {

    // languages - english levels
    // lessons
    const random_vocab = [faker.color.human, faker.word.verb, faker.word.noun]
    // random choice
    const random_choice = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const levels = []
    for(var levelIndex = 0; levelIndex < 3; levelIndex ++) {
        const lessons = []
        const level_title = `Level ${levelIndex}`
        for(var i = 0; i < 10; i ++) {
            const lesson_title = `Lesson ${i}`
            const words = []
            const vocabulary = []

            const translations = []
            for(var j = 0; j < 5; j++) {
                const word = random_choice(random_vocab)()
                words.push(word)
                translations.push("תרגום זמני" /*await translate(word, "en", "he")*/)
            }
                words.forEach((word, index) => {
                    const translation = translations[index]
                    vocabulary.push({ word, translation })
                })


                const lesson = await LessonModel.create({
                    vocabulary,
                    title: lesson_title,
                    notes: "Please review this lesson's vocabulary",
                })
                lessons.push(lesson)
        }
        const level = await LevelModel.create({
            title: level_title,
            lessons: lessons.map(lesson => lesson._id)
        })
        levels.push(level)
    }



    const language = await LanguageModel.create({
        name: "English",
        levels: levels.map(level => level._id),
        subscriptions: [],
        thumbnail: "https://img.freepik.com/premium-vector/british-flag-original-colors-proportions-vector-illustration-eps-10_148553-484.jpg"
    })
    // create 5 random users
    const user_levels = ["BEGINNER" , "INTERMEDIATE" , "ADVANCED"]
    for(var i = 0; i  < 5; i++) {
        const name = faker.person.fullName()
        const user_level = random_choice(user_levels)
        const user = await User.create({
            name,
            level: user_level,
            email: (name + "@gmail.com").replaceAll(/\s/g, ""),
            password: faker.word.noun({length: {min: 6, max: 14}}).replaceAll(/\s/g, ""),
            subscriptions: []
        })
        const sub = await SubscriptionModel.create({user: user._id, expireAt : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) })
        user.subscriptions.push(sub._id)
        language.subscriptions.push(sub._id)
        await user.save()
        await language.save()
    }
    } catch(e) {
        console.log(e)
    }
}



module.exports = populateDataset