(()=>{"use strict";const e=function(){let e=[];return{getData:function(){return e},add:function(t){e.push(t),localStorage.setItem("data",JSON.stringify(e)),console.log(e),console.log("In localStorage:",localStorage.getItem("data"))},remove:function(t){const n=e.findIndex((e=>e.id===t.id));console.log("index found: ",n),console.log("updated data: ",e),e.splice(n,1),localStorage.setItem("data",JSON.stringify(e))},loadDefault:function(){e=JSON.parse(localStorage.getItem("data")),document.querySelector("#inbox").click()}}}(),t=document.querySelector(".projects-list"),n=function(t){r(),e.getData().filter((e=>e.category===t)).forEach((e=>l(e)))};let o=0;const c=document.querySelector(".task-list"),l=function(e){const t=document.createElement("li");t.id=e.category;const n=new Image;n.classList.add("task-icon"),n.src="./images/notDone.png",n.id="notDone",n.addEventListener("click",d.bind(null,e,n,t));const o=new Image;o.classList.add("expand-icon"),o.src="./images/expand-icon.png",o.id="expand-icon",o.addEventListener("click",(function(){}));const l=document.createElement("p");l.textContent=e.title,l.id="task-title",t.appendChild(n),t.appendChild(l),t.appendChild(o),c.appendChild(t)},d=function(t,n,o){n.src="./images/done.png",e.remove(t),i(t,o)},i=function(n,o){o.classList.add("fade-out"),o.addEventListener("transitionend",(function(){c.removeChild(o),function(n){const o=e.getData().find((e=>e.category===n));if(console.log(o),void 0===o){const e=t.querySelector(`#${n}`);t.removeChild(e)}}(n.category)}))},a=function(e){l(e),function(e){if(null===t.querySelector(`#${e}`)){const o=document.createElement("li");o.classList.add("li-container"),o.id=e,o.textContent=e,o.addEventListener("click",n.bind(null,e)),t.appendChild(o)}}(e.category)},r=function(){const e=document.querySelector(".task-list");for(;e.lastElementChild;)e.removeChild(e.lastElementChild)},s=document.querySelector(".task-form"),u=document.querySelector(".content"),m=document.querySelector(".side-nav"),f=document.querySelector(".top-nav"),g=function(){s.style.display="None",u.classList.remove("blur"),m.classList.remove("blur"),f.classList.remove("blur")},y=function(){e.getData().forEach((e=>a(e)))};document.querySelector("#inbox").addEventListener("click",y),document.body.onload=e.loadDefault(),document.querySelector("#add-task").addEventListener("click",(function(){s.style.display="block",u.classList.add("blur"),m.classList.add("blur"),f.classList.add("blur")})),document.querySelector("#close-form").addEventListener("click",g),document.querySelector("#submit").addEventListener("click",(function(){const t=(n=document.querySelector("#title").value,c=document.querySelector("#category").value,l=document.querySelector("#description").value,d=document.querySelector("#due").value,o++,{title:n,category:c,description:l,due:d,done:!1,id:o});var n,c,l,d;console.log(t),a(t),e.add(t),g()})),s.addEventListener("submit",(function(e){e.preventDefault()}))})();