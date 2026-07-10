import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1YmVtc3BraXFvem9udmRtdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjQzNjAsImV4cCI6MjA5ODc0MDM2MH0.0ljnq2qh_5AlYTupqLhK4Jsj77ocicMwoDY0NeOewHc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ======================
   SWITCH PAGES
   ====================== */

   window.showRegister = function () {
   	  document.getElementById("loginSection").style.display = "none";
   	    document.getElementById("registerSection").style.display = "block";
   	    };

   	    window.showLogin = function () {
   	    	  document.getElementById("registerSection").style.display = "none";
   	    	    document.getElementById("loginSection").style.display = "block";
   	    	    };

   	    	    /* ======================
   	    	       REGISTER
   	    	       ====================== */

   	    	       window.register = async function () {

   	    	       	  const fullName = document.getElementById("fullName").value;
   	    	       	    const gender = document.getElementById("gender").value;
   	    	       	      const email = document.getElementById("email").value;
   	    	       	        const phone = document.getElementById("phone").value;
   	    	       	          const birthdate = document.getElementById("birthdate").value;
   	    	       	            const password = document.getElementById("password").value;
   	    	       	              const confirmPassword = document.getElementById("confirmPassword").value;

   	    	       	                if (password !== confirmPassword) {
   	    	       	                	    alert("Passwords do not match!");
   	    	       	                	        return;
   	    	       	                	          }

   	    	       	                	            const { data, error } = await supabase.auth.signUp({
   	    	       	                	            	    email,
   	    	       	                	            	        password
   	    	       	                	            	          });

   	    	       	                	            	            if (error) {
   	    	       	                	            	            	    alert(error.message);
   	    	       	                	            	            	        return;
   	    	       	                	            	            	          }
                      alert("Requests zilizopatikana: " + data.length);

   	    	       	                	            	            	            // Save profile
   	    	       	                	            	            	              await supabase.from("profiles").insert([{
   	    	       	                	            	            	              	    full_name: fullName,
   	    	       	                	            	            	              	        gender,
   	    	       	                	            	            	              	            email,
   	    	       	                	            	            	              	                phone,
   	    	       	                	            	            	              	                    birth_date: birthdate
   	    	       	                	            	            	              	                      }]);

   	    	       	                	            	            	              	                        alert("Registration successful!");
   	    	       	                	            	            	              	                          showLogin();
   	    	       	                	            	            	              	                          };

   	    	       	                	            	            	              	                          /* ======================
   	    	       	                	            	            	              	                             LOGIN
   	    	       	                	            	            	              	                             ====================== */

   	    	       	                	            	            	              	                             window.login = async function () {

   	    	       	                	            	            	              	                             	  const email = document.getElementById("loginEmail").value;
   	    	       	                	            	            	              	                             	    const password = document.getElementById("loginPassword").value;

   	    	       	                	            	            	              	                             	      const { data, error } = await supabase.auth.signInWithPassword({
   	    	       	                	            	            	              	                             	      	    email,
   	    	       	                	            	            	              	                             	      	        password
   	    	       	                	            	            	              	                             	      	          });

   	    	       	                	            	            	              	                             	      	            if (error) {
   	    	       	                	            	            	              	                             	      	            	    alert(error.message);
   	    	       	                	            	            	              	                             	      	            	        return;
   	    	       	                	            	            	              	                             	      	            	          }

   	    	       	                	            	            	              	                             	      	            	            document.getElementById("loginSection").style.display = "none";
   	    	       	                	            	            	              	                             	      	            	              document.getElementById("registerSection").style.display = "none";
   	    	       	                	            	            	              	                             	      	            	                document.getElementById("dashboardSection").style.display = "block";

   	    	       	                	            	            	              	                             	      	            	                  document.getElementById("userEmail").innerText = email;
   	    	       	                	            	            	              	                             	      	            	                  };
loadMyRequests();

async function loadMyRequests(){

    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    const { data, error } = await supabase
        .from("support_request")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });


    if(error){
        console.log(error.message);
        return;
    }


    const box = document.getElementById("userRequests");

    box.innerHTML = "";


    data.forEach(req => {

        box.innerHTML += `
        <div>
            <hr>
            <p><b>Problem:</b> ${req.problem}</p>
            <p><b>Status:</b> ${req.status}</p>
            <p><b>Reply:</b> ${req.reply || "Bado hujajibiwa"}</p>
        </div>
        `;

    });

}
   	    	       	                	            	            	              	                             	      	            	                  /* ======================
   	    	       	                	            	            	              	                             	      	            	                     SUBMIT REQUEST
   	    	       	                	            	            	              	                             	      	            	                     ====================== */

   	    	       	                	            	            	              	                             	      	            	                     window.submitRequest = async function () {

   	    	       	                	            	            	              	                             	      	            	                     	  const email = document.getElementById("userEmail").innerText;
   	    	       	                	            	            	              	                             	      	            	                     	    const phone = document.getElementById("dashPhone").value;
   	    	       	                	            	            	              	                             	      	            	                     	      const age = document.getElementById("age").value;
   	    	       	                	            	            	              	                             	      	            	                     	        const sex = document.getElementById("dashGender").value;
   	    	       	                	            	            	              	                             	      	            	                     	          const category = document.getElementById("category").value;
   	    	       	                	            	            	              	                             	      	            	                     	            const problem = document.getElementById("problem").value;

   	    	       	                	            	            	              	                             	      	            	                     	              const { error } = await supabase.from("support_requests").insert([{
   	    	       	                	            	            	              	                             	      	            	                     	              	    email,
   	    	       	                	            	            	              	                             	      	            	                     	              	        phone,
   	    	       	                	            	            	              	                             	      	            	                     	              	            age,
   	    	       	                	            	            	              	                             	      	            	                     	              	                sex,
   	    	       	                	            	            	              	                             	      	            	                     	              	                    category,
   	    	       	                	            	            	              	                             	      	            	                     	              	                        problem
   	    	       	                	            	            	              	                             	      	            	                     	              	                          }]);

   	    	       	                	            	            	              	                             	      	            	                     	              	                            if (error) {
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	    alert(error.message);
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	        return;
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	          }

   	    	       	                	            	            	              	                             	      	            	                     	              	                            	            alert("Request sent successfully!");
   	    	       	                	            	            	            loadMyRequests();  	                             	      	            	                     	              	                            	            };

   	    	       	                	            	            	              	                             	      	            	                     	              	                            	            /* ======================
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               LOGOUT
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               ====================== */

   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               window.logout = async function () {

   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               	  await supabase.auth.signOut();

   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               	    document.getElementById("dashboardSection").style.display = "none";
   	    	       	                	            	            	              	                             	      	            	                     	              	                            	               	      document.getElementById("loginSection").style.display = "block";

   	    	       	                	            	            	              	                                            alert("Logged out!");
   	    	       	       	              	                             	      	            	                            };
   	    	       	       	              	                             	      	            	                           
