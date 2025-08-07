// Pop-up
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const overlay = document.getElementById('overlay');

    // Verifica se o pop-up já foi fechado
    if (!sessionStorage.getItem('popupClosed')) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Fechar pop-up e esconder overlay
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true');
        });
    }

    // Fechar ao clicar no overlay
    if (overlay) {
        overlay.addEventListener('click', function () {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true');
        });
    }
});

// Rolagem suave para as seções
document.querySelectorAll('header nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Esconder/Mostrar a section acima do cabeçalho ao rolar
const topSection = document.getElementById('top-section');
let isScrolling;

if (topSection) {
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);
        isScrolling = function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop === 0) {
                topSection.style.top = '0';
            } else {
                topSection.style.top = '-100px';
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.getElementById('closeModal');

    if (modal && modalImg && modalVideo && closeModal) {
        const items = document.querySelectorAll('.gallery .square img');

        items.forEach(item => {
            item.addEventListener('click', function () {
                const type = item.dataset.type || 'image';
                const src = item.dataset.src || item.src;

                if (type === 'video') {
                    modalImg.style.display = 'none';
                    modalImg.src = '';

                    modalVideo.src = src;
                    modalVideo.style.display = 'block';
                    modalVideo.play();
                } else {
                    modalVideo.pause();
                    modalVideo.style.display = 'none';
                    modalVideo.src = '';

                    modalImg.src = src;
                    modalImg.alt = this.alt;
                    modalImg.style.display = 'block';
                }

                modal.style.display = 'block';
            });
        });

        closeModal.addEventListener('click', function () {
            closeModalContent();
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModalContent();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModalContent();
            }
        });

        function closeModalContent() {
            modal.style.display = 'none';
            modalImg.style.display = 'none';
            modalImg.src = '';
            modalVideo.pause();
            modalVideo.style.display = 'none';
            modalVideo.src = '';
        }
    }
});

// Animações ao rolar a página
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');

    const checkVisibility = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            // Verifica se a section está visível na tela
            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                section.classList.add('visible');
            }
        });
    };

    // Verifica a visibilidade ao carregar a página e ao rolar
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});