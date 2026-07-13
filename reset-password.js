import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";
const SUPABASE_ANON_KEY = "WEKA_ANON_KEY_YAKO_HAPA";

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
	    	            	                        	                        	                	            }
	    	            	                        	                        	                }
	    	            	                        	                        })
	    	            	                        }
	    	            }
	    })
}
