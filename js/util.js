
//returns random number between min to max
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Returns the empty places of the game board  in array
function getEmptyPlaces(board) {
    var emptyPlaces = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            if (!cell.isShown && !cell.isMine && !cell.isMarked) {
                if (gStartLoc.i !== i && gStartLoc.j !== j) {
                    emptyPlaces.push({ i, j })
                }
            }
        }//END FOR
    }//END FOR
    return emptyPlaces
}

/** get element of cell by position (object {i, j})*/
function getElCellByPos(pos) {
    var elNameclass = '.cell-' + pos.i + '-' + pos.j//Name class of the element
    return document.querySelector(elNameclass)
}

/* Get milliseconds - time and returns string of time by the format 00:00 (mm:ss) */
function milToFormatTime(time) {
    var s = Math.floor((time / 1000) % 60)//seconds
    var m = Math.floor(time / (1000 * 60))//minutes
    //Add '0' before the number if is one-digit number
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    return m + ":" + s;
}//End milToFormatTime function

function showHideElement(elementClass) {
    var el = document.querySelector('.' + elementClass)
    if (!el) {
        console.log('Function showHideElement: "Element not founded"')
        return
    }
    el.classList.toggle('btn-hide')
}

//Helper for "closeCell" and "OpenCell" functions
function removeAddShown(board, i, j) {
    var elCell = getElCellByPos({ i, j })
    //Show/Hide the cell
    board[i][j].isShown = !board[i][j].isShown
    elCell.classList.toggle('shown')
}
//Close cell
function closeCell(board, i, j) {
    removeAddShown(board, i, j)
    gGame.shownCount--
}
//Open cell
function openCell(board, i, j) {
    removeAddShown(board, i, j)
    var cell = board[i][j]
    if (cell.isMarked && !cell.isMine) {
        renderCell(i, j, CROSS)
    } else if (cell.isMarked && cell.isMine) {
        renderCell(i, j, V)
    }
    else if (cell.isMine) {
        renderCell(i, j, MINE)
    } else if (board[i][j].minesAroundCount > 0) {
        renderCell(i, j, board[i][j].minesAroundCount)
    }
    if (!gIsManuallyModOn) gGame.shownCount++
}
function openAllCells() {
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i]
        for (var j = 0; j < row.length; j++) {
            if (!row[j].isShown) openCell(gBoard, i, j)
        }
    }
}


function getValueCellByPos(i, j) {
    var cell = gBoard[i][j]
    if (cell.isMine) return MINE
    if (cell.isMarked) return MARK
    return EMPTY
}

function renderCell(i, j, value) {
    var elCell = getElCellByPos({ i, j })
    elCell.innerText = value
}
function renderElement(callsName, value) {
    var el = document.querySelector('.' + callsName)
    el.innerText = value
}
