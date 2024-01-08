const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.post("/create_session", async (req, res) => {
    // create brainstorm session, requires authenticated user
    // expects topic in req.body
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
        .from("brainstorm_session")
        .insert([{ "user_id": user_id , "topic": req.body.topic}])
        .select();
    if (error) {
        res.status(500).json({
            message: "Error creating session"
        })
    }
    else {
        res.status(200).json({
            data
        })
    }
});

router.delete("/delete_session", async (req, res) => {
    // delete brainstorm session, can only delete your own sessions
    // deletes cascade to ideas
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data: brainstorm_session, error } = await supabase
        .from('brainstorm_session')
        .select('user_id')
        .eq("id", req.body.session_id);

    if(brainstorm_session[0].user_id == user_id){
        let { _ , error } = await supabase
        .from('brainstorm_session')
        .delete()
        .eq("id", req.body.session_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting session"
            })
        }
        else {
            res.status(200).json({
                message: "Session deleted"
            })
        }
    } else{
        res.status(401).json({
            message: "This session does not belong to you"
        })
    }
   
})

module.exports = router;
