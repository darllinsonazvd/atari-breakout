var pt,
  aleat,
  b,
  iniciou = false,
  a = true,
  img1,
  img2,
  img3,
  img4,
  vidas,
  pontos = 0,
  qtdvidas = 2,
  comeco = false
var quadrados = []
var x = 36
var y = 100
var cont = 10
var qtdQuads = 50

function upgrades(quando, tipo) {
  if (quando >= 45) {
    if (tipo == 0) {
      pt.tm = 150
    } else if (tipo == 1) {
      b.velx += 1
      b.vely += 1
      pontos += 20
    } else if (tipo == 2) {
      ellipse(b.x, b.x, b.d.b.d)
    } else if (tipo == 3) {
      b.velx -= 1
      b.vely -= 1
      pontos += 5
    } else if (tipo == 4) {
      pt.tm = 50
      pontos += 30
    }
  }
}

function welcome() {
  if (comeco) {
    return
  }
  image(img4, 0, 0)
  text('Pressione ENTER para começar', width - 575, height - 200)
}

function preload() {
  img1 = loadImage('sprites/life-bar-1.png')
  img2 = loadImage('sprites/life-bar-2.png')
  img3 = loadImage('sprites/life-bar-3.png')
  img4 = loadImage('sprites/welcome.jpeg')
}

function setup() {
  createCanvas(720, 500)
  // pt = plataforma
  pt = {
    x: width / 2,
    y: height * 0.9,
    tm: 100
  }
  // b = bolinha
  b = {
    x: width / 2,
    y: height * 0.9 - 10,
    velx: 0,
    vely: 0,
    d: 20,
    r: 10
  }

  for (var i = 0; i < 50; i++) {
    if (i == cont) {
      y += 30
      x = 36
      cont += 10
    }
    quadrados.push({
      x: x,
      y: y,
      tm: 33,
      vermelho: '#ff0000',
      laranja: '#ff7200',
      amarelo: '#f6ff00',
      verde: '#00960c',
      azul: '#0090ff'
    })
    x += 72
  }
}

function draw() {
  fill('#b2b2b2')
  background('black')
  ellipse(b.x, b.y, b.d, b.d)
  fill('write')
  rect(pt.x - pt.tm, pt.y, pt.tm * 2, 20, 20)
  textSize(30)
  text(pontos, width - 70, height - 450)
  vidas = [img1, img2, img3]
  b.x += b.velx
  b.y += b.vely
  if (pt.x - pt.tm <= b.x && b.x <= pt.x + pt.tm) {
    if (b.y + b.d / 2 >= pt.y) {
      b.vely = -b.vely
    }
  }

  if (b.x <= b.d / 2 || b.x >= width - b.d / 2) {
    b.velx = -b.velx
  }
  if (b.y < b.d / 2) {
    b.vely = -b.vely
  }
  if (b.y > height) {
    qtdvidas--
    pt.tm = 100
    if (qtdvidas <= 2) {
      b.x = width / 2
      b.y = height * 0.9 - 10
      b.velx = 0
      b.vely = 0
      iniciou = false
      a = true
      pt.x = width / 2
    }
    if (qtdvidas < 0) {
      background(0)
      fill(255)
      textSize(50)
      text('GAME OVER', width - 500, height / 2)
      fill(255)
      textSize(30)
      text('Pontuação:' + pontos, width - 450, height - 200)
      text('Pressione F5 para jogar novamente', width - 600, height - 150)
    }
  }
  image(vidas[qtdvidas], width - 700, height - 480, 40, 40)
  for (var i = 0; i < quadrados.length; i++) {
    var quadrado = quadrados[i]

    if (quadrado.y == 100) {
      fill(quadrado.vermelho)
      rect(quadrado.x - quadrado.tm, quadrado.y, quadrado.tm * 2, 20)
      noStroke()
    } else if (quadrado.y == 130) {
      fill(quadrado.laranja)
      rect(quadrado.x - quadrado.tm, quadrado.y, quadrado.tm * 2, 20)
      noStroke()
    } else if (quadrado.y == 160) {
      fill(quadrado.amarelo)
      rect(quadrado.x - quadrado.tm, quadrado.y, quadrado.tm * 2, 20)
      noStroke()
    } else if (quadrado.y == 190) {
      fill(quadrado.verde)
      rect(quadrado.x - quadrado.tm, quadrado.y, quadrado.tm * 2, 20)
      noStroke()
    } else if (quadrado.y == 220) {
      fill(quadrado.azul)
      rect(quadrado.x - quadrado.tm, quadrado.y, quadrado.tm * 2, 20)
      noStroke()
    }

    if (
      quadrado.x - quadrado.tm <= b.x + b.r / 2 &&
      b.x <= quadrado.x + quadrado.tm
    ) {
      if (quadrado.y <= b.y + b.r / 2 && b.y <= quadrado.y + quadrado.tm) {
        // b.velx = random(-b.velx, b.velx)
        b.vely = -b.vely
        quadrados.splice(i, 1)
        qtdQuads--
        pontos += 10
        upgrades(int(random(50)), int(random(2)))
      }
    }
  }

  if (qtdQuads <= 0) {
    background(0)
    fill(255)
    textSize(50)
    text('YOU WIN', width - 500, height / 2)
    fill(255)
    textSize(30)
    text('Pontuação: ' + pontos, width - 500, height - 200)
    text('Pressione F5 para jogar novamente', width - 600, height - 150)
  }
  welcome()
}

function keyPressed() {
  if (iniciou) {
    return
  }
  if (keyCode === 32) {
    iniciou = true
    a = false
    b.velx = random(-5, 5)
    b.vely = random(-7, -4)
  }
}

function keyReleased() {
  if (keyCode == 37) {
    if (pt.x - pt.tm - 20 > 0) {
      pt.x += -50
      if (a) {
        b.x += -50
      }
    }
  }
  if (keyCode == 39) {
    if (pt.x + pt.tm + 20 < width) {
      pt.x += +50
      if (a) {
        b.x += 50
      }
    }
  }
  if (keyCode == 13) {
    comeco = true
  }
}
