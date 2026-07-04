// =====================
// SECTIONS
// =====================
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const dashboardSection = document.getElementById("dashboardSection");

// =====================
// LINKS
// =====================
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// =====================
// BUTTONS
// =====================
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const submitBtn = document.getElementById("submitBtn");

// =====================
// SHOW REGISTER
// =====================
showRegister.addEventListener("click", function (e) {
	    e.preventDefault();
	        loginSection.style.display = "none";
	            registerSection.style.display = "block";
	            });

	            // =====================
	            // SHOW LOGIN
	            // =====================
	            showLogin.addEventListener("click", function (e) {
	            	    e.preventDefault();
	            	        registerSection.style.display = "none";
	            	            loginSection.style.display = "block";
	            	            });

	            	            // =====================
	            	            // REGISTER USER
	            	            // =====================
	            	            registerBtn.addEventListener("click", function () {

	            	            	    const fullName = document.getElementById("fullName").value.trim();
	            	            	        const gender = document.getElementById("gender").value;
	            	            	            const email = document.getElementById("email").value.trim();
	            	            	                const phone = document.getElementById("phone").value.trim();
	            	            	                    const birthdate = document.getElementById("birthdate").value;
	            	            	                        const password = document.getElementById("password").value;
	            	            	                            const confirmPassword = document.getElementById("confirmPassword").value;

	            	            	                                if (
	            	            	                                	        fullName === "" ||
	            	            	                                	                gender === "" ||
	            	            	                                	                        email === "" ||
	            	            	                                	                                phone === "" ||
	            	            	                                	                                        birthdate === "" ||
	            	            	                                	                                                password === "" ||
	            	            	                                	                                                        confirmPassword === ""
	            	            	                                	                                                            ) {
	            	            	                                	                                                            	        alert("Please fill all fields.");
	            	            	                                	                                                            	                return;
	            	            	                                	                                                            	                    }

	            	            	                                	                                                            	                        if (password !== confirmPassword) {
	            	            	                                	                                                            	                        	        alert("Passwords do not match.");
	            	            	                                	                                                            	                        	                return;
	            	            	                                	                                                            	                        	                    }

	            	            	                                	                                                            	                        	                        localStorage.setItem("fullName", fullName);
	            	            	                                	                                                            	                        	                            localStorage.setItem("gender", gender);
	            	            	                                	                                                            	                        	                                localStorage.setItem("email", email);
	            	            	                                	                                                            	                        	                                    localStorage.setItem("phone", phone);
	            	            	                                	                                                            	                        	                                        localStorage.setItem("birthdate", birthdate);
	            	            	                                	                                                            	                        	                                            localStorage.setItem("password", password);                                             	                        	                                                alert("Registration successful. Please login.");

	            	                                                       	                        	                                                    registerSection.style.display = "none";
	            	                                  	                                                            	                        	                                                        loginSection.style.display = "block";
	            	                                  	                                                            	                        	                                                        
	            	       });
	            	       
// =====================
// LOGIN USER
// =====================
loginBtn.addEventListener("click", function () {

	    const email = document.getElementById("loginEmail").value.trim();
	        const password = document.getElementById("loginPassword").value;

	            const savedEmail = localStorage.getItem("email");
	                const savedPassword = localStorage.getItem("password");

	                    if (email === savedEmail && password === savedPassword) {

	                    	        loginSection.style.display = "none";
	                    	                dashboardSection.style.display = "block";

	                    	                        document.getElementById("userEmail").textContent = savedEmail;
	                    	                                document.getElementById("dashGender").value =
	                    	                                            localStorage.getItem("gender");

	                    	                                                } else {
	                    	                                                	        alert("Invalid email or password.");
	                    	                                                	            }

	                    	                                                	            });

	                    	                                                	            // =====================
	                    	                                                	            // SUBMIT REQUEST
	                    	                                                	            // =====================
	                    	                                                	            submitBtn.addEventListener("click", function () {

	                    	                                                	            	    const phone = document.getElementById("dashPhone").value.trim();
	                    	                                                	            	        const age = document.getElementById("age").value.trim();
	                    	                                                	            	            const gender = document.getElementById("dashGender").value;
	                    	                                                	            	                const category = document.getElementById("category").value;
	                    	                                                	            	                    const problem = document.getElementById("problem").value.trim();

	                    	                                                	            	                        if (
	                    	                                                	            	                        	        phone === "" ||
	                    	                                                	            	                        	                age === "" ||
	                    	                                                	            	                        	                        category === "" ||
	                    	                                                	            	                        	                                problem === ""
	                    	                                                	            	                        	                                    ) {
	                    	                                                	            	                        	                                    	        alert("Please fill all fields.");
	                    	                                                	            	                        	                                    	                return;
	                    	                                                	            	                        	                                    	                    }

	                    	                                                	            	                        	                                    	                        console.log({
	                    	                                                	            	                        	                                    	                        	        email: localStorage.getItem("email"),
	                    	                                                	            	                        	                                    	                        	                phone: phone,
	                    	                                                	            	                        	                                    	                        	                        age: age,
	                    	                                                	            	                        	                                    	                        	                                gender: gender,
	                    	                                                	            	                        	                                    	                        	                                        category: category,
	                    	                                                	            	                        	                                    	                        	                                                problem: problem
	                    	                                                	            	                        	                                    	                        	                                                    });

	                    	                                                	            	                        	                                    	                        	                                                        alert("Request submitted successfully.");

	                    	                                                	            	                        	                                    	                        	                                                        });

	                    	                                                	            	                        	                                    	                        	                                                        // =====================
	                    	                                                	            	                        	                                    	                        	                                                        // LOGOUT
	                    	                                                	            	                        	                                    	                        	                                                        // =====================
	                    	                                                	            	                        	                                    	                        	                                                        logoutBtn.addEventListener("click", function () {

	                    	                                                	            	                        	                                    	                        	                                                        	    dashboardSection.style.display = "none";
	                    	                 	                        	                                    loginSection.style.display = "block";

	                    	                                  	                        	                                                        	            document.getElementById("loginEmail").value = "";
	                  	                        	                               document.getElementById("loginPassword").value = "";

	                                   	                        	                                             });
