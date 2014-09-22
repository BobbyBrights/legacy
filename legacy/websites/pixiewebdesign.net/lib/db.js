var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var blogSchema = new Schema({
    title: String,
    author: String,
    excerpt: String,
    body: String,
    comments: [
        { body: String, date: Date }
    ],
    featuredImage: String,
    date: { type: Date, default: Date.now },
    published: Boolean,
    categories: [
        {type: Schema.Types.ObjectId, ref: 'Category'}
    ]
});

var categorySchema = new Schema({
    title: String
});

var portfolioSchema = new Schema({
    title: String,
    images: [
        {src: String}
    ],
    summary: String,
    description: String,
    launch_date: { type: Date, default: Date.now },
    categories: [
        {type: Schema.Types.ObjectId, ref: 'Category'}
    ]
});


// Models
exports.Blog = mongoose.model('Blog', blogSchema);
exports.Category = mongoose.model('Category', categorySchema);
exports.Portfolio = mongoose.model('Portfolio', portfolioSchema);