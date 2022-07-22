function init () {

    // To do list
    // Start button - link the functions to the start button so everything starts working when start is licked
    // Restart button - link it to the functions and reset the variables to default values
    // Map 
    // Controls 
    // Arrow left - prevent Mario going off the edge of the map
    // Arrow right - prevent Mario going off the edge of the map
    // Arrow up - prevent Mario going off the top of the map or into the ground blocks
    // Sound 
    // Start theme music when the start button is clicked
    // Add jumping music when jump is pressed
    // Add points music when a point is scored
    // Add "lost a life" clip when he loses a life 
    // Add winning music when the game is over
    // Restart button - theme music restarts 
    // Goombas - replace them with animations
    // Download all the images to local  
    // When game ends, bring up a popup and offer the user to try again 

    //Elements

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 15
    let numOfCols = 15
    let numOfDivs = numOfRows * numOfCols

    // Array of divs is a total number of divs in the grid, these divs contain classes, which are linked to CSS
    let arrayOfDivs = []

    // terrainDivs is an array containing the numbers that represent divs that have .ground
    let terrainDivs = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224 ]

    // pointsBlockDivs is an array containing the numbers that represent divs that have .points 
    let pointsBlockDivs = [18, 23, 91, 95, 99, 179, 173, 168]

    // this is Mario's starting position
    let startingPosition = 46
    // when Mario ends in this position, then he "wins" the game
    let winningPosition = 80

    // we update Mario's position as he moves 
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let divContainer = document.querySelector(".div-container")

    let livesSpan = document.getElementById("life-hearts")

    let marioClass = "mario"
    let marioJump = "jump"
    let marioLeft = "left"
    let amountOfLives = 3
    let score = 0
    let scoreSpan = document.getElementById("score-span")
    // Array containing starting positions of Goombas (enemies) 
    let goombaLocations = [52, 49, 125, 129, 133, 197, 200, 203, 206   ]

    // This makes the gravityInterval variable global and can be reassigned when the interval is initiated
    let gravityInterval

    //This 
    let winningBlock = "winning-block"
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
            livesSpan.innerHTML = "❤️".repeat(amountOfLives)
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
                    || !arrayOfDivs[updatedLocation - 1].classList.contains("goomba")
                    // || !arrayOfDivs[updatedLocation - 1].classList.contains(winningBlock)
                    ) {
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
                checkWinningBlock ()
            } else {
                document.body.classList.remove("jump")
                console.log("ground below")
                checkCollisionTop()
                checkWinningBlock ()
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
        
        arrayOfDivs[arrayOfDivs.length - numOfRows -1].classList.add(winningBlock)

        addMario(startingPosition, marioClass)
        
    }

    // This function takes marioClass and assigns it to a div at a certain location
    function addMario (position) {
        arrayOfDivs[position].classList.add(marioClass)
    }

    // This function checks if Mario is at the winning block 
    function checkWinningBlock () {
        if (arrayOfDivs[currentPosition].classList.contains(winningBlock)) {
            console.log("you win")
        }
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
        if(up === keyCode && currentPosition >= numOfRows &&
            !document.getElementById(`${currentPosition - numOfRows}`).classList.contains("ground")) {
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
                
        } else if (left === keyCode && currentPosition % numOfRows !== 0 && !document.getElementById(`${currentPosition - 1}`).classList.contains("ground")){
            console.log("ARROW LEFT")
            currentPosition -= 1
            if (arrayOfDivs[currentPosition].classList.contains("goomba")) {
                marioGetHit()
            }
            document.body.classList.add(marioLeft)
            addMario(currentPosition)
            marioGravity ()
            checkCollisionTop() 
        } else if (right === keyCode && currentPosition % numOfRows !== numOfRows - 1 && !document.getElementById(`${currentPosition + 1}`).classList.contains("ground")){
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
            addMario(currentPosition)
        }
        scorePoints ()
        checkWinningBlock ()
    }


    //Events

    createDivGrid()

    document.addEventListener("keydown", marioMovement)

    moveEnemies()

    generateGoombas()

}

window.addEventListener('DOMContentLoaded', init)