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

class Mobs {
    constructor (iMobs, jMobs, name) {
        this.iMobs = iMobs;
        this.jMobs = jMobs;
        this.name = name;
        this.onLife = true;
    }

    
}

function canGoTop(mobs) {
    let iMobs = parseInt(mobs.offsetTop / 38),
        jMobs = parseInt(mobs.offsetLeft / 38);

    if (plateau[iMobs - 1][jMobs] === 1 || plateau[iMobs - 1][jMobs] === 4) {
        return true;
    } else {
        return false;
    }
}

function canGoBot(mobs) {
    let iMobs = parseInt(mobs.offsetTop / 38),
        jMobs = parseInt(mobs.offsetLeft / 38);

    if (plateau[iMobs + 1][jMobs] === 1 || plateau[iMobs + 1][jMobs] === 4) {
        return true;
    } else {
        return false;
    }
}

function canGoLeft(mobs) {
    let iMobs = parseInt(mobs.offsetTop / 38),
        jMobs = parseInt(mobs.offsetLeft / 38);

    if (plateau[iMobs][jMobs - 1] === 1 || plateau[iMobs][jMobs - 1] === 4) {
        return true;
    } else {
        return false;
    }
}

function canGoRight(mobs) {
    let iMobs = parseInt(mobs.offsetTop / 38),
        jMobs = parseInt(mobs.offsetLeft / 38);

    if (plateau[iMobs][jMobs + 1] === 1 || plateau[iMobs][jMobs + 1] === 4) {
        return true;
    } else {
        return false;
    }
}

function randomMove() {
    for (let i = 0; i < nbrMobs; i++) {
        let iMobs = parseInt(mob.offsetTop / 38),
            jMobs = parseInt(mobs.offsetLeft / 38);
        if (canGoTop(mobs) || canGoBot(mobs) || canGoLeft(mobs) || canGoRight(mobs)) {
            const go = getRandomArbitrary(1, 4);
            switch (go) {
                case 1:
                    iMobs--;
                    break;

                case 2:
                    iMobs++;
                    break;

                case 3:
                    jMobs--;
                    break;

                case 4:
                    jMobs++;
                    break;

                default:
                    break;
            }
            setTimeout(function () { mobs.top = String(iMobs * (100 / 21)) + '%' }, 300);
            setTimeout(function () { mobs.left = String(jMobs * (100 / 21)) + '%' }, 300);
        }
    }
}