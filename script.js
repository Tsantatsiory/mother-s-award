(function () {
    let yesButton = document.getElementById('yesBtn');
    let noButton = document.getElementById('noBtn');
    const mainTitle = document.getElementById('mainTitle');
    const motherGif = document.getElementById('motherGif');
    const subMsg = document.getElementById('subMsg');
    const giftIconDiv = document.getElementById('giftIcon');
    const buttonGroup = document.getElementById('buttonGroup');

    let noClickCount = 0;

    // ✅ GIFs QUI MARCHENT
    const noResponses = [
        {
            title: "Vraiment maman ? 🥺💐",
            gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2JxaXhpenRkbW92YXBnMDV2amQ3YzI5djJjOWV2MHR1c3V6cnZxaCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/l0EwY9tLavkS7pOMM/giphy.gif",
            sub: "Tu mérites tout mon amour !"
        },
        {
            title: "Oh non, tu es sûre ? 😢🌷",
            gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtqc3B5dXlldHpvbDFpM3Vmajl0djd5MWJxYmp6eWg0cXdiMTRxdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bqZadRhjePrJeqONfL/giphy.gif",
            sub: "Un câlin virtuel pour te convaincre 🤗"
        },
        {
            title: "Dernière chance, je t'adore 💖",
            gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtqc3B5dXlldHpvbDFpM3Vmajl0djd5MWJxYmp6eWg0cXdiMTRxdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OzlmyoTC2n3aOTXGFi/giphy.gif",
            sub: "Un bisou pour dire oui 💋"
        }
    ];

    const successContent = {
        title: "❤️ Merci Maman ! Je t'aime infiniment ❤️",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTU0bnlsaHZxcmdxcW9mYzBubDB0NGx0YWJ0b3VqZm82OXJwM3h0diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LRf5isekleDwRTjiTg/giphy.gif",
        sub: "Tu es ma plus belle étoile ✨",
        giftHtml: '<i class="fas fa-heart" style="color:#ff6f8b;"></i> <i class="fas fa-crown"></i> <i class="fas fa-heart" style="color:#ff6f8b;"></i>'
    };

    function updateForNoResponse(index) {
        const resp = noResponses[index];
        if (resp) {
            mainTitle.classList.add('fade-in');
            motherGif.classList.add('fade-in');
            setTimeout(() => {
                mainTitle.classList.remove('fade-in');
                motherGif.classList.remove('fade-in');
            }, 300);

            mainTitle.textContent = resp.title;
            motherGif.src = resp.gif;
            subMsg.innerHTML = `<i class="fas fa-feather-alt"></i> ${resp.sub}`;
            giftIconDiv.innerHTML = '<i class="fas fa-heart-broken"></i>';
            setTimeout(() => {
                if (noClickCount < 3) giftIconDiv.innerHTML = '<i class="fas fa-gift"></i> <i class="fas fa-feather-alt"></i>';
            }, 1500);
        }
    }

    function finalAcceptance() {
        mainTitle.classList.add('fade-in');
        motherGif.classList.add('fade-in');
        setTimeout(() => {
            mainTitle.classList.remove('fade-in');
            motherGif.classList.remove('fade-in');
        }, 400);

        mainTitle.textContent = successContent.title;
        motherGif.src = successContent.gif;
        subMsg.innerHTML = `<i class="fas fa-star-of-life"></i> ${successContent.sub}`;
        giftIconDiv.innerHTML = successContent.giftHtml;

        if (yesButton) yesButton.style.display = 'none';
        if (noButton) noButton.style.display = 'none';

        const extraLove = document.createElement('div');
        extraLove.className = 'sub-message';
        extraLove.style.marginTop = '12px';
        extraLove.style.background = '#ffd9cc';
        extraLove.innerHTML = '🌸🌼🌺 Tu es unique, je te remercie pour tout 🌺🌼🌸';
        if (buttonGroup && buttonGroup.parentNode) {
            buttonGroup.parentNode.insertBefore(extraLove, buttonGroup.nextSibling);
        }

        createConfetti();
    }

    function handleNoClick(e) {
        e.preventDefault();
        noClickCount++;

        if (noClickCount <= 3 && noClickCount - 1 < noResponses.length) {
            updateForNoResponse(noClickCount - 1);
        }

        if (noClickCount === 3) {
            transformNoButtonToYes();
        }
    }

    function transformNoButtonToYes() {
        if (!noButton) return;

        // Changer le texte et la classe du bouton No
        noButton.textContent = "❤️ OUI, bien sûr ❤️";
        noButton.classList.remove('btn-no');
        noButton.classList.add('btn-yes');

        // Créer un nouveau bouton et remplacer l'ancien
        const newNoBtn = document.createElement('button');
        newNoBtn.id = 'noBtn';
        newNoBtn.className = noButton.className;
        newNoBtn.textContent = noButton.textContent;
        newNoBtn.style.cssText = noButton.style.cssText;

        // Remplacer l'ancien bouton
        if (noButton.parentNode) {
            noButton.parentNode.replaceChild(newNoBtn, noButton);
        }

        // Mettre à jour la référence
        noButton = newNoBtn;

        // Ajouter le nouvel écouteur
        noButton.addEventListener('click', function finalHandler(e) {
            e.preventDefault();
            finalAcceptance();
        });

        subMsg.innerHTML = "<i class='fas fa-smile-wink'></i> Maintenant choisis 'Oui' pour me faire plaisir !";
    }

    function handleYesClick(e) {
        e.preventDefault();
        finalAcceptance();
    }

    function createConfetti() {
        const colors = ['#ffb7c5', '#ff8aa8', '#ffd6b0', '#ffe0a3', '#f8c7cc'];
        for (let i = 0; i < 80; i++) {
            const conf = document.createElement('div');
            conf.style.position = 'fixed';
            conf.style.width = Math.random() * 8 + 4 + 'px';
            conf.style.height = Math.random() * 8 + 4 + 'px';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            conf.style.top = '-10px';
            conf.style.left = Math.random() * window.innerWidth + 'px';
            conf.style.zIndex = '9999';
            conf.style.pointerEvents = 'none';
            document.body.appendChild(conf);
            const duration = Math.random() * 2000 + 1500;
            conf.animate([
                { transform: `translateY(0px) rotate(0deg)`, opacity: 0.9 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], { duration: duration });
            setTimeout(() => conf.remove(), duration);
        }
    }

    // Supprimer les anciens écouteurs avant d'en ajouter de nouveaux
    const newYesBtn = yesButton.cloneNode(true);
    if (yesButton.parentNode) {
        yesButton.parentNode.replaceChild(newYesBtn, yesButton);
    }
    yesButton = newYesBtn;

    const newNoBtn = noButton.cloneNode(true);
    if (noButton.parentNode) {
        noButton.parentNode.replaceChild(newNoBtn, noButton);
    }
    noButton = newNoBtn;

    // Ajout des écouteurs
    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);

    // Message du jour
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        subMsg.innerHTML = "☀️ Bonjour Maman chérie !";
    } else if (currentHour < 18) {
        subMsg.innerHTML = "🌼 Douce après-midi Maman !";
    } else {
        subMsg.innerHTML = "✨ Bonne soirée Maman ✨";
    }
})();
