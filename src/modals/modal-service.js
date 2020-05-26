export class ModalService {
    constructor() {
        this.modals = document.getElementsByClassName('modals');
        this.modalBG = document.getElementById('modal-background');
        // this.about = document.getElementById('about');
        this.settings = document.getElementById('settings');
        this.balance = document.getElementById('balance');
        this.aboutModal = document.getElementById('about-modal');
        this.balanceModal = document.getElementById('balance-modal');
        this.settingsModal = document.getElementById('settings-modal');
        this.modalClose = document.getElementsByClassName('modal-close');
        this.hamburger = document.getElementById('hamburger');
        this.hamburgerMenu = document.getElementById('ham-menu');
        this.hamburgerOpen = false;
        this.addListeners();
    }

    addListeners() {
        document.addEventListener("click", (e) => {
            let targetElement = e.target; // clicked element

            do {
                if (targetElement === this.hamburgerMenu
                    || targetElement === this.hamburger
                    || !this.hamburgerOpen) {
                    return;
                }

                targetElement = targetElement.parentNode;
            } while (targetElement);

            this.toggleHamburgerMenu();
        });

        this.hamburger.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.toggleHamburgerMenu();
            if (!this.hamburgerOpen) {
                this.clearModals();
            }
        });

        // this.hamburger.addEventListener('mouseup', (e) => {
        //     this.hamburger.style.backgroundColor = 'transparent';
        //     this.hamburger.style.height = '50px';
        //     this.hamburger.style.width = '50px';
        // });
        this.balance.addEventListener('click', (e) => {
            e.stopPropagation()

            this.clearModals();

            this.balanceModal.style.opacity = 1;
            this.balanceModal.style.pointerEvents = 'auto';
            this.modalBG.style.display = 'block';
        });

        // this.about.addEventListener('click', (e) => {
        //     e.stopPropagation()

        //     this.clearModals();

        //     this.aboutModal.style.opacity = 1;
        //     this.aboutModal.style.pointerEvents = 'auto';
        //     this.modalBG.style.display = 'block';
        // });

        this.settings.addEventListener('click', (e) => {
            e.stopPropagation()

            this.clearModals();

            this.settingsModal.style.opacity = 1;
            this.settingsModal.style.pointerEvents = 'auto';
            this.modalBG.style.display = 'block';
        });

        this.modalBG.addEventListener('click', (e) => {
            e.stopPropagation()

            this.clearModals();
            this.modalBG.style.display = 'none';
            this.toggleHamburgerMenu()
        });

        for (let item of this.modalClose) {
            item.addEventListener('click', (e) => {
                e.stopPropagation()

                this.clearModals();
                this.modalBG.style.display = 'none';
                this.toggleHamburgerMenu();
            });
        }

        for (let item of this.modals) {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    clearModals() {
        window.location.hash.replace('#', '');
        window.location.hash = '';
        for (let item of this.modals) {
            item.style.pointerEvents = 'none';
            item.style.opacity = 0;
        }
    }

    toggleHamburgerMenu() {
        if (!this.hamburgerOpen) {
            this.hamburger.style.backgroundColor = 'rgba(207, 184, 161, .3)'
            this.hamburger.style.height = '55px';
            this.hamburger.style.width = '55px';
            this.hamburgerMenu.style.opacity = .75;
            this.hamburgerMenu.style.pointerEvents = 'auto';
            this.hamburgerOpen = true;
            // document.addEventListener('click', this.toggleHamburgerMenu.bind(this))

        } else {
            // document.removeEventListener('click', this.toggleHamburgerMenu.bind(this));
            this.hamburgerMenu.style.opacity = 0;
            this.hamburgerMenu.style.pointerEvents = 'none';
            this.hamburgerOpen = false;
            this.hamburger.style.backgroundColor = 'transparent';
            this.hamburger.style.height = '50px';
            this.hamburger.style.width = '50px';
        }

    }
}