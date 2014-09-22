var nodemailer = require("nodemailer");
var Mustache = require("mustache");
var mongoose = require('mongoose');
var marked = require('marked');
var _ = require('underscore');
var db = require("./db");
mongoose.connect('mongodb://pixiewebdesign.net:27017/pixie');

exports.addCategory = function (req, res) {
    res.contentType = "application/json";
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    res.contentType = "application/json";
    var category = new db.Category(req.body);
    category.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send({
                status: "ok"
            })
        }
    });
}

exports.addPortfolio = function (req, res) {
    res.contentType = "application/json";
    if (!req.clientId) {
        return res.sendUnauthorized();
    }
    var pf = new db.Portfolio(req.body);
    pf.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send({
                status: "ok"
            })
        }
    });
}

exports.updateBlog = function (req, res) {

    res.contentType = "application/json";
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    if (req.params.id) {
        delete req.body._id;
        db.Blog.update({_id: req.params.id}, req.body, {}, function (err, num, raw) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send({
                    status: "ok", raw: raw
                })
            }
        });
    } else {
        res.send(400);
    }
}

exports.addBlog = function (req, res) {
    //
    res.contentType = "application/json";
    if (!req.clientId) {
        return res.sendUnauthorized();
    }


    var blog = db.Blog(req.body);
    blog.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send({
                status: "ok"
            })
        }
    });
}


exports.getAPI = function (req, res) {
    res.contentType = "application/json";
    res.send({});
};

exports.getBlogCategories = function (req, res) {
    res.contentType = "application/json";
    if (req.params.id) {
        db.Category.findOne({_id: req.params.id})
            .exec(function (err, data) {
                if (err) throw err;
                res.send(data);
            });
    } else {
        db.Category.find()
            .exec(function (err, data) {
                if (err) throw err;
                res.send(data);
            });
    }
};

exports.getPortfolio = function (req, res) {
    res.contentType = "application/json";
    if (req.params.id) {
        db.Portfolio.findOne({_id: req.params.id})
            .populate('categories') // only return the Persons name
            .exec(function (err, data) {
                if (err) throw err;
                res.send(data);
            });
    } else {
        db.Portfolio.find()
            .populate('categories') // only return the Persons name
            .exec(function (err, data) {
                if (err) throw err;
                res.send(data);
            });
    }
};

exports.getBlog = function (req, res) {
    res.contentType = "application/json";
    var _b = db.Blog;

    if (req.params.id) {
        _b = _b.findOne({_id: req.params.id});
    } else {
        _b = _b.find();
    }

    _b.exec(function (err, data) {
        if (err) throw err;
        //data.excerpt = marked(data.excerpt);
        marked(data.body, function (err, content) {
            if (!err && req.params.mode != 'edit') {
                data.body = content;
            }
            res.send(data);
            //Error is thrown if no markdown is found, so no need to do anything in this instance;
        });
    });
};

exports.postContact = function (req, res) {
    res.contentType = "application/json";
    console.log(req.body);
    var payload = req.body;
    console.log(req.body.name, req.body.email, req.body.query);

    if (!req.body.name || !req.body.email || !req.body.query) {
        res.send({
            error: true,
            message: 'A field is missing. Email, name and query are mandatory.'
        });
    } else {
        var subject = 'Website contact';

        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "mail@pixiewebdesign.net",
                pass: "mail2frompixie"
            }
        });

        var mailOptions = {
            from: "Website Email <mail@pixiewebdesign.net>", // sender address
            to: "Stephen McElhinney <stephen@pixiewebdesign.net>", // list of receivers
            subject: "Website contact", // Subject line
            text: Mustache.render("name: {{name}}\nemail: {{email}}\nbody: {{query}}", req.body), // plaintext body
            html: Mustache.render("name: {{name}}<br/>email: {{email}}<br/>body: {{query}}", req.body) // html body
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.send({
                    "status": "error_sending_email"
                });
            } else {
                console.log("Message sent: " + response.message);
                res.send({
                    "status": "ok"
                });
            }
            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    }
};

