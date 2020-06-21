/**
 * Initializes and starts the web app.
 */

var l_canvas = null

var whitemode = true

letters = []
numbers = []

rand_letter = "b"
rand_number = 1
squares = 4

board_size = 600

correct = 0
incorrect = 0

function getNewRandomPos() {


    label_canvas = document.getElementById('label');

    label_canvas.width = 500;
    label_canvas.height = 150;

    // Print text on the canvas.
    var label_context = label_canvas.getContext('2d');
    label_context.font = 'bold 40px "Times New Roman", Times, serif';
    //label_context.fillStyle = "red";

    var newx = letters[Math.floor(Math.random() * letters.length)]
    var newy = numbers[Math.floor(Math.random() * numbers.length)]

    label_context.fillText(newx + newy, 10, 50)

    rand_letter = newx
    rand_number = newy

    return [newx, newy]
}

function assignStuff(l_context) {

    l_context.clearRect(0, 0, board_size + 50, board_size + 50);

    letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    numbers = [8, 7, 6, 5, 4, 3, 2, 1]

    if (!whitemode) {
        letters = letters.reverse()
        numbers = numbers.reverse()
    }


    getNewRandomPos()


    drawBgImg(l_context, drawGrid);
    //drawGrid(l_context)




}

function changeLevel() {

    var e = document.getElementById("s_level")
    squares = e.options[e.selectedIndex].value;

    reset()
    assignStuff(label_canvas = document.getElementById('canvas').getContext("2d"))
}

function reset() {
    correct = 0
    incorrect = 0

    getNewRandomPos()
    drawNewState(document.getElementById('label').getContext("2d"), correct, incorrect)
}

function flipBoard() {
    whitemode = !whitemode
    reset()
    assignStuff(label_canvas = document.getElementById('canvas').getContext("2d"))
}

function drawNewState(ctx, correct, incorrect) {
    ctx.fillStyle = "green"
    ctx.fillText(correct, 0, 100)
    ctx.fillStyle = "red"
    ctx.fillText(incorrect, 50, 100)

}

function drawGrid(ctx) {
    //draw lines

    dist = 8 / Math.sqrt(squares)

    gap = board_size / 8


    for (ix = 0; ix <= 8; ix += dist) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5

        ctx.beginPath();
        ctx.moveTo(ix * gap, 0)
        ctx.lineTo(ix * gap, board_size)
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(0, ix * gap)
        ctx.lineTo(board_size, ix * gap)
        ctx.stroke()
    }

}

function drawBgImg(l_context, onload) {

    let bgImg = new Image();
    bgImg.src = 'chess.png';
    bgImg.onload = () => {
        gap = board_size / 8

        l_context.drawImage(bgImg, 0, 0, board_size, board_size);

        l_context.font = 'bold 40px "Times New Roman", Times, serif';

        for (i = 0; i < 8; i++) {
            l_context.fillText(numbers[i], board_size, i * gap + gap * .62);
        }

        for (i = 0; i < 8; i++) {
            l_context.fillText(letters[i], i * gap + 50, board_size + gap * .3);
        }

        onload(l_context)

    }
}

function evalHits(xclick, yclick, squares) {
    distance = 8 / Math.sqrt(squares)
    xtarget = letters.indexOf(rand_letter)
    ytarget = numbers.indexOf(rand_number)
    /*
        7,8,2
    */
    //alert("R: "+rand_letter+" "+rand_number)

    clickSquareX = Math.floor(xclick / distance)
    clickSquareY = Math.floor(yclick / distance)

    targetSquareX = Math.floor(xtarget / distance)
    targetSquareY = Math.floor(ytarget / distance)

    //alert(clickSquareX+" "+clickSquareY+" "+targetSquareX+" "+targetSquareY)

    getNewRandomPos()


    return clickSquareX == targetSquareX && clickSquareY == targetSquareY

}

(function () {


    var w = window.innerWidth;
    var h = window.innerHeight;

    board_size = 400

    if (h > 700)
        board_size = 600

    if (h > 900)
        board_size = 800

    if (h > 1100)
        board_size = 1000

    // Initialize the canvas.
    l_canvas = document.getElementById('canvas');

    l_canvas.width = board_size + 50;
    l_canvas.height = board_size + 50;

    // Print text on the canvas.
    var l_context = l_canvas.getContext('2d');


    assignStuff(l_context)
    gap = board_size / 8

    l_canvas.addEventListener('click', function (event) {
        elemLeft = l_canvas.offsetLeft + l_canvas.clientLeft
        elemTop = l_canvas.offsetTop + l_canvas.clientTop
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;


        scaled_x = parseInt(x / gap)
        scaled_y = parseInt(y / gap)





        answer = evalHits(scaled_x, scaled_y, squares)
        if (answer) {
            correct += 1
        }
        else {
            incorrect += 1
        }


        drawNewState(document.getElementById('label').getContext("2d"), correct, incorrect)

        //alert(letters[scaled_x]+" "+numbers[scaled_y])

    }, false);

}());