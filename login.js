const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
"https://irnxggvfjalmlsebqxgb.supabase.co",
"sb_publishable_50n04sydkZj0gUtpkA64ng_T9IHNKhI"
);

exports.handler = async (event) => {
const { email, password } = JSON.parse(event.body);

const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) return { statusCode: 401, body: JSON.stringify({ message: authError.message }) };

const { data: user, error: userError } = await supabase.from("users").select("approved").eq("email", email).single();
if (userError || !user.approved) return { statusCode: 403, body: JSON.stringify({ message: "Account not approved yet." }) };

return { statusCode: 200, body: JSON.stringify({ message: "Login successful!", success: true }) };
};