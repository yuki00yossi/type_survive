class Enemy {
    constructor(img_path) {
        this.wordArray = [];
        this.wordIdx = 0;
        this.damageVoice = '';
        this.imgPath = img_path;
        this.setWord();
        this.wrongNum = 0;
    }

    setWord() {
        const word = en_words[Math.floor(Math.random() * en_words.length)];
        this.wordArray = word.split('');
    }

    createElm() {
        const elm = document.createElement('div');
        elm.id = new Date().getTime();
        elm.style.position = 'relative';
        elm.style.display = 'inline-block';
        elm.style.top = '40%';
        elm.style.left = '50%';
        elm.style.transform = 'translate(-50%, -50%)';
        elm.classList.add('enemy');

        const img = document.createElement('img');
        img.src = this.imgPath;
        img.style.height = '340px';

        const wordArea = document.createElement('div');
        wordArea.style.textAlign = 'center';

        elm.appendChild(img);
        elm.appendChild(wordArea);
        this.elem = elm;
        this.setWordElm();

        return this.elem;
    }

    setWordElm() {
        const wordArea = this.elem.children[1];
        for (let i = 0; i < this.wordArray.length; i++) {
            const span = document.createElement('span');
            span.style.textAlign = 'center';
            span.style.color = 'red';
            span.style.fontSize = '2rem';
            span.textContent = this.wordArray[i];
            wordArea.appendChild(span);
        }
    }

    inputKey(key) {
        if (key == this.wordArray[this.wordIdx]) {
            const elm = document.getElementById(this.elem.id);
            elm.children[1].children[this.wordIdx].style.color = 'gray';
            this.wordIdx++;
            playSESelect();
            if (this.wordIdx == this.wordArray.length) {
                this.defeat();
            };

            return {
                result: true,
                addTime: this.wrongNum,
            };
        } else {
            return {
                result: false,
                addTime: this.wrongNum,
            };
        }
    }

    defeat() {
        const elm = document.getElementById(this.elem.id);
        elm.classList.add('defeat');
        elm.addEventListener('transitionend', (e) => {
            e.currentTarget.remove();
            const event = new Event('defeatEnemy');
            document.dispatchEvent(event);
        }, { once: true, });
    }
}