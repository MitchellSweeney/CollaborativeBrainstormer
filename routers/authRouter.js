const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
    let { data, error } = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password
    });
    if (!error) {
        res.status(200).json({
            user_data: data
        });
    } else {
        console.log(error);
        res.status(500).json({
            message: "Error Signing up"
        })
    }
})

router.post("/signin", async (req, res) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    });
    if (!error) {
        console.log(data.session)
        res.status(200).json({
            user_data: data
        });
    } else {
        console.log(error);
        res.status(500).json({
            message: "Error Signing in"
        })
    }
})

router.post("/signout", async (req, res) => {
    let { data, error } = await supabase.auth.signOut();
    if (!error) {
        res.status(200).json({
            message: "Signed out"
        });
    } else {
        console.log(error);
        res.status(500).json({
            message: "Error Signing in"
        })
    }
})

module.exports = router;