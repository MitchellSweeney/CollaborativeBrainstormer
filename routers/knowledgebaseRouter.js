const supabase = require("../supabaseConfig");
const express = require("express");
const router = express.Router();
const { verifyResourceOwnership } = require("../middleware/auth");
router.post("/create", async (req, res) => {
    // creates a knowledge base 
    // expects name in req.body
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from("knowledge_base")
        .insert([{ name: req.body.name, user_id }])
        .select();
    if (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating knowledge base"
        })
    } else {
        res.status(200).json({
            data
        })
    }
})

router.post("/add_idea", async (req, res) => {
    // adds an idea to a knowledge base
    // expects knowledgebase_id and idea_id in req.body
    // only creator of knowledge base can add idea 
    if (await verifyResourceOwnership("knowledge_base", req.body.knowledgebase_id)) {
        const { data, error } = await supabase.from("knowledge_idea_join")
            .insert([{ knowledgebase: req.body.knowledgebase_id, idea: req.body.idea_id }])
            .select();
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error adding idea to knowledge base"
            })
        } else {
            res.status(200).json({
                data
            })
        }
    } else {
        res.status(401).json({
            message: "This knowledge base does not exist or does not belong to you"
        })
    }
})

router.delete("/remove_idea", async (req, res) => {
    // removes an idea from a knowledge base
    // expects knowledgebase_id and idea_id in req.body
    // only creator of knowledge base can remove idea
    if (await verifyResourceOwnership("knowledge_base", req.body.knowledgebase_id)) {
        const { data, error } = await supabase.from("knowledge_idea_join")
            .delete()
            .eq("knowledgebase", req.body.knowledgebase_id)
            .eq("idea", req.body.idea_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error removing idea from knowledge base"
            })
        } else {
            console.log(data);
            res.status(200).json({
                message: "Idea removed"
            })
        }
    } else {
        res.status(401).json({
            message: "This knowledge base does not exist or does not belong to you"
        })
    }
})

router.patch("/edit_name", async (req, res) => {
    // updates the name of a knowledge base
    // expects knowledgebase_id and name in req.body
    // only creator of knowledge base can edit name
    if (await verifyResourceOwnership("knowledge_base", req.body.knowledgebase_id)) {
        const { data, error } = await supabase.from("knowledge_base")
            .update([{ name: req.body.name }])
            .eq("id", req.body.knowledgebase_id)
            .select();
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error renaming knowledge base"
            })
        } else {
            console.log(data);
            res.status(200).json({
                data
            })
        }
    } else {
        res.status(401).json({
            message: "This knowledge base does not exist or does not belong to you"
        })
    }

})

router.delete("/delete", async (req, res) => {
    // deletes a knowledge base
    // delete cascades to knowledge_idea_join table
    // expects knowledgebase_id in req.body
    // only creator of knowledge base can delete it
    if (await verifyResourceOwnership("knowledge_base", req.body.knowledgebase_id)) {
        const { data, error } = await supabase.from("knowledge_base").delete().eq("id", req.body.knowledgebase_id);
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error deleting knowledge base"
            })
        } else {
            res.status(200).json({
                message: "Knowledge base deleted"
            })
        }
    } else {
        res.status(401).json({
            message: "This knowledge base does not exist or does not belong to you"
        })
    }

})

module.exports = router;