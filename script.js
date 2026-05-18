document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', () => nav.classList.toggle('open'));
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }

    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal-overlay');

    function openModal(modalId) {
        const modal = document.getElementById('modal' + modalId.charAt(0).toUpperCase() + modalId.slice(1));
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        if (nav) nav.classList.remove('open');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) closeModal(modal);
            });
        }
    });

    const downloadContractBtn = document.getElementById('downloadContract');
    if (downloadContractBtn) {
        downloadContractBtn.addEventListener('click', () => {
            const contractText = `ДОГОВОР ОКАЗАНИЯ УСЛУГ № ______
г. ___________                             «___» ________ 20__ г.
... (полный текст договора)`;
            const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Договор_оказания_услуг_PC_MAESTRO.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    
});

function startCountdown() {
    const openDate = new Date('2026-06-30T00:00:00');
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');
    const countdownMessage = document.getElementById('countdownMessage');
    const countdownTimer = document.getElementById('countdownTimer');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = openDate.getTime() - now;

        if (distance < 0) {
            clearInterval(interval);
            if (countdownTimer) countdownTimer.style.display = 'none';
            if (countdownMessage) {
                countdownMessage.style.display = 'block';
                countdownMessage.textContent = '🎉 МЫ ОТКРЫЛИСЬ! ЖДЁМ ВАС В МАСТЕРСКОЙ 🎉';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (timerDays) timerDays.textContent = days < 10 ? '0' + days : days;
        if (timerHours) timerHours.textContent = hours < 10 ? '0' + hours : hours;
        if (timerMinutes) timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (timerSeconds) timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
}

document.addEventListener('DOMContentLoaded', startCountdown);
