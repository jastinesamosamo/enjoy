import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1YmVtc3BraXFvem9udmRtdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjQzNjAsImV4cCI6MjA5ODc0MDM2MH0.0ljnq2qh_5AlYTupqLhK4Jsj77ocicMwoDY0NeOewHc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Hakikisha mtumiaji ametoka kwenye email ya reset
const { data, error } = await supabase.auth.getSession();

if (error) {
	    alert(error.message);
	    }

	    document.getElementById("savePassword").addEventListener("click", async () => {

	    	    const password = document.getElementById("newPassword").value;
	    	        const confirm = document.getElementById("confirmPassword").value;

	    	            if (password !== confirm) {
	    	            	        alert("Passwords do not match.");
	    	            	                return;
	    	            	                    }

	    	            	                        if (password.length < 6) {
	    	            	                        	        alert("Password lazima iwe angalau herufi 6.");
	    	            	                        	                return;
	    	            	                        	                    }

	    	            	                        	                        const { error } = await supabase.auth.updateUser({
	    	            	                        	                        	        password: password
	    	            	                        	                        	            });

	    	            	                        	                        	                if (error) {
	    	            	                        	                        	                	        alert(error.message);
	    	            	                        	                        	                	            } else {
	    	            	                        	                        	                	            	        alert("Password imebadilishwa kikamilifu.");

	    	            	                        	                        	                	            	                window.location.href = "index.html";
	    	            	                        	                        	                	            	                    }

	    	            	                        	                        	                	            	                    });
	    	            	                        	                        	                	            
	    	            	                        	                        	                
	    	            	                        	                        
	    	            	                        
	    	            
	