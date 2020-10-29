const section = document.querySelector("section");
const game = document.createElement("div");
game.id = "gameboard";

section.append(game);

let plateau =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0],
        [0, 1, 1, 8, 8, 1, 8, 8, 8, 1, 8, 1, 8, 8, 8, 1, 8, 8, 1, 1, 0],
        [0, 1, 1, 1, 8, 1, 8, 8, 8, 1, 8, 1, 8, 8, 8, 1, 8, 1, 1, 1, 0],
        [0, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 0],
        [0, 1, 8, 8, 8, 1, 8, 1, 8, 8, 8, 8, 8, 1, 8, 1, 8, 8, 8, 1, 0],
        [0, 1, 1, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 8, 8, 8, 1, 8, 1, 8, 8, 8, 1, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 0, 1, 8, 1, 1, 1, 1, 1, 1, 1, 8, 1, 0, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 1, 8, 1, 0, 0, 3, 0, 0, 1, 8, 1, 0, 0, 0, 0, 0],

        [2, 2, 2, 2, 2, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2],

        [0, 0, 0, 0, 0, 1, 8, 5, 0, 0, 0, 0, 0, 1, 8, 1, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 0, 1, 8, 1, 1, 1, 1, 1, 1, 1, 8, 1, 0, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 1, 8, 1, 8, 8, 8, 8, 8, 1, 8, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 1, 1, 0],
        [0, 1, 8, 8, 8, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 8, 8, 8, 1, 0],
        [0, 1, 1, 8, 1, 1, 8, 1, 8, 8, 8, 8, 8, 1, 8, 1, 1, 8, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 8, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 8, 8, 8, 8, 8, 8, 1, 8, 1, 8, 8, 8, 8, 8, 8, 1, 1, 0],
        [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
const player = document.createElement("div");

random_stone();
let vitessePlayer = 250;
game.append(player);
player.id = "player";

let taille = Math.ceil(game.offsetHeight / 21) - 1;
console.log(taille);

let stylePlayer = player.style;
let iPlayer = parseInt((player.offsetTop) / taille),
    jPlayer = parseInt((player.offsetLeft) / taille);

let jBomb = 0,
    iBomb = 0;

let nbrBomb = 1,
    puissance = 1;

let turnExplosion = 0,
    turnExplosionMob = 0;

let firstmove = false;
lastMove = "Bot";
stylePlayer.transition = (vitessePlayer / 1000) + "s";

let characters = [{ "name": "player", "life": 3 }];
let nbrMobs = 0,
    nbrMobsDead = 0;

for (let i = 1; i <= 4; i++) {
    const mob = document.createElement("div");
    mob.className = "mobs";
    mob.id = "mob" + i;
    mob.style.transition = (250 / 1000) + "s";
    game.append(mob);

    nbrMobs++;
    characters.push({ "name": "mob" + i, "onLife": true, "deleted": false, "lastMove": "none", "orientation": "right" })
}

let mobDestruction = setInterval(() => {
    for (let i = 1; i < characters.length; i++) {
        if (characters[i]["deleted"] === false) {
            const mobs = document.getElementById("mob" + i);
            if (characters[i]["onLife"] === false) {
                characters[i]["deleted"] = true;
                console.log("coucou");
                nbrMobsDead++;
                mobs.remove();
            }
        }
    }
}, 50);

let playerOnMob = setInterval(() => {
    for (let i = 1; i < characters.length; i++) {
        if (characters[i]["onLife"] === true) {
            const mobs = document.getElementById("mob" + i);
            let iMobs = parseInt((mobs.offsetTop) / taille),
                jMobs = parseInt((mobs.offsetLeft) / taille);

            if (iPlayer === iMobs && jPlayer === jMobs) {
                damageByMob();
            }
        }
    }
}, 50);

const divDefeat = document.createElement("div");
divDefeat.append("DEFAITE !");
divDefeat.id = "end";

const divVictory = document.createElement("div");
divVictory.append("VICTOIRE !");
divVictory.id = "end";

let dead = setInterval(() => {
    if (characters[0]['life'] <= 0) {
        clearInterval(playerOnMob),
        clearInterval(mobDestruction),
        clearInterval(moveMob);

        game.remove();
        section.append(divDefeat);
        clearInterval(dead);
    }

    if (nbrMobsDead === 4) {
        clearInterval(playerOnMob),
        clearInterval(mobDestruction),
        clearInterval(moveMob);

        game.remove();
        section.append(divVictory);
        clearInterval(dead);
    }
}, 50);

document.addEventListener("keydown", e => {
    if (firstmove === false) {
        moveMob = setInterval(() => {
            randomMove();
        }, 750);
    }
    firstmove = true;

    let keyCode = e.key;
    const divTop1 = document.getElementById("block_i" + (iPlayer - 1) + "_j" + jPlayer),
        divBot1 = document.getElementById("block_i" + (iPlayer + 1) + "_j" + jPlayer),
        divLeft1 = document.getElementById("block_i" + iPlayer + "_j" + (jPlayer - 1)),
        divRight1 = document.getElementById("block_i" + iPlayer + "_j" + (jPlayer + 1));
    console.log(divTop1.classList.value)

    switch (keyCode) {

        case "ArrowUp":
        case "z":
            stylePlayer.transition = (200 / 1000) + "s";
            if ((plateau[iPlayer - 1][jPlayer] === 1 || plateau[iPlayer - 1][jPlayer] === 2 || plateau[iPlayer - 1][jPlayer] === 3) && divTop1.classList.value !== "block in bombe") {
                iPlayer--;
            }
            lastMove = "Top";
            break;

        case "ArrowDown":
        case "s":
            stylePlayer.transition = (200 / 1000) + "s";
            if ((plateau[iPlayer + 1][jPlayer] === 1 || plateau[iPlayer + 1][jPlayer] === 2) && divBot1.classList.value !== "block in bombe") {
                iPlayer++;
            }
            lastMove = "Bot";
            break;

        case "ArrowLeft":
        case "q":
            stylePlayer.transition = (200 / 1000) + "s";
            if ((plateau[iPlayer][jPlayer - 1] === 1 || plateau[iPlayer][jPlayer - 1] === 2) && divLeft1.classList.value !== "block in bombe") {
                jPlayer--;
            } else if (iPlayer == 10 && jPlayer === 0) {
                stylePlayer.display = "none";
                setTimeout(function () { stylePlayer.display = "initial" }, vitessePlayer + 100);
                jPlayer = 20;
            }
            stylePlayer.backgroundImage = "url(assets/img/Carapuce.gif)";
            lastMove = "Left";
            break;

        case "ArrowRight":
        case "d":
            stylePlayer.transition = (200 / 1000) + "s";
            if ((plateau[iPlayer][jPlayer + 1] === 1 || plateau[iPlayer][jPlayer + 1] === 2) && divRight1.classList.value !== "block in bombe") {
                jPlayer++;
            } else if (iPlayer === 10 && jPlayer === 20) {
                stylePlayer.display = "none";
                setTimeout(function () { stylePlayer.display = "initial" }, vitessePlayer + 100);
                jPlayer = 0;
            }
            stylePlayer.backgroundImage = "url(assets/img/Carapuce_bis.gif)";
            lastMove = "Right";
            break;

        case " ":
            turnExplosion = 0, turnExplosionMob = 0;
            if (nbrBomb !== 0) {
                const bombe = document.querySelector("#block_i" + iPlayer + "_j" + jPlayer);
                nbrBomb -= 1;
                bombe.classList.add("bombe");
                iBomb = iPlayer;
                jBomb = jPlayer;

                setTimeout(function () {
                    bombe.classList.remove("bombe");

                    for (let i = 1; i <= puissance; i++) {
                        const divTop = document.getElementById("block_i" + (iBomb - i) + "_j" + jBomb);

                        if (plateau[iBomb - i][jBomb] === 1 || plateau[iBomb - i][jBomb] === 2 || plateau[iBomb - i][jBomb] === 5) {
                            if (plateau[iBomb - i][jBomb] === 5) {
                                plateau[iBomb - i][jBomb] = 1;
                                divTop.classList.remove("stone");
                                divTop.classList.add("in");
                                i = puissance;
                            }
                            divTop.style.backgroundColor = "orangered";
                            setTimeout(function () {
                                if (plateau[iBomb - i][jBomb] === 2) {
                                    divTop.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
                                } else {
                                    divTop.style.backgroundColor = "rgb(230,230,230)";
                                }
                            }, 1000);



                            if (plateau[iBomb - i][jBomb] !== 1 && plateau[iBomb - i][jBomb] !== 2) {
                                i = puissance;
                            }
                        }

                        for (let i = 1; i <= puissance; i++) {
                            const divBot = document.getElementById("block_i" + (iBomb + i) + "_j" + jBomb);
                            if (plateau[iBomb + i][jBomb] === 1 || plateau[iBomb + i][jBomb] === 2 || plateau[iBomb + i][jBomb] === 5) {
                                if (plateau[iBomb + i][jBomb] === 5) {
                                    plateau[iBomb + i][jBomb] = 1;
                                    divBot.classList.remove("stone");
                                    divBot.classList.add("in");
                                    i = puissance;
                                }

                                divBot.style.backgroundColor = "orangered";
                                setTimeout(function () {
                                    if (plateau[iBomb + i][jBomb] === 2) {
                                        divBot.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
                                    } else {
                                        divBot.style.backgroundColor = "rgb(230,230,230)";
                                    }
                                }, 1000);
                            }

                            if (plateau[iBomb + i][jBomb] !== 1 && plateau[iBomb + i][jBomb] !== 2) {
                                i = puissance;
                            }
                        }

                        for (let i = 1; i <= puissance; i++) {
                            const divLeft = document.getElementById("block_i" + iBomb + "_j" + (jBomb - i));
                            if (plateau[iBomb][jBomb - i] === 1 || plateau[iBomb][jBomb - i] === 2 || plateau[iBomb][jBomb - i] === 5) {
                                if (plateau[iBomb][jBomb - i] === 5) {
                                    plateau[iBomb][jBomb - i] = 1;
                                    divLeft.classList.remove("stone");
                                    divLeft.classList.add("in");
                                    i = puissance;
                                }

                                divLeft.style.backgroundColor = "orangered";
                                setTimeout(function () {
                                    if (plateau[iBomb][jBomb - i] === 2) {
                                        divLeft.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
                                    } else {
                                        divLeft.style.backgroundColor = "rgb(230,230,230)";
                                    }
                                }, 1000);
                            }

                            if (plateau[iBomb][jBomb - i] !== 1 && plateau[iBomb][jBomb - i] !== 2) {
                                i = puissance;
                            }
                        }

                        for (let i = 1; i <= puissance; i++) {
                            const divRight = document.getElementById("block_i" + iBomb + "_j" + (jBomb + i));
                            if (plateau[iBomb][jBomb + i] === 1 || plateau[iBomb][jBomb + i] === 2 || plateau[iBomb][jBomb + i] === 5) {
                                if (plateau[iBomb][jBomb + i] === 5) {
                                    plateau[iBomb][jBomb + i] = 1;
                                    divRight.classList.remove("stone");
                                    divRight.classList.add("in");
                                    i = puissance;
                                }

                                divRight.style.backgroundColor = "orangered";
                                setTimeout(function () {
                                    if (plateau[iBomb][jBomb + i] === 2) {
                                        divRight.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
                                    } else {
                                        divRight.style.backgroundColor = "rgb(230,230,230)";
                                    }

                                }, 1000);
                            }

                            if (plateau[iBomb][jBomb] === 1 || plateau[iBomb][jBomb] === 2) {
                                bombe.style.backgroundColor = "orangered";
                                setTimeout(function () {
                                    if (plateau[iBomb][jBomb] === 2) {
                                        bombe.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
                                    } else {
                                        bombe.style.backgroundColor = "rgb(230,230,230)";
                                    }
                                }, 1000);
                            }

                            if (plateau[iBomb][jBomb + i] !== 1 && plateau[iBomb][jBomb + i] !== 2) {
                                i = puissance;
                            }
                        }

                        let damagePlayer = setInterval(() => {
                            damageOnPlayer();

                            if (turnExplosion === 150) {
                                clearInterval(damagePlayer);
                            }
                        }, 10);

                        let damageMob = setInterval(() => {
                            damageOnMob();

                            if (turnExplosionMob === 150) {
                                clearInterval(damageMob);
                            }
                        }, 10);
                    }
                    nbrBomb = 1;
                }, 3000);

            }
        default:
            break;
    }

    console.log(iPlayer, jPlayer);

    setTimeout(function () { stylePlayer.top = String(iPlayer * (100 / 21)) + '%' }, vitessePlayer);
    setTimeout(function () { stylePlayer.left = String(jPlayer * (100 / 21)) + '%' }, vitessePlayer);


})

for (let i = 0; i < plateau.length; i++) {
    for (let j = 0; j < plateau[i].length; j++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("block");
        newDiv.id = "block_i" + i + "_j" + j;
        game.append(newDiv);

        switch (plateau[i][j]) {
            case 0:
            case 8:
                newDiv.classList.add("wall");
                break;
            case 1:
                newDiv.classList.add("in");
                break;
            case 2:
            case 3:
                newDiv.classList.add("onlyPlayer");
                break;
            case 4:
                newDiv.classList.add("spawn");
                break;
            case 5:
                newDiv.classList.add("stone");
                break;
            default:
                newDiv.classList.add("out");
                break;
        }
    }
}
