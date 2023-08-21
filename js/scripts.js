/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    /**** PORTFOLIO ITEMS MODAL ****************/
    const portfolio = [
        {
            title: "Bookie",
            desc: "Intégration d'une maquette de rendu professionnel en html/css",
            img: "./assets/img/booki.png",
            category: "html/css",
            link: "https://github.com/DalYou/Booki",
            difficulties: [
                "Faire correspondre le design à la maquette fournie.",
                "Le responsive qui permet que le site soit consulté sur tablette et mobile." 
            ],
            solutions: [
                "En travaillant 4 à 6h par jour sur l'apprentissage de ces 2 langages d'affichage, j'ai finalement réussi l'intégration du projet",
                "Revoir les cours d'Openclassrooms sur le sujet."
            ]
        },
        {
            title: "Kasa",
            desc: "Le but était de créer une application web de location immobilière avec React",
            img: "./assets/img/Kasa.png",
            category: "react, js, html/css",
            link: "https://github.com/DalYou/Projet6_Kasa",
            difficulties: [
               "Compréhension des hooks : UseState et UseEffect.",
               "Se familiariser avec l'utilisations des composants React."
            ],
            solutions: [
                "Beaucoup de recherches en autonomie m'ont permis de saisir les particularités des hooks.",
                "Beaucoup de recherches en autonomie m'ont permis de saisir les particularités de React et de mener ce projet à son terme."
            ]
        },
        {
            title: "Mon vieux grimoire",
            desc: "Développer le back-end d'un site de notation de livres : le vieux grimoire",
            img: "./assets/img/MonVieuxGrimoire.png",
            category: "nodejs, express, mongoose, js",
            link: "https://github.com/DalYou/Projet-7_Books",
            difficulties: [
                "Comprendre comment relier le front End au Back End.",
                "Adapter la structure du projet."
            ],
            solutions: [
                "Des recherches, des vidéos m'ont permis de terminer le projet.",
                "Consulter des exemples de structures sur des projets existants."
            ]
        }
    ];

    // portfolio modal instance
    portfolioModal("#portfolio", portfolio);


    /**** CONTACT FORM ****************/

    // contact form submit and email sending
    // with api emailjs
    emailjs.init("ZBPaerfi0WSuERPI0");

    const formErrorMessages = document.querySelectorAll(".invalid-feedback");

    document.querySelector("#contactForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput     = document.querySelector("#name-form-input").value;
            const emailInput    = document.querySelector("#email").value;
            let phoneInput      = document.querySelector("#phone").value;
            const messageInput  = document.querySelector("#message").value;
            
            for(let i = 0, l = formErrorMessages.length; i < l; i++) {
                formErrorMessages[i].style.display = "none";
            }

            if(nameInput.trim().length < 2) {
                document.querySelector("#name-missing").style.display = "block";
                return;
            }

            if(!nameInput.match(/^[a-zA-Z' -]+$/)) {
                document.querySelector("#name-invalid").style.display = "block";
                return;
            }

            if(emailInput.trim().length < 2) {
                document.querySelector("#email-missing").style.display = "block";
                return;
            }

            if(!emailInput.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
                document.querySelector("#email-invalid").style.display = "block";
                return;
            }
            
            if(phoneInput.trim().length > 0 && !phoneInput.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                document.querySelector("#phone-invalid").style.display = "block";
                return;
            }

            if(messageInput.trim().length < 5) {
                document.querySelector("#message-missing").style.display = "block";
                return;
            }

            if(!phoneInput) {
                phoneInput = "non communiqué";
            }

            const templateParams = {
               nameInput, emailInput, phoneInput, messageInput
            };

            emailjs.send('service_lbhd7f1', 'template_0g6gwyu', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.querySelector("#submitSuccessMessage").className = "";
                    document.querySelector("#send-email-input").style.display = "none";
                }, function (error) {
                    document.querySelector("#submitErrorMessage").className = "";
                    console.log('FAILED...', error);
                });
        });

});
