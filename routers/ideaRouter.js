const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/create_idea", upload.single("file"), async (req, res) => {
    /* 
              Assuming req.body looks like this:
              {
                  session_id,
                  detail (idea details)
              }
          */
    // ideas can contain files (any type)
    const user_id = (await supabase.auth.getUser()).data.user.id;
    if (req.file?.buffer) {
        // file upload 
        const { d, e } = await supabase.storage
            .from("idea_files")
            .upload(`${req.file.originalname}`, req.file.buffer, { contentType: req.file.mimetype });
        const public_url = await supabase.storage.from("idea_files").getPublicUrl(`${req.file.originalname}`);
        // idea creation
        const { data, error } = await supabase
            .from("idea")
            .insert([{ session_id: req.body.session_id, detail: req.body.detail, user_id, file_url: public_url.data.publicUrl }])
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
    } else {
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
        .select("*")
        .eq("id", req.body.idea_id);

    if (data[0].user_id == user_id) {
        let { _, error } = await supabase
            .from("idea")
            .delete()
            .eq("id", req.body.idea_id);

        // if idea contains a file url we have to delete that file from storage as well
        if (data[0].file_url != null) {
            let public_url = data[0].file_url;
            let file_string_index = public_url.lastIndexOf('/') + 1;
            let file_string = public_url.substring(file_string_index);
            const { d, e } = await supabase.storage.from("idea_files").remove([`${file_string}`]);
            console.log(d, e);
        }
        await supabase.from("idea_files")
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting idea",
            });
        } else {
            res.status(200).json({
                message: "Idea deleted",
            });
        }
    } else {
        res.status(401).json({
            message: "This idea does not belong to you",
        });
    }
});

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
            .from("idea")
            .update([{ detail: req.body.new_idea }])
            .eq("id", req.body.idea_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error updating idea",
            });
        } else {
            res.status(200).json({
                message: "Idea updated",
            });
        }
    } else {
        res.status(401).json({
            message: "This idea does not belong to you",
        });
    }
});

module.exports = router;
