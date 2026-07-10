import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";
const SUPABASE_ANON_KEY = "";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

loadMyRequests();

async function loadMyRequests(){

    const { data: userData } = await supabase.auth.getUser();

    if(!userData.user){
        window.location.href="index.html";
        return;
    }

    const user = userData.user;

    const { data, error } = await supabase
    .from("support_requests")
    .select("*")
    .eq("email", user.email)
    .order("created_at", {ascending:false});

    if(error){
        alert(error.message);
        return;
    }

    const box = document.getElementById("userRequests");

    box.innerHTML="";

    if(data.length==0){

        box.innerHTML="<h3>No requests found.</h3>";
        return;

    }

    data.forEach(req=>{

        box.innerHTML+=`

        <div class="card">

            <h3>${req.category}</h3>

            <p><b>Problem:</b> ${req.problem}</p>

            <p><b>Status:</b> ${req.status}</p>

            <p><b>Reply:</b> ${req.reply || "Waiting for Admin..."}</p>

            <hr>

        </div>

        `;

    });

}

window.logout = async function(){

    await supabase.auth.signOut();

    window.location.href="index.html";

}
