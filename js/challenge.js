/**
 * Challenge Mode Manager
 * @author Yuki Yoshioka
 * 
 * @property {string} bgImage background image path
 * @property {HTMLAudioElement} bgm
 * @property {String} status game status
 * @property {int} remainTime 
 * @property {HTMLElement} screen canvas element
 * @property {CanvasRenderingContext2D} ctx 
 */
class Challenge {
    bgImagePath = 'https://studio-babe.com/wp-content/uploads/2023/04/bg-1.jpg';
    seconds = 25;

    constructor() {
        this.mainElm = document.getElementById('screen');
        this.mainElm.innerHTML = '';
        this.status = '';
        this.remainTime = this.seconds;
        this.setBgImage();
        this.setWaiting();
        this.correctInput = 0;
        this.incorrectInput = 0;
        this.tryNum = 1;
        this.startKeyBind();

    }

    /** set background image */
    setBgImage() {
        this.mainElm.style.backgroundImage = "url('" + this.bgImagePath + "')";
    }

    /** set waiting screen */
    setWaiting() {
        this.resetScreen();
        this.status = 'waiting';
        const waitWord = document.createElement('div');
        waitWord.style.textAlign = 'center';
        waitWord.classList.add('title-center');
        waitWord.style.color = 'red';
        waitWord.textContent = 'Press Space Key To Start';
        this.mainElm.appendChild(waitWord);
    }

    startKeyBind() {
        if (this.tryNum == 1) {
            document.addEventListener('keypress', this.keyCatcher.bind(this), true);
        }
    }

    /**
     * @param {Event} e keydown event
     */
    keyCatcher(e) {
        if (this.status === 'waiting') {
            if (e.code == 'Space') {
                this.status = 'playing';
                this.startGame();
            }
        } else if (this.status === 'playing') {
            const result = this.enemy.inputKey(e.key);
            result.result ? this.correctInput++ : this.incorrectInput++;
            return false;
        }
    }

    startGame() {
        this.status = 'playing';
        this.resetScreen();
        console.log('start!');
        playBgm();
        this.setTimer();
        this.showEnemy();

        if (this.tryNum == 1) {
            document.addEventListener('defeatEnemy', this.showEnemy.bind(this), true);
        }
    }

    showEnemy() {
        this.enemy = new Enemy('https://studio-babe.com/wp-content/uploads/2023/04/1-1.png');
        this.mainElm.appendChild(this.enemy.createElm());
    }

    setTimer() {
        this.updTimer();
        this.timer = setInterval(
            this.updTimer.bind(this),
            1000,
        );
    }

    showTimer() {
        const timerElm = document.createElement('div');
        timerElm.textContent = this.remainTime;
        timerElm.id = 'timer';
        timerElm.style.color = 'red';
        timerElm.style.textAlign = 'right';
        timerElm.style.position = 'relative';
        timerElm.style.top = '0';
        timerElm.style.paddingRight = '2rem';
        timerElm.style.fontSize = '2rem';

        this.mainElm.appendChild(timerElm);
    }

    updTimer() {
        let timerElm = document.getElementById('timer');
        if (timerElm) {
            this.remainTime = this.remainTime - 1;
            timerElm.textContent = this.remainTime;
        } else {
            this.showTimer();
        }

        if (this.remainTime == 0) {
            this.endChallenge();
        }
    }

    endChallenge() {
        this.status = 'result';
        clearInterval(this.timer);
        stopBgm();
        document.removeEventListener('keypress', this.keyCatcher.bind(this), true);
        this.showResult();
    }

    showResult() {
        this.resetScreen();

        const title = document.createElement('div');
        title.textContent = 'Score';
        title.classList.add('score-title');

        this.mainElm.appendChild(title);

        const result = document.createElement('div');
        result.textContent = this.correctInput * 100;
        result.classList.add('score-result');

        this.mainElm.appendChild(result);

        const restart = document.createElement('div');
        restart.textContent = 'restart';
        restart.classList.add('menu-item', 'restart-btn');
        restart.addEventListener('click', this.dispatchRestart.bind(this), true);
        this.mainElm.appendChild(restart);

        return false;
    }

    resetScreen() {
        this.mainElm.innerHTML = '';
    }

    dispatchRestart() {
        this.remainTime = this.seconds;
        this.correctInput = 0;
        this.incorrectInput = 0;
        this.tryNum++;
        this.startKeyBind();
        this.setWaiting();
    }

}