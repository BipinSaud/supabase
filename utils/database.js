const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://wrsbswenewcnwlhjzqpq.supabase.co",
  "SUPABASE_CLIENT_API_KEY"
);

const superbaseUrl = process.env.SUPERBASE_URL;
const superbaseKey = process.env.SUPERBASE_KEY;

exports.supabase = createClient(superbaseUrl, superbaseKey);
