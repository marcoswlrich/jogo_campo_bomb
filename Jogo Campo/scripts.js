var field, player;

class Field {
    constructor(colunas, linhas, containerId){
        this.colunas = colunas;
        this.linhas = linhas;
        this.container = document.querySelector(containerId);
        this.createField();
        
    }


    createField(){
        var field = [];
        for(var i = 0; i < this.linhas; i++){
            field[i] = [];
            for(var j = 0; j < this.colunas; j++){
                field[i].push(this.createRock());
            }
        }
        this.field = field;
        this.drawField();
    }

    createRock() {
        return Math.trunc(Math.random() * 5) === 1 ? '@' : '';
    }

    drawField() {
        var template = '';
        for(var i = 0; i < this.linhas; i++){
            template += '<tr>';
            for(var j = 0; j < this.colunas; j++){
                template += `<td>${this.field[i][j]}</td>`;
            }
            template += '</tr>';
        }
        this.container.innerHTML = template;
    }
}


class Jogador {
    constructor(field, x, y, face){
        this.face = face;
        this.x = x;
        this.y = y;
        this.table = field;
        if(!this.setPosition(this.x, this.y)) {
            throw Error();
        }

    }

    up() {
        if(this.y > 0) {
            this.setPosition(this.x, this.y - 1);
        }
    }

    down() {
        if(this.y +  1 < this.table.linhas) {
            this.setPosition(this.x, this.y + 1);
        }
    }

    left() {
        if(this.x > 0) {
            this.setPosition(this.x - 1, this.y);
        }
    }

    rigth() {
        if(this.x + 1 < this.table.colunas) {
            this.setPosition(this.x + 1, this.y);
        }
    }

    setPosition(x, y) {
        if(this.table.field[y][x] === '') {
            this.table.field[this.y][this.x] = '';
            this.x = x;
            this.y = y;
            this.table.field[this.y][this.x] = this.face;
            this.table.drawField();
            return true;
        }
        return false;
    }
}

class Player extends Jogador {
    constructor(field) {
        super(field, 0, 0, 'o_O');
    }
}

class Npc extends Jogador {
    constructor(field) {
        var x = Math.trunc(Math.random()*field.colunas),
            y = Math.trunc(Math.random()*field.linhas); 

        super(field, x, y, '-_-');
        setInterval(this.walk.bind(this), 500);
    }

    walk() {
        var direction = Math.trunc(Math.random()*4) + 1;
        switch(direction) {
            case 1: this.up(); break;
            case 2: this.down(); break;
            case 3: this.rigth(); break;
            case 4: this.left(); break;
        }
    }
}

function startField(){ 
    var colunas = document.querySelector('#colunas').value || 3,
         linhas = document.querySelector('#linhas').value || 3;
    
    document.querySelector('button').disabled = true;

    field = new Field(colunas, linhas, '#myTable');
    try{
        player = new Player(field);
    }catch(e){
        console.log('starting field again');
        startField();
    }
}

window.addEventListener('Keyup', function(event) {
    if(player) {
        const A = 65,
              S = 83,
              D = 68,
              W = 87;

        switch(event.keyCode) {
            case A: player.left(); break;
            case S: player.down(); break;
            case D: player.rigth(); break;
            case W: player.up(); break;
        }
    }
})
