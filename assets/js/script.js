const jeu = document.getElementById("gameboard");
let plateau =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],

        [2, 2, 2, 2, 2, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2],

        [0, 0, 0, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
const player = document.createElement("div");

random_stone();
let vitessePlayer = 250;
jeu.append(player);
player.id = "player";

console.log(player);
let stylePlayer = player.style;
let jPlayer = parseInt(player.offsetLeft / 38),
    iPlayer = parseInt(player.offsetTop / 38);

let jBomb = 0,
    iBomb = 0;

stylePlayer.transition = (200 / 1000) + "s";

document.addEventListener("keydown", e => {
    let keyCode = e.key;
    const divTop = document.getElementById("block_i" + (iPlayer - 1) + "_j" + jPlayer);
    console.log(divTop.classList.value)

    switch (keyCode) {
        case "ArrowUp":
        case "z":
            if ((plateau[iPlayer - 1][jPlayer] === 1 || plateau[iPlayer - 1][jPlayer] === 2 || plateau[iPlayer - 1][jPlayer] === 3) && divTop.classList.value !== "block in bombe") {
                iPlayer--;
            }
            break;

        case "ArrowDown":
        case "s":
            if (plateau[iPlayer + 1][jPlayer] === 1 || plateau[iPlayer + 1][jPlayer] === 2) {
                iPlayer++;
            }
            break;

        case "ArrowLeft":
        case "q":
            if (plateau[iPlayer][jPlayer - 1] === 1 || plateau[iPlayer][jPlayer - 1] === 2) {
                jPlayer--;
            } else if (iPlayer == 10 && jPlayer === 0) {
                stylePlayer.display = "none";
                setTimeout(function () { stylePlayer.display = "initial" }, vitessePlayer);
                jPlayer = 20;
            }
            break;

        case "ArrowRight":
        case "d":
            if (plateau[iPlayer][jPlayer + 1] === 1 || plateau[iPlayer][jPlayer + 1] === 2) {
                jPlayer++;
            } else if (iPlayer === 10 && jPlayer === 20) {
                stylePlayer.display = "none";
                setTimeout(function () { stylePlayer.display = "initial" }, vitessePlayer);
                jPlayer = 0;
            }
            break;

        case " ":
            const bombe = document.querySelector("#block_i" + iPlayer + "_j" + jPlayer);
            bombe.classList.add("bombe");
            iBomb = iPlayer;
            jBomb = jPlayer;

            setTimeout(function () {
                bombe.classList.remove("bombe");
                const divTop = document.getElementById("block_i" + (iBomb - 1) + "_j" + jBomb);
                const divBot = document.getElementById("block_i" + (iBomb + 1) + "_j" + jBomb);
                const divLeft = document.getElementById("block_i" + iBomb + "_j" + (jBomb - 1));
                const divRight = document.getElementById("block_i" + iBomb + "_j" + (jBomb + 1));

                if (plateau[iBomb - 1][jBomb] === 1 || plateau[iBomb - 1][jBomb] === 5) {
                    if (plateau[iBomb - 1][jBomb] === 5) {
                        plateau[iBomb - 1][jBomb] = 1;
                        divTop.classList.remove("stone");
                        divTop.classList.add("in");
                    }
                    divTop.style.backgroundColor = "orangered";
                    setTimeout(function () {
                        divTop.style.backgroundColor = "rgb(215,215,215)";
                    }, 1000);
                }

                if (plateau[iBomb + 1][jBomb] === 1 || plateau[iBomb + 1][jBomb] === 5) {
                    if (plateau[iBomb + 1][jBomb] === 5) {
                        plateau[iBomb + 1][jBomb] = 1;
                        divBot.classList.remove("stone");
                        divBot.classList.add("in");
                    }

                    divBot.style.backgroundColor = "orangered";
                    setTimeout(function () {
                        divBot.style.backgroundColor = "rgb(215,215,215)";
                    }, 1000);
                }

                if (plateau[iBomb][jBomb - 1] === 1 || plateau[iBomb][jBomb - 1] === 5) {
                    if (plateau[iBomb][jBomb - 1] === 5) {
                        plateau[iBomb][jBomb - 1] = 1;
                        divLeft.classList.remove("stone");
                        divLeft.classList.add("in");
                    }

                    divLeft.style.backgroundColor = "orangered";
                    setTimeout(function () {
                        divLeft.style.backgroundColor = "rgb(215,215,215)";
                    }, 1000);
                }

                if (plateau[iBomb][jBomb + 1] === 1 || plateau[iBomb][jBomb + 1] === 5) {
                    if (plateau[iBomb][jBomb + 1] === 5) {
                        plateau[iBomb][jBomb + 1] = 1;
                        divRight.classList.remove("stone");
                        divRight.classList.add("in");
                    }

                    divRight.style.backgroundColor = "orangered";
                    setTimeout(function () {
                        divRight.style.backgroundColor = "rgb(215,215,215)";
                    }, 1000);
                }

                if (plateau[iBomb][jBomb] === 1) {
                    bombe.style.backgroundColor = "orangered";
                    setTimeout(function () {
                        bombe.style.backgroundColor = "rgb(215,215,215)";
                    }, 1000);
                }


            }, 3000);

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
        jeu.append(newDiv);

        switch (plateau[i][j]) {
            case 0:
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