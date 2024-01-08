const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();

router.post("/create_idea", async (req, res) => {
    /* 
          Assuming req.body looks like this:
          {
              session_id,
              detail (idea details)
          }
      */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    const { data, error } = await supabase
        .from("idea")
        .insert([{ session_id: req.body.session_id, detail: req.body.detail, user_id }])
        .select();
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error posting idea",
        });
    } else {
        res.status(200).json({
            data,
        });
    }
});

router.delete("/delete_idea", async (req, res) => {
    /* 
          Assuming req.body looks like this:
          {
              idea_id,
          }
    */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("idea")
        .select("user_id")
        .eq("id", req.body.idea_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('idea')
            .delete()
            .eq("id", req.body.idea_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting idea"
            })
        }
        else {
            res.status(200).json({
                message: "Idea deleted"
            })
        }
    } else {
        res.status(401).json({
            message: "This idea does not belong to you"
        })
    }
})

router.patch("/edit_idea", async (req, res) => {
    /* 
         Assuming req.body looks like this:
         {
             idea_id,
             new_idea
         }
   */
    const user_id = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase
        .from("idea")
        .select("user_id")
        .eq("id", req.body.idea_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from('idea')
            .update([{ detail: req.body.new_idea }])
            .eq("id", req.body.idea_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error updating idea"
            })
        }
        else {
            res.status(200).json({
                message: "Idea updated"
            })
        }
    } else {
        res.status(401).json({
            message: "This idea does not belong to you"
        })
    }
})

module.exports = router;
