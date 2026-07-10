alert("welcome boss");
 import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
 
 const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";
 const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1YmVtc3BraXFvem9udmRtdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjQzNjAsImV4cCI6MjA5ODc0MDM2MH0.0ljnq2qh_5AlYTupqLhK4Jsj77ocicMwoDY0NeOewHc";
 
 const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 
 // Weka email yako ya admin hapa
 const ADMIN_EMAIL = "jastinesamo@gmail.com";
 
 
 window.login = async function () {
 
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;
 
     const { data, error } = await supabase.auth.signInWithPassword({
         email: email,
         password: password
     });
 
     if (error) {
         alert("Login imekataa: " + error.message);
         return;
     }
 
     if (data.user.email !== ADMIN_EMAIL) {
         alert("Huna ruhusa ya kuingia Admin Dashboard");
         await supabase.auth.signOut();
         return;
     }
 
     document.getElementById("loginBox").style.display = "none";
     document.getElementById("dashboard").style.display = "block";
 
     loadRequests();
 };
 
 
 // Kusoma matatizo ya watumiaji
 async function loadRequests(){
 
     const { data, error } = await supabase
         .from("support_requests")
         .select("*")
         .order("created_at", { ascending:false });
 
 
     if(error){
         alert(error.message);
         return;
     }
 
 
     const box = document.getElementById("requests");
 
     box.innerHTML = "";
 
 
     data.forEach(req => {
 
         box.innerHTML += `
         <div>
             <hr>
             <p><b>Email:</b> ${req.email}</p>
             <p><b>Phone:</b> ${req.phone}</p>
             <p><b>Category:</b> ${req.category}</p>
             <p><b>Problem:</b> ${req.problem}</p>
 
             <textarea id="reply-${req.id}" 
             placeholder="Andika jibu hapa"></textarea>
 
             <button onclick="sendReply('${req.id}')">
             Send Reply
             </button>
 
             <p>Status: ${req.status || "Pending"}</p>
         </div>
         `;
     });
 
 }
 
 
 // Kuhifadhi jibu
 window.sendReply = async function(id){
 
     const reply = document.getElementById(`reply-${id}`).value;
 
 
     const { error } = await supabase
     .from("support_requests")
     .update({
         reply: reply,
         status: "Answered"
     })
     .eq("id", id);
 
 
     if(error){
         alert(error.message);
         return;
     }
 
 
     alert("Jibu limetumwa");
     loadRequests();
 
 }
