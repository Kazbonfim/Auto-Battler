// Main script refatorado, v4

console.log('Para ver o Debug de seu personagem escreva `console.table([playerObject],[playerObject.hp])`, e para ver de seu oponente `console.table([enemyObject],[enemyObject.hp])')

playerObject = {
    name: 'Dottomonsutā',
    hp: 100,
    attack: 10,
    defense: 8,
    luck: 5,
    state: true,
    exp: 0,
    nextLevel: 150
}

enemyObject = {
    name: 'Dottomonsutā',
    hp: 100,
    attack: 10,
    defense: 8,
    luck: 5,
    state: true,
    exp: 0,
    nextLevel: 150
}

// Sounds section.
    function soundHit1() {
        const hit01 = new Audio('./sound/ahit_001.wav')
        hit01.play()
    }

    function soundHit2() {
        const hit02 = new Audio('./sound/ahit_002.wav')
        hit02.play()
    }

    function soundCritical() {
        const critical = new Audio('./sound/critical.wav')
        critical.play()
    }

    function soundDefeat() {
        const defeat = new Audio('./sound/defeat.wav')
        defeat.play()
    }

    function soundVictory() {
        const victory = new Audio('./sound/victory.wav')
        victory.play()
    }

    function soundRecovery() {
        const recovery = new Audio('./sound/recover.wav')
        recovery.play()
    }

    function soundMiss() {
        const misses = new Audio('./sound/miss.wav')
        misses.play()
    }

// End.

const start = document.getElementById('Battle');
start.addEventListener("click", init);

const resting = document.getElementById('Rest');
resting.addEventListener('click', rest);

myTimer = ''

// Log notes...
function playerNormalHit(damage){
    soundHit1()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    const textnode = document.createTextNode(`Seu ${playerObject.name} causou ${damage} de dano!`)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
};

function playerCriticalHit(damage, critical){
    soundCritical()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('Critical')
    const textnode = document.createTextNode(`Seu ${playerObject.name} causou dano crítico!!! ${damage + critical}`)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}

function enemyNormalHit(damage){
    soundHit2()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    const textnode = document.createTextNode(`Seu ${playerObject.name} recebeu ${damage} de dano!`)
    node.appendChild(textnode)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}

function enemyCriticalHit(damage, critical){
    soundCritical()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('Critical')
    const textnode = document.createTextNode(`Seu ${playerObject.name} recebeu dano crítico! ${damage + critical}`)
    node.appendChild(textnode)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}

function playerWins(experience){
    soundVictory()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('Victory')
    const textnode = document.createTextNode(`VITÓRIA! Você venceu esse round, e recebeu ${experience}.exp como recompensa! Os valores serão atribuídos ao seu Pet.`)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
    // New Button
    const element2 = document.getElementById('menu')
    const node2 = document.createElement('button')
    node2.setAttribute('id', 'nextPage')
    const textnode2 = document.createTextNode('Next')
    element2.appendChild(node2), node2.appendChild(textnode2)

    const nextOnClick = document.getElementById('nextPage')
    nextOnClick.onclick = function(){
        console.log('Vamos recarregar a página pra você, um instante...')
        setInterval(function() {
            console.log('Preparando...')
            location.reload()
            return false
        }, 3000)

    }
}

function playerLost(){
    soundDefeat()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('Critical')
    const textnode = document.createTextNode(`DERROTA! Seu pet precisa de um descanso... clique em 'descansar' para poder se recuperar.`)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}


function playerMisses(){
    soundMiss()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('p')
    const textnode = document.createTextNode(`Você errou!`)
    node.appendChild(textnode)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}


function enemyMisses(){
    soundMiss()
    const element = document.getElementById('log')
    const node = document.createElement('p')
    node.classList.add('Critical')
    const textnode = document.createTextNode(`Ele errou!`)
    node.appendChild(textnode)
    element.appendChild(node), node.appendChild(textnode)
    node.scrollIntoView({behavior: "smooth"});
}
// End.

function init() {
    start.disabled = true
    myTimer = setInterval(function Iniciando() {
        checkHp()
    }, 1000)
}

function checkHp() {
    if(playerObject.hp <= 0) {
        console.log('Você perdeu!')
        playerLost()
        clearInterval(myTimer)
        resting.disabled = false 
        start.disabled = true
    } else if (enemyObject.hp <= 0){
        console.log('Você Venceu! 😉')
        playerWins(300)
        start.disabled = true
        clearInterval(myTimer)
        /* setTimeout(function(){
            document.location.reload()
        }, 8500) */
    } else {
        battle()
    }
}

function battle() {
    turn = 0
    turn = Math.floor(Math.random () * 2)
    /* console.log(turn) */
    if(turn === 1) {
        playerTurn()
    } else {
        enemyTurn()
    }
}

function playerTurn() {
    damage = 0
    damage = Math.floor(Math.random() * 20)
    critical = 0
    critical = Math.floor(Math.random() * (30 - 15)) + playerObject.luck;
        if(critical >= 15){
            enemyObject.hp -= (damage + critical)
            console.log(`Você causou dano crítico! ${damage + critical} de dano.`)
            playerCriticalHit(damage, critical)
            return playerTurn
        } else if(damage === 0){
            playerMisses()
            soundMiss()
            console.log('Você errou seu golpe!')
            return playerTurn
        } else {
            enemyObject.hp -= damage
            console.log(`Você causou ${damage} de dano.`)
            playerNormalHit(damage)
            return playerTurn
        }
}

function enemyTurn() {
    damage = 0
    damage = Math.floor(Math.random() * 6)
    critical = 0
    critical = Math.floor(Math.random() * (30 - 15)) + enemyObject.luck;
        if(critical >= 15){
            playerObject.hp -= (damage + critical)
            console.log(`Você recebeu dano crítico! ${damage + critical} de dano.`)
            enemyCriticalHit(damage, critical)
            return playerTurn
        } else if(damage === 0){
            enemyMisses()
            soundMiss()
            console.log('Seu oponente tropeçou e errou o golpe!')
            return playerTurn
        } else {
            playerObject.hp -= damage
            console.log(`Você recebeu ${damage} de dano.`)
            enemyNormalHit(damage)
            return playerTurn
        }
}

function rest() {
    console.log('Descansando...aguarde alguns instantes.')
    setTimeout(function() {
        fulfill()
    }, 3000) 
}

function fulfill() {
    soundRecovery()
    playerObject.hp = 100
    console.log(`Sua vida atual ${playerObject.hp}`)
    resting.disabled = true 
    start.disabled = false
    return 
}


