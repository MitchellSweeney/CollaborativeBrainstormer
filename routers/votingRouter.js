const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.post("/upvote_session", async (req, res) => {
    // expects session_id in req.body
    // uses rpc to call function in database
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("increment_session_vote", { session_id: req.body.session_id, req_user: user_id });
    if (error) {
        res.status(500).json({
            message: "Error casting vote"
        })
    }
    else {
        res.status(200).json({
            message: "Vote casted"
        })
    }
})

router.post("/remove_session_vote", async (req, res) => {
    // expects session_id in req.body
    // checks if vote exists, uses rpc to decrement vote
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from("session_votes")
        .select("*")
        .eq("session", req.body.session_id)
        .eq("user_id", user_id);
    if (data.length > 0) {
        try {
            await supabase.from("session_votes")
                .delete()
                .eq("session", req.body.session_id)
                .eq("user_id", user_id);
            await supabase.rpc("decrement_session_vote", { session_id: req.body.session_id })
            res.status(200).json({
                message: "Vote removed"
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error removing vote"
            })
        }

    }
    res.status(500).json({
        message: "Vote does not exist"
    })

})

router.post("/upvote_idea", async (req, res) => {
    // expects idea_id in req.body
    // uses rpc to call function in database
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("increment_idea_vote", { idea_id: req.body.idea_id, req_user: user_id });
    if (error) {
        res.status(500).json({
            message: "Error casting vote"
        })
    }
    else {
        res.status(200).json({
            message: "Vote cast"
        })
    }
})

router.post("/remove_idea_vote", async (req, res) => {
    // expects idea_id in req.body
    // checks if vote exists, uses rpc to decrement vote
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from("idea_votes")
        .select("*")
        .eq("idea", req.body.idea_id)
        .eq("user_id", user_id);
    if (data.length > 0) {
        try {
            await supabase.from("idea_votes")
                .delete()
                .eq("idea", req.body.idea_id)
                .eq("user_id", user_id);
            await supabase.rpc("decrement_idea_vote", { idea_id: req.body.idea_id })
            res.status(200).json({
                message: "Vote removed"
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error removing vote"
            })
        }

    } else {
        res.status(500).json({
            message: "Vote does not exist"
        })
    }

})

router.post("/upvote_session_comment", async (req, res) => {
    // expects comment_id in req.body
    // uses rpc to call function in database
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("increment_session_comment_vote", { comment_id: req.body.comment_id, req_user: user_id });
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error casting vote"
        })
    }
    else {
        res.status(200).json({
            message: "Vote cast"
        })
    }
})

router.post("/remove_session_comment_vote", async (req, res) => {
    // expects comment_id in req.body
    // checks if vote exists, uses rpc to decrement vote
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from("session_comment_votes")
        .select("*")
        .eq("comment", req.body.comment_id)
        .eq("user_id", user_id);
    if (data.length > 0) {
        try {
            await supabase.from("session_comment_votes")
                .delete()
                .eq("comment", req.body.comment_id)
                .eq("user_id", user_id);
            await supabase.rpc("decrement_session_comment_vote", { session_comment_id: req.body.comment_id })
            res.status(200).json({
                message: "Vote removed"
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error removing vote"
            })
        }

    } else {
        res.status(500).json({
            message: "Vote does not exist"
        })
    }

})

router.post("/upvote_idea_comment", async (req, res) => {
    // expects comment_id in req.body
    // uses rpc to call function in database
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("increment_idea_comment_vote", { comment_id: req.body.comment_id, req_user: user_id });
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error casting vote"
        })
    }
    else {
        res.status(200).json({
            message: "Vote cast"
        })
    }
})

router.post("/remove_idea_comment_vote", async (req, res) => {
    // expects comment_id in req.body
    // checks if vote exists, uses rpc to decrement vote
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from("idea_comment_votes")
        .select("*")
        .eq("comment", req.body.comment_id)
        .eq("user_id", user_id);
    if (data.length > 0) {
        try {
            await supabase.from("idea_comment_votes")
                .delete()
                .eq("comment", req.body.comment_id)
                .eq("user_id", user_id);
            await supabase.rpc("decrement_idea_comment_vote", { idea_comment_id: req.body.comment_id })
            res.status(200).json({
                message: "Vote removed"
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error removing vote"
            })
        }

    } else {
        res.status(500).json({
            message: "Vote does not exist"
        })
    }

})


module.exports = router;