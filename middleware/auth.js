const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

const validateSession =  async function (req, res, next) {
    // session validation middleware
    const session = await ((await supabase.auth.getSession()).data);
    console.log("Session:",session);
    if (!session?.session) {
        // the user is not signed in
        res.status(401).json({
            message: "Please sign in"
        });
    }
    else {
        next()
    }
}

module.exports = validateSession;