//variaveis criacao bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro / 2;

//variaveis dos sons do jogo
let somRaquetada;
let somPonto;
let somTrilhaSonora;

function preload()
{
  somRaquetada = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
  somTrilhaSonora = loadSound("trilha.mp3");

}

function criaBolinha()
{
  circle(xBolinha, yBolinha, diametro);
}

//variaveis dos pontos
let meusPontos = 0;
let pontosOponente = 0;

function mostraPontos()
{
  stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(222, 0, 245));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(222, 0, 245));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function contaPontos()
{
  if(xBolinha - raio < 0){
    pontosOponente +=1;
    somPonto.play();
    
  }
  else
  {
    
    if(xBolinha + raio > 600)
    {
      meusPontos +=1;
      somPonto.play();
    }
  }
}

//variavel da colisão da biblioteca
let colidiu = false;

//variaveis movimentacao bolinha
let velocidadeXBolinha = 1;
let velocidadeYBolinha = 1;

//variaveis criacao retangulo esquerdo
let larguraRetanguloEsquerdo = 10;
let comprimentoRetanguloEsquerdo = 100;
let xRetanguloEsquerdo = 0;
let yRetanguloEsquerdo = 200-comprimentoRetanguloEsquerdo/2;

//variaveis criacao retangulo direito
let larguraRetanguloDireito = 10;
let comprimentoRetanguloDireito = 100;
let xRetanguloDireito = 600 - larguraRetanguloDireito;
let yRetanguloDireito = 200 - comprimentoRetanguloDireito/2;

//variaveis movimento retangulo direito
let velocidadeYRetanguloDireito = 6;

//variaveis movimento retangulo esquerdo
let velocidadeYRetanguloEsquerdo = 6;



function movimentaRetanguloDireito()
{

  if(yRetanguloDireito > 0)
    {
      if(keyIsDown(87))
        {
          yRetanguloDireito -= velocidadeYRetanguloDireito;
        }
    }
  if(yRetanguloDireito + 100 < 400)
    {
      if(keyIsDown(83))
        {
          yRetanguloDireito += velocidadeYRetanguloDireito;
        }
    }
}

function movimentaRetanguloEsquerdo()
{
  
  if (yRetanguloEsquerdo >= 0 )
  {
    if(keyIsDown(UP_ARROW))
    {
        yRetanguloEsquerdo -= velocidadeYRetanguloEsquerdo;

    }  
  }

  if(yRetanguloEsquerdo + 100 <= 400)
  {
    if(keyIsDown(DOWN_ARROW))
    {
      yRetanguloEsquerdo += velocidadeYRetanguloEsquerdo;
    }
  }


}

function criaRetangulos(){
  rect(xRetanguloEsquerdo, yRetanguloEsquerdo, larguraRetanguloEsquerdo, comprimentoRetanguloEsquerdo);
  rect(xRetanguloDireito,yRetanguloDireito, larguraRetanguloDireito, comprimentoRetanguloDireito);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao(){
 if (xBolinha+(diametro/2) > width || xBolinha-(diametro/2) < 0)
{
    velocidadeXBolinha *= -1;
  
    
}
  
  if (yBolinha+(diametro/2) > height || yBolinha-(diametro/2) < 0)
  {
    velocidadeYBolinha *= -1;
  }  
}

function verificaColisaoRetanguloEsquerdo(){
  if(xBolinha - diametro/2 < xRetanguloEsquerdo + larguraRetanguloEsquerdo &&
     yBolinha - diametro/2 < yRetanguloEsquerdo + comprimentoRetanguloEsquerdo && 
     yBolinha + diametro/2 > yRetanguloEsquerdo 
    ) 
  {
        velocidadeXBolinha *= -1;
        somRaquetada.play();
  }
  

}

function verificaColisaoRetaguloDireito(){
  if(xBolinha + diametro/2 > xRetanguloDireito &&
     yBolinha + diametro/2 > yRetanguloDireito &&
     yBolinha - diametro/2 < yRetanguloDireito + comprimentoRetanguloDireito
     ){
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  }
}

function setup() {
  createCanvas(600, 400);
  somTrilhaSonora.loop();
}

function draw() {
  background(0);
  criaBolinha()
 movimentaBolinha(); 
  verificaColisao();
  criaRetangulos();
  movimentaRetanguloDireito();
  movimentaRetanguloEsquerdo();
  verificaColisaoRetanguloEsquerdo();
  contaPontos();
  verificaColisaoRetaguloDireito();
  mostraPontos();
  
  
}