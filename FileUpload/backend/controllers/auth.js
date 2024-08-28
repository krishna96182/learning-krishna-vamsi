const auth = require("../middlewares/auth");
const Author = require("../models/authors");

exports.getAuthors = {
    auth,
    async function(req, res, next) {
        let results = await Author.find();
        res.json(results);
    },
};