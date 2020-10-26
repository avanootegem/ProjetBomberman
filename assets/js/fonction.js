function rand() {
    return Math.floor(Math.random() * 3);
}

function random_stone () {
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
