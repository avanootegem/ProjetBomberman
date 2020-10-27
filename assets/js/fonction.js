function rand() {
    return Math.floor(Math.random() * 3);
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_stone() {
    for (let i = 0; i < plateau.length; i++) {
        for (let j = 0; j < plateau[i].length; j++) {
            if (plateau[i][j] === 1 && (!((j === 9 || j === 10 || j === 11) && i === 8))) {
                if (!(rand(plateau[i][j]))) {
                    plateau[i][j] = 5;
                }
            }
        }
    }
}

function canGoTop(mobs) {
    let iMobs = parseInt(mobs.offsetTop / taille),
        jMobs = parseInt(mobs.offsetLeft / taille);
    const divTopMob = document.getElementById("block_i" + (iMobs - 1) + "_j" + jMobs);

    if ((plateau[iMobs - 1][jMobs] === 1 || plateau[iMobs - 1][jMobs] === 4) && divTopMob.classList.value !== "block in bombe") {
        return true;
    } else {
        return false;
    }
}

function canGoBot(mobs) {
    let iMobs = parseInt(mobs.offsetTop / taille),
        jMobs = parseInt(mobs.offsetLeft / taille);
    const divBotMob = document.getElementById("block_i" + (iMobs + 1) + "_j" + jMobs);

    if ((plateau[iMobs + 1][jMobs] === 1 || plateau[iMobs + 1][jMobs] === 4) && divBotMob.classList.value !== "block in bombe") {
        return true;
    } else {
        return false;
    }
}

function canGoLeft(mobs) {
    let iMobs = parseInt(mobs.offsetTop / taille),
        jMobs = parseInt(mobs.offsetLeft / taille);
    const divLeftMob = document.getElementById("block_i" + iMobs + "_j" + (jMobs - 1));

    if ((plateau[iMobs][jMobs - 1] === 1 || plateau[iMobs][jMobs - 1] === 4) && divLeftMob.classList.value !== "block in bombe") {
        return true;
    } else {
        return false;
    }
}

function canGoRight(mobs) {
    let iMobs = parseInt(mobs.offsetTop / taille),
        jMobs = parseInt(mobs.offsetLeft / taille);
    const divRightMob = document.getElementById("block_i" + iMobs + "_j" + (jMobs + 1));

    if ((plateau[iMobs][jMobs + 1] === 1 || plateau[iMobs][jMobs + 1] === 4) && divRightMob.classList.value !== "block in bombe") {
        return true;
    } else {
        return false;
    }
}

function randomMove() {
    for (let i = 1; i <= nbrMobs; i++) {
        if (characters[i]["onLife"] === true) {
            const mobs = document.getElementById("mob" + i);
            let iMobs = parseInt(mobs.offsetTop / taille),
                jMobs = parseInt(mobs.offsetLeft / taille);

            if (!canGoTop(mobs) && !canGoBot(mobs) && !canGoLeft(mobs) && !canGoRight(mobs)) {

            } else if (characters[i]["lastMove"] === "top" && canGoTop(mobs) && !canGoLeft(mobs) && !canGoRight(mobs)) {
                iMobs--;
            } else if (characters[i]["lastMove"] === "bot" && canGoBot(mobs) && !canGoLeft(mobs) && !canGoRight(mobs)) {
                iMobs++;
            } else if (characters[i]["lastMove"] === "left" && canGoLeft(mobs) && !canGoTop(mobs) && !canGoBot(mobs)) {
                jMobs--;
            } else if (characters[i]["lastMove"] === "right" && canGoRight(mobs) && !canGoTop(mobs) && !canGoBot(mobs)) {
                jMobs++;
            } else {
                let deplacetoibatard = false;
                while (!deplacetoibatard) {
                    let move = getRandomArbitrary(1, 4);
                    switch (move) {
                        case 1:
                            if (canGoTop(mobs)) {
                                iMobs--;
                                characters[i]["lastMove"] = "top";
                                deplacetoibatard = true;
                            }
                            break;

                        case 2:
                            if (canGoBot(mobs)) {
                                iMobs++;
                                characters[i]["lastMove"] = "bot";
                                deplacetoibatard = true;
                            }
                            break;

                        case 3:
                            if (canGoLeft(mobs)) {
                                jMobs--;
                                characters[i]["lastMove"] = "left";
                                deplacetoibatard = true;
                            }
                            break;

                        case 4:
                            if (canGoRight(mobs)) {
                                jMobs++;
                                characters[i]["lastMove"] = "right";
                                deplacetoibatard = true;
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
            setTimeout(function () {
                mobs.style.top = String(iMobs * (100 / 21)) + '%';
                mobs.style.left = String(jMobs * (100 / 21)) + '%';

                mobs.style.transition = "0.2s, background 0s"
                if (characters[i]["orientation"] === "right") {
                    characters[i]["orientation"] = "left";
                    mobs.style.backgroundImage = "url(assets/img/mobs_bis.png)";
                } else {
                    characters[i]["orientation"] = "right";
                    mobs.style.backgroundImage = "url(assets/img/mobs.png)";
                }
            }, 400);
        }
    }
}

function damageByMob() {
    if (characters[0]["life"] !== 0) {
        iPlayer = 10, jPlayer = 10;
        characters[0]['life']--;

        stylePlayer.transition = "0s";
        stylePlayer.top = String(iPlayer * (100 / 21)) + '%';
        stylePlayer.left = String(jPlayer * (100 / 21)) + '%';

        setTimeout(() => {
            stylePlayer.transition = "0.2s";
        }, 50);
    }
}

function damageOnPlayer() {
    if (characters[0]["life"] !== 0) {
        const actualDiv = document.getElementById("block_i" + iPlayer + "_j" + jPlayer);
        if (actualDiv.style.backgroundColor === "orangered") {
            iPlayer = 10, jPlayer = 10;
            characters[0]['life']--;

            stylePlayer.transition = "0s";
            stylePlayer.top = String(iPlayer * (100 / 21)) + '%';
            stylePlayer.left = String(jPlayer * (100 / 21)) + '%';

            setTimeout(() => {
                stylePlayer.transition = "0.2s";
            }, 50);
        }
        turnExplosion++;
    }
}

function damageOnMob() {
    if (characters[0]["life"] !== 0) {
        for (let i = 1; i < characters.length; i++) {
            if (characters[i]["onLife"] === true) {
                const mobs = document.getElementById("mob" + i);
                let iMobs = parseInt(mobs.offsetTop / taille),
                    jMobs = parseInt(mobs.offsetLeft / taille);

                const actualDiv = document.getElementById("block_i" + iMobs + "_j" + jMobs);
                if (actualDiv.style.backgroundColor === "orangered") {
                    characters[i]["onLife"] = false;
                }
            }
        }
    }
}