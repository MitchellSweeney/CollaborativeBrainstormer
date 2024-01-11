const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.get("/get_sessions", async (req, res) => {
    // gets all brainstorm sessions
    const { data, error } = await supabase.from("brainstorm_session").select("*");
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching sessions"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_session_ideas", async (req, res) => {
    // gets all ideas in a brainstorm session
    // expects session_id in req.body
    const { data, error } = await supabase.from("idea").select("detail").eq("session_id", req.body.session_id);
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching ideas"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_session_comments", async (req, res) => {
    // gets all comments towards a brainstorm session
    // expects session_id in req.body
    const { data, error } = await supabase.from("session_comments").select("comment").eq("session_id", req.body.session_id);
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching session comments"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_idea_comments", async (req, res) => {
    // gets all comments towards an idea
    // expects idea_id in req.body
    const { data, error } = await supabase.from("idea_comments").select("comment").eq("idea_id", req.body.idea_id);
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching idea comments"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_knowledgebases", async (req, res) => {
    // gets all knowledge bases
    const { data, error } = await supabase.from("knowledge_base").select("*");
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching knowledge bases"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_knowledgebase_ideas", async (req, res) => {
    // gets all ideas within a knowledge base
    // expects knowledgebase_id in req.body
    const { data, error } = await supabase.from("knowledge_idea_join")
        .select("idea(*)")
        .eq("knowledgebase", req.body.knowledgebase_id);
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching knowledge base ideas"
        });
    } else {
        res.status(200).json({
            data
        })
    }
})

module.exports = router;