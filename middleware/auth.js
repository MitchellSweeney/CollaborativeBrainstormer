const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

const validateSession = async function (req, res, next) {
    // session validation middleware
    const session = await (await supabase.auth.getSession()).data;
    console.log("Session:", session);
    if (!session?.session) {
        // the user is not signed in
        res.status(401).json({
            message: "Please sign in",
        });
    } else {
        next();
    }
};
const verifyResourceOwnership = async function (resource_name, resource_id) {
    const user_id = (await supabase.auth.getUser()).data.user.id;
    console.log(resource_name, resource_id);
    let { data: resouce_name, error } = await supabase
        .from(resource_name)
        .select("*")
        .eq("id", resource_id);
    console.log("Middleware", resouce_name, error);
    if(resouce_name.length == 0 && error == null){
        return false;
    }
    if (resouce_name[0].user_id == user_id) {
        return true;
    } else {
        return false;
    }
};

module.exports = { validateSession, verifyResourceOwnership };
