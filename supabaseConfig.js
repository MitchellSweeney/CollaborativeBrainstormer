const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

const proj_url = process.env.PROJECT_URL;
const key = process.env.API_KEY;
const supabase = supabaseClient.createClient(
    proj_url,
    key
);
module.exports = supabase;