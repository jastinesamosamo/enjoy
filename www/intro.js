/* =====================================================
   ENJOY INTRO CONTROLLER
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.querySelector(".intro");

    if (!intro) return;


    /*
       Intro timeline:

       0s    → Logo starts
       1.8s  → Tagline
       3.5s  → Welcome
       4.2s  → Loading dots
       6s    → Exit animation
       7.2s  → index.html
    */


    setTimeout(() => {

        intro.classList.add("exit");


        setTimeout(() => {

            window.location.replace("index.html");

        }, 1200);


    }, 6000);

});