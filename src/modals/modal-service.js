export class ModalService {
    constructor() {
        this.modals = document.getElementsByClassName('modals');
        this.modalBG = document.getElementById('modal-background');
        this.about = document.getElementById('about');
        this.settings = document.getElementById('settings');
        this.aboutModal = document.getElementById('about-modal');
        this.settingsModal = document.getElementById('settings-modal');
        this.modalClose = document.getElementsByClassName('modal-close');

        this.addListeners();
    }

    addListeners() {
        this.about.addEventListener('click', () => {
            this.clearModals();

            this.aboutModal.style.opacity = 1;
            this.aboutModal.style.pointerEvents = 'auto';
            this.modalBG.style.display = 'block';
        });

        this.settings.addEventListener('click', () => {
            this.clearModals();

            this.settingsModal.style.opacity = 1;
            this.settingsModal.style.pointerEvents = 'auto';
            this.modalBG.style.display = 'block';
        });

        this.modalBG.addEventListener('click', () => {
            this.clearModals();
            this.modalBG.style.display = 'none';
        });

        for (let item of this.modalClose) {
            item.addEventListener('click', () => {
                this.clearModals();
                this.modalBG.style.display = 'none';
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
}