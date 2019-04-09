const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true})
    .then(()=> console.log('Connected to MD'))
    .catch(()=> console.error('Error: cannot connect to MD'))

const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse () {
    
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    })
    
    const result = await course.save()
    console.log(result);
}
    // eq
    // ne
    // gt
    // gte
    // lt
    // lte
    // in 
    // nin
async function getCourses() {
    const pageNumber = 1;
    const pageSize = 10;
    // /api/courses?pageNumber-2&pageSize=10
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true})
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find(({ price: { $in: [10, 15, 20] } }))
        .find({author: /^Mosh/}) // start with
        .find({author: /Hamedani$/i}) // end with, i => case insensive
        .find({author: /.*Mosh.*/i}) // include
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .or([ { author:'Mosh'}, {isPublished: true} ]) // !! either one of these match 
        .sort({ name: 1 })
        .select({ name: 1, tags: 1})
        // .countDocuments()
    console.log(courses);
    
}

getCourses()