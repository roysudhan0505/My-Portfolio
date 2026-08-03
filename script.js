/*==================================================
                PORTFOLIO SCRIPT
==================================================*/

/*==================================================
                SELECTORS
==================================================*/

const loader = document.getElementById("loader");

const header = document.getElementById("header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("section");


/*==================================================
                LOADER
==================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    },1000);

});


/*==================================================
            MOBILE MENU
==================================================*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/*==================================================
            STICKY HEADER
==================================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        header.style.background="rgba(5,8,22,.95)";

        header.style.boxShadow="0 10px 35px rgba(0,0,0,.35)";

    }

    else{

        header.style.background="rgba(5,8,22,.75)";

        header.style.boxShadow="none";

    }

});


/*==================================================
            ACTIVE NAVIGATION
==================================================*/

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


/*==================================================
            SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(

            this.getAttribute("href")

        ).scrollIntoView({

            behavior:"smooth"

        });

    });

});


/*==================================================
            BACK TO TOP
==================================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop.style.display="flex";

    }

    else{

        backToTop.style.display="none";

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
            SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

".timeline-item,.skill-card,.project-card,.certificate-card,.achievement-card,.resume-card,.contact-info,.contact-form"

);

function revealAnimation(){

    const trigger = window.innerHeight * .85;

    revealElements.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if(top < trigger){

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        }

    });

}

revealElements.forEach(item => {

    item.style.opacity="0";

    item.style.transform="translateY(60px)";

    item.style.transition=".8s";

});

window.addEventListener("scroll", revealAnimation);

revealAnimation();
/*==================================================
            CONTACT FORM
==================================================*/

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const API_URL = "/api/contact";


/*==================================================
            POPUP
==================================================*/

function showPopup(type, message){

    const popup = document.createElement("div");

    popup.className = `popup ${type}`;

    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    },100);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {

            popup.remove();

        },400);

    },3000);

}


/*==================================================
            EMAIL VALIDATION
==================================================*/

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/*==================================================
            CONTACT FORM SUBMIT
==================================================*/

contactForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();


    /*============================
            VALIDATION
    ============================*/

    if(name.length < 3){

        showPopup("error","Please enter your name.");

        return;

    }

    if(!validateEmail(email)){

        showPopup("error","Please enter a valid email.");

        return;

    }

    if(subject.length < 3){

        showPopup("error","Please enter a subject.");

        return;

    }

    if(message.length < 10){

        showPopup("error","Message must contain at least 10 characters.");

        return;

    }


    /*============================
            BUTTON LOADING
    ============================*/

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Sending...
    `;


    const data = {

        name,
        email,
        subject,
        message

    };


    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        });


        if(!response.ok){

            throw new Error("Server Error");

        }

        const result = await response.json();


        if(result.success){

            showPopup(

                "success",

                "🎉 Message sent successfully!"

            );

            formStatus.textContent = "Thank you for contacting me.";

            formStatus.style.color = "#22C55E";

            contactForm.reset();

        }

        else{

            throw new Error(result.message);

        }

    }

    catch(error){

        console.error(error);

        formStatus.textContent = "Unable to send message.";

        formStatus.style.color = "#EF4444";

        showPopup(

            "error",

            "❌ Failed to send message."

        );

    }

    finally{

        submitBtn.disabled = false;

        submitBtn.innerHTML = "Send Message";

    }

});
