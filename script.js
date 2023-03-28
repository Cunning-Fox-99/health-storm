window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.tab-header-tab'),
        header = document.querySelector('.tab-header'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    header.addEventListener('click', function(event) {
        let target = event.target;
        console.log(target)
        if (target && target.classList.contains('tab-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    let button = document.getElementById('menu-button')
    let menu = document.getElementById('menu')

    button.addEventListener('click', () => {
        menu.classList.toggle('active')
        button.classList.toggle('active')
    })

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    const buttonsForModal = document.querySelectorAll('[data-open-modal]')
    const modalWindow = document.getElementById('modal-window')
    const closeModal = document.getElementById('close-modal')
    const formItem = document.getElementById('form-block')
    const loader = document.getElementById('loader')
    const emailSend = document.getElementById('email-send')
    const emailError = document.getElementById('email-error')

    buttonsForModal.forEach((item) => {
        item.addEventListener(('click'), () => {
            modalWindow.classList.add('active')
            formItem.classList.add('active')
        })
    })

// 13d547de-50d2-4724-b058-d1f8c84d1295

    modalWindow.addEventListener('click', (e) => {

        if (e.target.closest('.modal-window__wrapper') === null) {
            modalWindow.classList.remove('active')
            formItem.classList.remove('active')
            loader.classList.remove('active')
            emailSend.classList.remove('active')
            emailError.classList.remove('active')
        }
    })

    closeModal.addEventListener('click', () => {
        modalWindow.classList.remove('active')
        formItem.classList.remove('active')
        loader.classList.remove('active')
        emailSend.classList.remove('active')
        emailError.classList.remove('active')
    })

    formItem.addEventListener('submit', (e) => {
        e.preventDefault()
        let currentMessage = `${formItem.message.value} \n
    Send by: ${formItem.email.value}`
        formItem.classList.remove('active')
        loader.classList.add('active')

        // f014f017-653d-4d1a-a5a9-5df889157083
        Email.send({
            SecureToken : "9511daf2-3100-4f5a-bb08-a5d3d4f2ee4e",
            To : 'healthcleanua@gmail.com',
            From : 'healthcleanua@gmail.com',
            Subject :  formItem.subject.value,
            Body :  currentMessage

        }).then(
            message => {
                console.log(message)
                formItem.email.value = ''
                formItem.message.value = ''
                loader.classList.remove('active')
                if (message === 'OK') {
                    emailSend.classList.add('active')
                } else emailError.classList.add('active')

            }
        );
    })

});