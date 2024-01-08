const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.post("/post_session_comment", async (req, res) => {
    /* 
           Assuming req.body looks like this:
           {
               session_id,
               comment (comment on session)
           }
       */
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
        .from("session_comments")
        .insert([
            {
                session_id: req.body.session_id,
                comment: req.body.comment,
                user_id,
            },
        ])
        .select();
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error posting comment",
        });
    } else {
        res.status(200).json({
            data,
        });
    }
});

router.post("/post_idea_comment", async (req, res) => {
    /* 
           Assuming req.body looks like this:
           {
               idea_id,
               comment (comment on session)
           }
       */
    const user_id = (await supabase.auth.getUser())?.data?.user?.id;
    const { data, error } = await supabase
        .from("idea_comments")
        .insert([{ idea_id: req.body.idea_id, comment: req.body.comment, user_id }])
        .select();
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error posting comment",
        });
    } else {
        res.status(200).json({
            data,
        });
    }
});

router.delete("/delete_session_comment", async (req, res) => {
     /* 
           Assuming req.body looks like this:
           {
               comment_id,
           }
    */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("session_comments")
        .select("user_id")
        .eq("id", req.body.comment_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('session_comments')
            .delete()
            .eq("id", req.body.comment_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting comment"
            })
        }
        else {
            res.status(200).json({
                message: "Comment deleted"
            })
        }
    } else {
        res.status(401).json({
            message: "This comment does not belong to you"
        })
    }
})

router.delete("/delete_idea_comment", async (req, res) => {
     /* 
           Assuming req.body looks like this:
           {
               comment_id,
           }
    */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("idea_comments")
        .select("user_id")
        .eq("id", req.body.comment_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('idea_comments')
            .delete()
            .eq("id", req.body.comment_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting comment"
            })
        }
        else {
            res.status(200).json({
                message: "Comment deleted"
            })
        }
    } else {
        res.status(401).json({
            message: "This comment does not belong to you"
        })
    }
})

router.patch("/edit_session_comment", async (req, res) => {
    /*
        Assuming body looks like:
        {
            comment_id
            new_comment
        }
    */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("session_comments")
        .select("user_id")
        .eq("id", req.body.comment_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('session_comments')
            .update([{comment: req.body.new_comment}])
            .eq("id", req.body.comment_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error updating comment"
            })
        }
        else {
            res.status(200).json({
                message: "Comment updated"
            })
        }
    } else {
        res.status(401).json({
            message: "This comment does not belong to you"
        })
    }
})

router.patch("/edit_idea_comment", async (req, res) => {
    /*
        Assuming body looks like:
        {
            comment_id
            new_comment
        }
    */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("idea_comments")
        .select("user_id")
        .eq("id", req.body.comment_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('idea_comments')
            .update([{comment: req.body.new_comment}])
            .eq("id", req.body.comment_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error updating comment"
            })
        }
        else {
            res.status(200).json({
                message: "Comment updated"
            })
        }
    } else {
        res.status(401).json({
            message: "This comment does not belong to you"
        })
    }
})


module.exports = router;
