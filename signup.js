const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
"https://irnxggvfjalmlsebqxgb.supabase.co",
"sb_publishable_50n04sydkZj0gUtpkA64ng_T9IHNKhI"
);

exports.handler = async (event) => {
const { name, email, password } = JSON.parse(event.body);

const { data: authUser, error: authError } = await supabase.auth.signUp({ email, password });
if (authError) return { statusCode: 400, body: JSON.stringify({ message: authError.message }) };

const { data, error } = await supabase.from("users").insert([{ name, email, approved: false }]);
if (error) return { statusCode: 400, body: JSON.stringify({ message: error.message }) };

return { statusCode: 200, body: JSON.stringify({ message: "Signup successful! Waiting approval.", success: true }) };
};