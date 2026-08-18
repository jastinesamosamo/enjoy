import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "https://qubemspkiqozonvdmvws.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmUicW91bmR2bndzIiwicmVmIjoicXVib3FzcGlrb3pubnZtd3dzIiwicm9ybGUiOiJhbm9uIiwiaWF0IjoxNzgyMTY0MzYwLCJleHAiOjIwOTg3NDAzNjB9.0ljnq2qh_5AlYTupqLhK4Jsj77ocicMwoDY0NeOewHc";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


/* =========================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================= */

function createToastContainer() {

    let container = getElement("toastContainer");

    if (container) {
        return container;
    }

    container = document.createElement("div");

    container.id = "toastContainer";

    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "99999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    container.style.width = "min(360px, calc(100vw - 30px))";

    document.body.appendChild(container);

    return container;
}


function showToast(message, type = "info") {

    const container = createToastContainer();

    const toast = document.createElement("div");

    toast.style.padding = "14px 16px";
    toast.style.borderRadius = "14px";
    toast.style.color = "#fff";
    toast.style.fontFamily = "Inter, Arial, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "600";
    toast.style.lineHeight = "1.4";
    toast.style.border = "1px solid rgba(255,255,255,.15)";
    toast.style.backdropFilter = "blur(20px)";
    toast.style.webkitBackdropFilter = "blur(20px)";
    toast.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";
    toast.style.transform = "translateX(120%)";
    toast.style.opacity = "0";
    toast.style.transition = "all .35s ease";

    if (type === "success") {

        toast.style.background =
            "linear-gradient(135deg, rgba(16,185,129,.95), rgba(5,150,105,.95))";

        toast.innerHTML = "✓ &nbsp;" + message;

    } else if (type === "error") {

        toast.style.background =
            "linear-gradient(135deg, rgba(239,68,68,.95), rgba(185,28,28,.95))";

        toast.innerHTML = "✕ &nbsp;" + message;

    } else if (type === "warning") {

        toast.style.background =
            "linear-gradient(135deg, rgba(245,158,11,.95), rgba(217,119,6,.95))";

        toast.innerHTML = "⚠ &nbsp;" + message;

    } else {

        toast.style.background =
            "linear-gradient(135deg, rgba(79,70,229,.95), rgba(6,182,212,.95))";

        toast.innerHTML = "ℹ &nbsp;" + message;
    }

    container.appendChild(toast);

    requestAnimationFrame(() => {

        toast.style.transform = "translateX(0)";
        toast.style.opacity = "1";

    });

    setTimeout(() => {

        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3500);
}


/* =========================================================
   BUTTON LOADING
   ========================================================= */

function setButtonLoading(button, loading, loadingText = "Please wait...") {

    if (!button) return;

    if (loading) {

        if (!button.dataset.originalText) {
            button.dataset.originalText = button.innerText;
        }

        button.disabled = true;

        button.style.opacity = "0.7";
        button.style.cursor = "wait";

        button.innerHTML = `
            <span style="
                display:inline-flex;
                align-items:center;
                justify-content:center;
                gap:8px;
            ">
                <span style="
                    width:15px;
                    height:15px;
                    border:2px solid rgba(255,255,255,.35);
                    border-top-color:#fff;
                    border-radius:50%;
                    display:inline-block;
                    animation:enjoySpin .7s linear infinite;
                "></span>

                ${loadingText}
            </span>
        `;

    } else {

        button.disabled = false;

        button.style.opacity = "1";
        button.style.cursor = "pointer";

        if (button.dataset.originalText) {
            button.innerText = button.dataset.originalText;
        }
    }
}


/* =========================================================
   LOADING ANIMATION CSS
   ========================================================= */

function addDynamicStyles() {

    if (getElement("enjoyDynamicStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "enjoyDynamicStyles";

    style.textContent = `
        @keyframes enjoySpin {
            to {
                transform: rotate(360deg);
            }
        }

        .auth-loading {
            pointer-events: none;
        }
    `;

    document.head.appendChild(style);
}

addDynamicStyles();


/* =========================================================
   LOGIN ↔ REGISTER SWITCH
   ========================================================= */

function switchAuth(fromId, toId) {

    const from = getElement(fromId);
    const to = getElement(toId);

    if (!from || !to) return;

    from.classList.remove("switching-in");

    from.classList.add("switching-out");

    setTimeout(() => {

        from.style.display = "none";

        from.classList.remove("switching-out");

        to.style.display = "block";

        void to.offsetWidth;

        to.classList.add("switching-in");

        setTimeout(() => {

            to.classList.remove("switching-in");

        }, 600);

    }, 350);
}


/* =========================================================
   SHOW REGISTER
   ========================================================= */

window.showRegister = function () {

    const loginSection = getElement("loginSection");
    const registerSection = getElement("registerSection");

    if (!loginSection || !registerSection) return;

    if (registerSection.style.display === "block") {
        return;
    }

    switchAuth(
        "loginSection",
        "registerSection"
    );
};


/* =========================================================
   SHOW LOGIN
   ========================================================= */

window.showLogin = function () {

    const loginSection = getElement("loginSection");
    const registerSection = getElement("registerSection");

    if (!loginSection || !registerSection) return;

    if (loginSection.style.display === "block") {
        return;
    }

    switchAuth(
        "registerSection",
        "loginSection"
    );
};


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function addPasswordToggle(inputId) {

    const input = getElement(inputId);

    if (!input) return;

    if (input.parentElement.querySelector(".password-toggle")) {
        return;
    }

    const parent = input.parentElement;

    parent.style.position = "relative";

    const button = document.createElement("button");

    button.type = "button";
    button.className = "password-toggle";

    button.innerHTML = "👁";

    button.style.position = "absolute";
    button.style.right = "8px";
    button.style.top = "31px";
    button.style.width = "40px";
    button.style.height = "35px";
    button.style.padding = "0";
    button.style.margin = "0";
    button.style.background = "transparent";
    button.style.boxShadow = "none";
    button.style.fontSize = "16px";
    button.style.zIndex = "5";

    button.addEventListener("click", () => {

        if (input.type === "password") {

            input.type = "text";
            button.innerHTML = "🙈";

        } else {

            input.type = "password";
            button.innerHTML = "👁";
        }
    });

    parent.appendChild(button);
}


/* =========================================================
   REGISTER
   ========================================================= */

window.register = async function () {

    const registerBtn = getElement("registerBtn");

    const fullName = getElement("fullName")?.value.trim();
    const gender = getElement("gender")?.value;
    const email = getElement("email")?.value.trim();
    const phone = getElement("phone")?.value.trim();
    const birthdate = getElement("birthdate")?.value;
    const password = getElement("password")?.value;
    const confirmPassword = getElement("confirmPassword")?.value;


    /* -------------------------
       VALIDATION
       ------------------------- */

    if (!fullName) {

        showToast(
            "Please enter your full name.",
            "warning"
        );

        return;
    }


    if (!gender) {

        showToast(
            "Please select your gender.",
            "warning"
        );

        return;
    }


    if (!email) {

        showToast(
            "Please enter your email.",
            "warning"
        );

        return;
    }


    if (!phone) {

        showToast(
            "Please enter your phone number.",
            "warning"
        );

        return;
    }


    if (!birthdate) {

        showToast(
            "Please select your birth date.",
            "warning"
        );

        return;
    }


    if (!password) {

        showToast(
            "Please create a password.",
            "warning"
        );

        return;
    }


    if (password.length < 6) {

        showToast(
            "Password must contain at least 6 characters.",
            "warning"
        );

        return;
    }


    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    /* -------------------------
       START LOADING
       ------------------------- */

    setButtonLoading(
        registerBtn,
        true,
        "Creating account..."
    );


    try {

        /* -------------------------
           SUPABASE AUTH REGISTER
           ------------------------- */

        const { data, error } =
            await supabase.auth.signUp({

                email: email,
                password: password

            });


        if (error) {

            throw error;
        }


        const userId = data.user?.id;


        if (!userId) {

            throw new Error(
                "Account was created but user information was not returned."
            );
        }


        /* -------------------------
           SAVE PROFILE
           ------------------------- */

        const { error: profileError } =
            await supabase
                .from("profiles")
                .insert([{

                    user_id: userId,

                    full_name: fullName,

                    gender: gender,

                    email: email,

                    phone: phone,

                    birth_date: birthdate

                }]);


        if (profileError) {

            console.error(
                "Profile error:",
                profileError.message
            );

            showToast(
                "Account created, but profile information could not be saved.",
                "warning"
            );

        } else {

            showToast(
                "Registration successful! Welcome to Enjoy 🎉",
                "success"
            );
        }


        /* -------------------------
           CLEAR REGISTER FORM
           ------------------------- */

        if (getElement("fullName"))
            getElement("fullName").value = "";

        if (getElement("gender"))
            getElement("gender").value = "";

        if (getElement("email"))
            getElement("email").value = "";

        if (getElement("phone"))
            getElement("phone").value = "";

        if (getElement("birthdate"))
            getElement("birthdate").value = "";

        if (getElement("password"))
            getElement("password").value = "";

        if (getElement("confirmPassword"))
            getElement("confirmPassword").value = "";


        /* -------------------------
           RETURN TO LOGIN
           ------------------------- */

        setTimeout(() => {

            showLogin();

        }, 900);


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showToast(
            error.message || "Registration failed.",
            "error"
        );

    } finally {

        setButtonLoading(
            registerBtn,
            false
        );
    }
};


/* =========================================================
   LOGIN
   ========================================================= */

window.login = async function () {

    const loginBtn = getElement("loginBtn");

    const email =
        getElement("loginEmail")?.value.trim();

    const password =
        getElement("loginPassword")?.value;


    /* -------------------------
       VALIDATION
       ------------------------- */

    if (!email) {

        showToast(
            "Please enter your email.",
            "warning"
        );

        return;
    }


    if (!password) {

        showToast(
            "Please enter your password.",
            "warning"
        );

        return;
    }


    setButtonLoading(
        loginBtn,
        true,
        "Signing in..."
    );


    try {

        /* -------------------------
           SUPABASE LOGIN
           ------------------------- */

        const { data, error } =
            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            throw error;
        }


        /* -------------------------
           HIDE AUTH
           ------------------------- */

        const loginSection =
            getElement("loginSection");

        const registerSection =
            getElement("registerSection");

        const dashboardSection =
            getElement("dashboardSection");


        loginSection.style.display = "none";

        registerSection.style.display = "none";

        dashboardSection.style.display = "block";


        dashboardSection.classList.remove(
            "switching-in"
        );

        void dashboardSection.offsetWidth;

        dashboardSection.classList.add(
            "switching-in"
        );


        /* -------------------------
           DISPLAY EMAIL
           ------------------------- */

        const userEmail =
            getElement("userEmail");

        if (userEmail) {

            userEmail.innerText = email;
        }


        /* -------------------------
           GET PROFILE
           ------------------------- */

        const {
            data: profile,
            error: profileError
        } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .single();


        if (profileError) {

            console.error(
                "Profile loading error:",
                profileError.message
            );

        } else if (profile) {

            /* Full name */

            const userName =
                getElement("userName");

            if (userName) {

                userName.innerText =
                    profile.full_name || "User";
            }


            /* Phone */

            const dashPhone =
                getElement("dashPhone");

            if (dashPhone && profile.phone) {

                dashPhone.value =
                    profile.phone;
            }


            /* Gender */

            const dashGender =
                getElement("dashGender");

            if (dashGender && profile.gender) {

                dashGender.value =
                    profile.gender;
            }


            /* Age */

            const ageInput =
                getElement("age");

            if (
                ageInput &&
                profile.birth_date
            ) {

                const birthDate =
                    new Date(profile.birth_date);

                const today =
                    new Date();

                let age =
                    today.getFullYear() -
                    birthDate.getFullYear();

                const monthDifference =
                    today.getMonth() -
                    birthDate.getMonth();

                if (
                    monthDifference < 0 ||
                    (
                        monthDifference === 0 &&
                        today.getDate() <
                        birthDate.getDate()
                    )
                ) {

                    age--;
                }

                ageInput.value = age;
            }
        }


        showToast(
            "Welcome back to Enjoy 👋",
            "success"
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showToast(
            error.message || "Login failed.",
            "error"
        );

    } finally {

        setButtonLoading(
            loginBtn,
            false
        );
    }
};


/* =========================================================
   SUBMIT SUPPORT REQUEST
   ========================================================= */

window.submitRequest = async function () {

    const submitBtn =
        getElement("submitBtn");


    const email =
        getElement("userEmail")?.innerText.trim();

    const fullName =
        getElement("userName")?.innerText.trim();

    const phone =
        getElement("dashPhone")?.value.trim();

    const age =
        getElement("age")?.value;

    const sex =
        getElement("dashGender")?.value;

    const category =
        getElement("category")?.value;

    const problem =
        getElement("problem")?.value.trim();


    /* -------------------------
       VALIDATION
       ------------------------- */

    if (!phone) {

        showToast(
            "Please enter your phone number.",
            "warning"
        );

        return;
    }


    if (!age) {

        showToast(
            "Please enter your age.",
            "warning"
        );

        return;
    }


    if (!sex) {

        showToast(
            "Gender information is missing.",
            "warning"
        );

        return;
    }


    if (!category) {

        showToast(
            "Please select a problem category.",
            "warning"
        );

        return;
    }


    if (!problem) {

        showToast(
            "Please describe your problem.",
            "warning"
        );

        return;
    }


    if (problem.length < 5) {

        showToast(
            "Please provide more details about your problem.",
            "warning"
        );

        return;
    }


    setButtonLoading(
        submitBtn,
        true,
        "Sending request..."
    );


    try {

        /* -------------------------
           INSERT REQUEST
           ------------------------- */

        const { error } =
            await supabase
                .from("support_requests")
                .insert([{

                    full_name: fullName,

                    email: email,

                    phone: phone,

                    age: age,

                    sex: sex,

                    category: category,

                    problem: problem,

                    status: "pending"

                }]);


        if (error) {

            throw error;
        }


        showToast(
            "Request sent successfully! 🚀",
            "success"
        );


        /* -------------------------
           REDIRECT
           ------------------------- */

        setTimeout(() => {

            window.location.href =
                "myrequests.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Submit request error:",
            error
        );

        showToast(
            error.message ||
            "Failed to send request.",
            "error"
        );

    } finally {

        setButtonLoading(
            submitBtn,
            false
        );
    }
};


/* =========================================================
   LOGOUT
   ========================================================= */

window.logout = async function () {

    try {

        const { error } =
            await supabase.auth.signOut();


        if (error) {

            throw error;
        }


        const dashboardSection =
            getElement("dashboardSection");

        const loginSection =
            getElement("loginSection");


        dashboardSection.style.display =
            "none";


        loginSection.style.display =
            "block";


        loginSection.classList.remove(
            "switching-in"
        );


        void loginSection.offsetWidth;


        loginSection.classList.add(
            "switching-in"
        );


        /* Clear login fields */

        if (getElement("loginEmail"))
            getElement("loginEmail").value = "";

        if (getElement("loginPassword"))
            getElement("loginPassword").value = "";


        showToast(
            "You have been logged out successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        showToast(
            error.message || "Logout failed.",
            "error"
        );
    }
};


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

async function handleForgotPassword(event) {

    event.preventDefault();


    const email =
        prompt("Ingiza email yako:");


    if (!email) {

        return;
    }


    const cleanEmail =
        email.trim();


    if (!cleanEmail) {

        return;
    }


    try {

        showToast(
            "Sending password reset link...",
            "info"
        );


        const { error } =
            await supabase.auth.resetPasswordForEmail(
                cleanEmail,
                {
                    redirectTo:
                        "https://jastinesamosamo.github.io/enjoy/reset-password.html"
                }
            );


        if (error) {

            throw error;
        }


        showToast(
            "Password reset link has been sent to your email.",
            "success"
        );


    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        showToast(
            error.message ||
            "Could not send password reset link.",
            "error"
        );
    }
}


/* =========================================================
   INITIALIZE PASSWORD TOGGLES
   ========================================================= */

function initializePasswordToggles() {

    addPasswordToggle(
        "loginPassword"
    );

    addPasswordToggle(
        "password"
    );

    addPasswordToggle(
        "confirmPassword"
    );
}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function initializePasswordStrength() {

    const password =
        getElement("password");

    if (!password) return;


    const strength =
        document.createElement("div");

    strength.id =
        "passwordStrength";

    strength.style.fontSize =
        "11px";

    strength.style.marginTop =
        "6px";

    strength.style.color =
        "#94a3b8";

    password.parentElement.appendChild(
        strength
    );


    password.addEventListener(
        "input",
        () => {

            const value =
                password.value;


            if (!value) {

                strength.innerText = "";

                return;
            }


            if (value.length < 6) {

                strength.innerText =
                    "Password strength: Weak";

                strength.style.color =
                    "#ef4444";

            } else if (
                value.length >= 6 &&
                value.length < 10
            ) {

                strength.innerText =
                    "Password strength: Medium";

                strength.style.color =
                    "#f59e0b";

            } else {

                strength.innerText =
                    "Password strength: Strong";

                strength.style.color =
                    "#10b981";
            }
        }
    );
}


/* =========================================================
   AUTH STATE
   ========================================================= */

async function checkCurrentSession() {

    try {

        const {
            data: {
                session
            }
        } = await supabase.auth.getSession();


        if (!session) {

            return;
        }


        const user =
            session.user;


        if (!user) {

            return;
        }


        const loginSection =
            getElement("loginSection");

        const registerSection =
            getElement("registerSection");

        const dashboardSection =
            getElement("dashboardSection");


        if (loginSection)
            loginSection.style.display =
                "none";

        if (registerSection)
            registerSection.style.display =
                "none";

        if (dashboardSection)
            dashboardSection.style.display =
                "block";


        if (getElement("userEmail")) {

            getElement("userEmail").innerText =
                user.email || "";
        }


        /* Load profile */

        const {
            data: profile
        } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();


        if (profile) {

            if (getElement("userName")) {

                getElement("userName").innerText =
                    profile.full_name || "User";
            }


            if (
                getElement("dashPhone") &&
                profile.phone
            ) {

                getElement("dashPhone").value =
                    profile.phone;
            }


            if (
                getElement("dashGender") &&
                profile.gender
            ) {

                getElement("dashGender").value =
                    profile.gender;
            }


            if (
                getElement("age") &&
                profile.birth_date
            ) {

                const birth =
                    new Date(profile.birth_date);

                const today =
                    new Date();

                let age =
                    today.getFullYear() -
                    birth.getFullYear();

                const month =
                    today.getMonth() -
                    birth.getMonth();

                if (
                    month < 0 ||
                    (
                        month === 0 &&
                        today.getDate() <
                        birth.getDate()
                    )
                ) {

                    age--;
                }

                getElement("age").value =
                    age;
            }
        }


    } catch (error) {

        console.error(
            "Session check error:",
            error
        );
    }
}


/* =========================================================
   FORGOT PASSWORD EVENT
   ========================================================= */

function initializeForgotPassword() {

    const forgot =
        getElement("forgotPassword");


    if (!forgot) return;


    forgot.addEventListener(
        "click",
        handleForgotPassword
    );
}


/* =========================================================
   INITIALIZE APP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializePasswordToggles();

        initializePasswordStrength();

        initializeForgotPassword();

        checkCurrentSession();

    }
);


/* =========================================================
   AUTH STATE LISTENER
   ========================================================= */

supabase.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "Auth event:",
            event
        );

    }
);