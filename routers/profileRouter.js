const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.get("/get_my_sessions", async (req, res) => {
    // get sessions of logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("brainstorm_session").select("*").eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error fetching sessions"
        })
    }else{
        res.status(200).json({
            data
        })
    }
})

router.get("/get_my_ideas", async (req, res) => {
    // get ideas of logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("idea").select("*").eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error fetching ideas"
        })
    }else{
        res.status(200).json({
            data
        })
    }
})

router.get("/get_my_session_comments", async (req, res) => {
    // get comments made by logged in user on sessions
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("session_comments").select("*").eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error fetching session comments"
        })
    }else{
        res.status(200).json({
            data
        })
    }
})

router.get("/get_my_idea_comments", async (req, res) => {
    // get comments made by logged in user on ideas
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("idea_comments").select("*").eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error fetching idea comments"
        })
    }else{
        res.status(200).json({
            data
        })
    }
})

router.get("/get_my_knowledgebases", async (req, res) => {
    // get all knowledge bases made by logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("knowledge_base").select("*").eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error fetching knowledge bases"
        })
    }else{
        res.status(200).json({
            data
        })
    }
})

router.delete("/delete_all_sessions", async(req, res) => {
    // delete all sessions of logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("brainstorm_session").delete().eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error deleting all sessions"
        })
    }else{
        res.status(200).json({
            message: "All sessions deleted"
        })
    }
})

router.delete("/delete_all_ideas", async(req, res) => {
    // delete all ideas of logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("idea").delete().eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error deleting all ideas"
        })
    }else{
        res.status(200).json({
            message: "All ideas deleted"
        })
    }
})

router.delete("/delete_all_knowledgebases", async(req, res) => {
    // delete all knowledge bases of logged in user
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const {data, error} = await supabase.from("knowledge_base").delete().eq("user_id", user_id);
    if(error){
        console.log(error);
        res.status(500).json({
            message: "Error deleting all knowledge bases"
        })
    }else{
        res.status(200).json({
            message: "All knowledge bases deleted"
        })
    }
})


module.exports = router;