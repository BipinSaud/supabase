const { createClient } = require("@supabase/supabase-js");
const querystring = require("querystring");

const supabase = createClient(
  "https://wrsbswenewcnwlhjzqpq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyc2Jzd2VuZXdjbndsaGp6cXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwOTY0NzIsImV4cCI6MjAxOTY3MjQ3Mn0.snwVQ_QlJTVOygy7oRrHEaa3ebXLX12kFZZXdd2z6j4"
);

const handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  console.log("Received event:", event);

  const params = querystring.parse(event.body);
  console.log("Parsed params:", params);

  const { name, number } = params;

  const userData = {
    name,
    number,
  };

  // Save user to SupaBase
  try {
    const { data, error } = await supabase
      .from("user") //
      .insert([{ userData }]);

    console.log("Supabase response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Supabase error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { handler };
