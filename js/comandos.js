var canvas;
var ctx;
var Altura;
var Largura;
var frames = 0;

var chao = {
    y: 550,
    altura: 50,
    cor: "#e8c410",

    desenha: function(){
        ctx.fillStyle=this.cor;
        ctx.fillRect(0,this.y, Largura, this.altura);
        
    }
};

var bloco = {
    x: 50,
    y: 0,
    largura: 50,
    altura: 50,
    cor: "#ec0000",
    gravidade: 1.5,
    velocidade: 0,
    forcaPulo: 15,
    qntPulos: 0,

    atualiza: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        if(this.y > chao.y - this.altura) {
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
        }
    },

    pular: function(){
        if(this.qntPulos < 4){
            this.velocidade = -this.forcaPulo;
            this.qntPulos++;
        }
        
    },

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },
};

var obstaculos = {
    _obs: [],
    _cores: ["#ffdd33", "#ddff44", "#55ddff", "#aadd11", "#aaff66", "#00ddaa"],
    insere: function(){
        this._obs.push({
            x: 200,
            largura: 30 + Math.floor(21 * Math.random()),
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this._cores[Math.floor(7 * Math.random())]
        });
    },
     
     atualiza: function(){

     },

     desenha: function(){
         for (var i = 0, tam = this._obs.length; i < tam; i++){
             var obs = this._obs[i];
             ctx.fillStyle = obs.cor;
             ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
         }
     }
};

function main(){

    Altura = window.innerHeight;
    Largura = window.innerWidth;

    if(Largura >= 500){
        Largura = 600;
        Altura = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = Largura;
    canvas.height = Altura;
    canvas.style.border =  "1px solid #73edf3";

    ctx = canvas.getContext("2d");
    
    document.addEventListener("keydown", clique);
    document.body.appendChild(canvas);
    roda();
}

    

function clique(event){
    //alert("Clicou no canvas. Altura: "+ altura +" Largura: "+ largura);
     if(event.keyCode == 32){
        bloco.pular();
        
     }
}

function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function atualiza(){
    frames++;
    bloco.atualiza();
}

function desenha(){
    ctx.fillStyle="#50beff";
    ctx.fillRect(0,0,Largura,Altura);
    
    chao.desenha();
    obstaculos.desenha();
    bloco.desenha();
}

main();