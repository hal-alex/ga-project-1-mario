function init () {

    //Elements

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 10
    let numOfCols = 10
    let numOfDivs = numOfRows * numOfCols

    // Array of divs is a total number of divs in the grid, these divs contain classes, which are linked to CSS
    let arrayOfDivs = []

    // terrainDivs is an array containing the numbers that represent divs that have .ground
    let terrainDivs = [40, 41, 42, 43, 44, 45, 46, 99, 98, 97, 96, 95, 94, 93]

    // pointsBlockDivs is an array containing the numbers that represent divs that have .points 
    let pointsBlockDivs = [13, 63, 65, ]

    // this is Mario's starting position
    let startingPosition = 31
    // when Mario ends in this position, then he "wins" the game
    let winningPosition = 80

    // we update Mario's position as he moves 
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let deleteBut = document.querySelector(".delete")

    let divContainer = document.querySelector(".div-container")

    let marioClass = "mario"
    let marioJump = "jump"
    let marioLeft = "left"
    let amountOfLives = 4
    let score = 0
    let scoreSpan = document.getElementById("scorespan")
    // Array containing starting positions of Goombas (enemies) 
    let goombaLocations = [35, 84, 88]

    // This makes the gravityInterval variable global and can be reassigned when the interval is initiated

    let gravityInterval

    //Execution

    // This function generates the Goombas in the initial position (taken from goombaLocations)
    function generateGoombas () {
        
        for (let i in arrayOfDivs) {
            if (goombaLocations.includes(parseFloat(arrayOfDivs[i].id)))
            arrayOfDivs[i].classList.add("goomba")
        }
    }

    // This function generates -1 or 1 to give Goombas horizontal movement 
    function generateRandomMovements() {
        return Math.random() < 0.5 ? -1 : 1
    }

    // This function checks for the amount of lives left, if lives are 0, then game is over
    function marioGetHit() {
        removeMario(currentPosition)
        currentPosition = startingPosition
        addMario(startingPosition)
        if (amountOfLives === 0) {
            console.log("game over")
        } else if (amountOfLives > 0) {
            amountOfLives -= 1
            console.log(amountOfLives)
        }
    }

    // This function loops through all the goombas, assigns them random movement points and checks if another Goomba class is in that div. It also checks if Mario is in that div, if so, it removes a life 
    function moveEnemies() {
        setInterval(() => {
            let goombaArray = document.querySelectorAll(".goomba")
            let randomNumber = generateRandomMovements()
            for (let i = 0; i < goombaArray.length; i++) {
                let updatedLocation = parseInt(goombaArray[i].id) + randomNumber
                if (arrayOfDivs[updatedLocation + numOfRows].classList.contains("ground")) {
                    if (!arrayOfDivs[updatedLocation +1 ].classList.contains("goomba") 
                    || !arrayOfDivs[updatedLocation - 1].classList.contains("goomba")) {
                        if (arrayOfDivs[updatedLocation].classList.contains("mario")) {
                            console.log("hit")
                            marioGetHit()
                        }
                        goombaArray[i].classList.remove("goomba")
                        arrayOfDivs[updatedLocation].classList.add("goomba")
                    }
                }
            }
        }, 2000)
    }

    // This function checks if Mario is on top of a Goomba 
    function checkCollisionTop() {
        let goombaArray2 = Array.from(document.querySelectorAll(".goomba")) 
        for (let e in goombaArray2) {
            if (parseInt(goombaArray2[e].id) - numOfRows  === currentPosition) {
                arrayOfDivs[goombaArray2[e].id].classList.remove("goomba")
                score += 200
                scoreSpan.innerHTML = score
            }
        }
    }

    // This function loops through the points blocks and checks if Mario has hit them 
    function scorePoints () {
        let pointsArray = Array.from(document.querySelectorAll(".points-block")) 
        for (let i in pointsArray) {
            if (parseInt(pointsArray[i].id) === currentPosition) {
                console.log("block hit")
                console.log(arrayOfDivs[pointsArray[i].id].classList)

                setTimeout(() => {
                    arrayOfDivs[pointsArray[i].id - numOfRows].classList.remove("coin-spinning")
                }, 1500);
                score += 100
                scoreSpan.innerHTML = score
                arrayOfDivs[pointsArray[i].id - numOfRows].classList.add("coin-spinning")
                arrayOfDivs[pointsArray[i].id].classList.remove("points-block")
                arrayOfDivs[pointsArray[i].id].classList.add("empty-points-block")
            }
        }
    }

    // This function makes Mario go down by one row until "ground" is below him 
    function marioGravity () {
        clearInterval(gravityInterval)
        document.body.classList.add("jump")
        gravityInterval = setInterval(() => {
            if (!arrayOfDivs[currentPosition + numOfRows].classList.contains("ground")) {
                removeMario(currentPosition)
                currentPosition += numOfRows

                checkCollisionTop()
                addMario(currentPosition)
            } else {
                document.body.classList.remove("jump")
                console.log("ground below")
                checkCollisionTop()
                clearInterval(gravityInterval)
            }
        }, 250);
    
    }

    // This function creates the grid full of divs, assigns classes to some divs that match the criteria of being in another array
    function createDivGrid() {
        for (let i = 0; i < numOfDivs; i++) {
            let div = document.createElement("div")
            div.id = i
            if (terrainDivs.includes(i)) {
                div.classList.add("ground")
            }
            if (pointsBlockDivs.includes(i)) {
                div.classList.add("points-block")
            }
            divContainer.appendChild(div)
            arrayOfDivs.push(div)
        }
        
        addMario(startingPosition, marioClass)
        
    }

    // This function takes marioClass and assigns it to a div at a certain location
    function addMario (position) {
        arrayOfDivs[position].classList.add(marioClass)

    }

    // This deletes the div grid - used for testing purposes 
    function deleteDivContainer () {
        divContainer.remove()
    }

    // This function removes marioClass from a div at a specific location
    function removeMario(position){
        arrayOfDivs[position].classList.remove(marioClass)
      }

    // This function controls the movement of Mario 
    function marioMovement(event) {
    // Save the keys for each direction
        const keyCode = event.keyCode
        const up = 38
        const down = 40
        const left = 37
        const right = 39

        removeMario(currentPosition)

        // Check the keyCode on the event and match with the direction
        if(up === keyCode) {
            console.log("ARROW UP")
            currentPosition -= numOfRows
            addMario(currentPosition)
            marioGravity()
            checkCollisionTop() 
            // addMario(currentPosition, marioJump)
            
        } else if (down === keyCode && 
            !document.getElementById(`${currentPosition + numOfRows}`).classList.contains("ground")){
            console.log("ARROW DOWN")
            currentPosition += numOfRows
            marioGravity ()
            addMario(currentPosition)
            checkCollisionTop() 
                
        } else if (left === keyCode){
            console.log("ARROW LEFT")
            currentPosition -= 1
            if (arrayOfDivs[currentPosition].classList.contains("goomba")) {
                marioGetHit()
            }
            document.body.classList.add(marioLeft)
            addMario(currentPosition)
            marioGravity ()
            checkCollisionTop() 
        } else if (right === keyCode){
            console.log("ARROW RIGHT")
            currentPosition += 1
            if (arrayOfDivs[currentPosition].classList.contains("goomba")) {
                marioGetHit()
            }
            document.body.classList.remove(marioLeft)
            addMario(currentPosition)
            marioGravity ()
            checkCollisionTop() 
        } else {
            console.log("ACTION NOT FOUND")
        }
        scorePoints ()
        
    }


    //Events

    createDivGrid()

    document.addEventListener("keydown", marioMovement)

    deleteBut.addEventListener("click", deleteDivContainer)

    moveEnemies()

    generateGoombas()

}

window.addEventListener('DOMContentLoaded', init)