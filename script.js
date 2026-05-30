
(function () {
    const yesButton = document.getElementById('yesBtn');
    const noButton = document.getElementById('noBtn');
    const mainTitle = document.getElementById('mainTitle');
    const motherGif = document.getElementById('motherGif');
    const subMsg = document.getElementById('subMsg');
    const giftIconDiv = document.getElementById('giftIcon');
    const buttonGroup = document.getElementById('buttonGroup');

    let noClickCount = 0;

    // GIFs de Tenor (FONCTIONNENT PARTOUT !)
    const noResponses = [
        {
            title: "Vraiment maman ? 🥺💐",
            gif: "https://media.tenor.com/uYeI7qWq1RAAAAAi/cat-sad.gif",
            sub: "Tu mérites tout mon amour !"
        },
        {
            title: "Oh non, tu es sûre ? 😢🌷",
            gif: "https://media.tenor.com/78rQ2Pqk9SAAAAAi/cry-cat.gif",
            sub: "Un câlin virtuel pour te convaincre 🤗"
        },
        {
            title: "Dernière chance, je t'adore 💖",
            gif: "https://media.tenor.com/mQ5kqQTfJmIAAAAi/bear-hug.gif",
            sub: "Un bisou pour dire oui 💋"
        }
    ];

    const successContent = {
        title: "❤️ Merci Maman ! Je t'aime infiniment ❤️",
        gif: "https://media.tenor.com/4-5BwP4Q0mAAAAAi/happy-flowers.gif",
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

        yesButton.style.display = 'none';
        noButton.style.display = 'none';

        const extraLove = document.createElement('div');
        extraLove.className = 'sub-message';
        extraLove.style.marginTop = '12px';
        extraLove.style.background = '#ffd9cc';
        extraLove.innerHTML = '🌸🌼🌺 Tu es unique, je te remercie pour tout 🌺🌼🌸';
        buttonGroup.parentNode.insertBefore(extraLove, buttonGroup.nextSibling);

        createConfetti();
    }

    function handleNoClick() {
        noClickCount++;

        if (noClickCount <= 3) {
            updateForNoResponse(noClickCount - 1);
        }

        if (noClickCount === 3) {
            transformNoButtonToYes();
        }
    }

    function transformNoButtonToYes() {
        noButton.textContent = "❤️ OUI, bien sûr ❤️";
        noButton.classList.remove('btn-no');
        noButton.classList.add('btn-yes');

        const newNoBtn = noButton.cloneNode(true);
        noButton.parentNode.replaceChild(newNoBtn, noButton);

        newNoBtn.addEventListener('click', function () {
            finalAcceptance();
        });

        subMsg.innerHTML = "<i class='fas fa-smile-wink'></i> Maintenant choisis 'Oui' pour me faire plaisir !";
    }

    function handleYesClick() {
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

    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        subMsg.innerHTML = "☀️ Bonjour Maman chérie !";
    } else if (currentHour < 18) {
        subMsg.innerHTML = "🌼 Douce après-midi Maman !";
    } else {
        subMsg.innerHTML = "✨ Bonne soirée Maman ✨";
    }
})();
