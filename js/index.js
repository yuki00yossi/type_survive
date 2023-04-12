const bgm = new Audio('https://studio-babe.com/wp-content/uploads/2023/04/bgm.mp3');
bgm.volume = 0.2;
const se_menu_hover = new Audio('https://studio-babe.com/wp-content/uploads/2023/04/maou_se_system35.mp3');
se_menu_hover.volume = 0.2;
const se_selected = new Audio('https://studio-babe.com/wp-content/uploads/2023/04/maou_se_battle18.mp3');
se_selected.volume = 0.2;

document.getElementById('btn-start').addEventListener('click', (e) => {
    bgm.loop = true;
    bgm.play();
    document.getElementById('title').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    const menu_item = document.getElementsByClassName('menu-item');

    for (let i = 0; i < menu_item.length; i++) {
        menu_item[i].addEventListener('mouseover', (e) => {
            if (!e.currentTarget.classList.contains('preparing')) {
                playSEMenuHover();
            }
        });
        menu_item[i].addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('preparing')) {
                playSESelect();
                bgm.pause();
                challenge = new Challenge;
            }
        });
    }

    document.addEventListener('restartChallenge', () => {
        challenge = '';
        challenge = new Challenge;
    });
});

function playBgm() {
    bgm.currentTime = 0;
    bgm.play();
}

function stopBgm() {
    bgm.pause();
}

function playSEMenuHover() {
    se_menu_hover.currentTime = 0;

    se_menu_hover.play();
}

function playSESelect() {
    se_selected.currentTime = 0;
    se_selected.play();
}