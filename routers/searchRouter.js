const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.get("/get_sessions_by_topic", async (req, res) => {
    // gets sessions by topic
    // expects topic in req.body
    const { data, error } = await supabase.from("brainstorm_session")
        .select("*")
        .ilike("topic", `%${req.body.topic}%`); // case insensitive search
    if (error) {
        res.status(500).json({
            message: "Error finding sessions"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_sessions_in_date_range", async (req, res) => {
    // gets sessions within a specified date range
    // expects start_date and end_date in req.body
    // start_date and end_date should be of the form: yyyy-mm-dd
    const { data, error } = await supabase.from("brainstorm_session")
        .select("*")
        .gte("created_at", req.body.start_date)
        .lte("created_at", req.body.end_date);
    if (error) {
        res.status(500).json({
            message: "Error finding sessions"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }

})

router.get("/get_sessions_by_votes", async (req, res) => {
    // gets sessions with a minimum number of votes
    // expects votes in req.body
    const { data, error } = await supabase.from("brainstorm_session")
        .select("*")
        .gte("votes", req.body.votes)
    if (error) {
        res.status(500).json({
            message: "Error finding sessions"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_knowledgebases_by_name", async (req, res) => {
    // gets knowledge bases by name
    // expects name in req.body
    const { data, error } = await supabase.from("knowledge_base")
        .select("*")
        .ilike("name", `%${req.body.name}%`); // case insensitive search
    if (error) {
        res.status(500).json({
            message: "Error finding knowledge bases"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }
})

router.get("/get_knowledgebases_in_date_range", async (req, res) => {
    // gets knowledgebases within a specified date range
    // expects start_date and end_date in req.body
    // start_date and end_date should be of the form: yyyy-mm-dd
    const { data, error } = await supabase.from("knowledge_base")
        .select("*")
        .gte("created_at", req.body.start_date)
        .lte("created_at", req.body.end_date);
    if (error) {
        res.status(500).json({
            message: "Error finding knowledge bases"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }

})

module.exports = router;