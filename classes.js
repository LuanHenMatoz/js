class Character {
    _life = 1;
    maxLife = 1;
    defense = 1;
    attack = 1;
    constructor(name) {
        this.name = name  ;
    }
    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 10;
        this.defense = 8;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 3;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.maxLife = this.life;
        this.attack = 4;
        this.defense = 4;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.maxLife = this.life;
        this.attack = 16;
        this.defense = 6;
    }
}

class Stage {
    constructor(char1, char1El, char2, char2El, logObject) {
        this.char1 = char1;         
        this.char1El = char1El;
        this.char2 = char2;
        this.char2El = char2El;
        this.log = logObject;
    }

    start() {
        this.char1El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.char1,this.char2));
        this.char2El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.char2,this.char1));
        this.update();              
    }

    update() {
        //char1
        this.char1El.querySelector(".name").innerText = `${this.char1.name} - ${this.char1.life.toFixed(2)} HP`; 
        let f1Pct = (this.char1.life / this.char1.maxLife) * 100;
        this.char1El.querySelector(".lifebar .bar").style.width = `${f1Pct}%`;

        //char2
        this.char2El.querySelector(".name").innerText = `${this.char2.name} - ${this.char2.life.toFixed(2)} HP`; 
        let f2Pct = (this.char2.life / this.char2.maxLife) * 100;
        this.char2El.querySelector(".lifebar .bar").style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        if ( attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage(`Atacando cachorro morto`);
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack; // - actualDefense

            let imgEl = this.char1El.querySelector(".ataque")
            let position = imgEl.getBoundingClientRect().x;
            const destination = 600; // Posição final da imagem
            const interval = 10; // Tempo entre cada movimento (em milissegundos)
            const step = 10; // Quantidade de pixels a mover por intervalo
            const originalPosition = {
                left: imgEl.offsetLeft,
                top: imgEl.offsetTop
            };
            const moveDuration = 1000; // Duração do movimento em milissegundos
            const returnDelay = 2000; // Tempo para voltar à posição original após o movimento (em milissegundos)


            const moveImage = setInterval(function() {
                if (position >= destination) {
                    clearInterval(moveImage); // Para o movimento ao alcançar o destino
                    setTimeout(function() {
                        imgEl.style.left = originalPosition.left + 'px';
                        imgEl.style.transition = `left ${moveDuration}ms ease`; // Define a animação para retorno
                    }, moveDuration + returnDelay);
                } else {
                    position += step;
                    imgEl.style.left = position + 'px';
                }
            }, interval);
            console.log(imgEl.style.left)
   
        }
        else{
            this.log.addMessage(`${attacked.name} conseguiu defender`);
        }

        this.update();


    }

    at
}

class Log {

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg){
        let newLi = document.createElement("li")
        newLi.innerText = msg
        this.listEl.prepend(newLi)
    }

}
