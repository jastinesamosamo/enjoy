const intro = document.querySelector(".intro");


window.onload = ()=>{


setTimeout(()=>{


intro.classList.add("exit");


setTimeout(()=>{


window.location.href="index.html";


},1500);



},6000);


};
