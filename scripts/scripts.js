function init () {

    //Elements

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 10
    let numOfCols = 10
    let numOfDivs = numOfRows * numOfCols

    // Array of divs is a total number of divs in the grid, these divs contain classes, which are linked to CSS
    let arrayOfDivs = []

    // terrainDivs is an array containing the numbers that represent divs that have .ground
    let terrainDivs = [40, 41, 42, 43, 44, 45, 46, 89, 88, 87, 86, 85, 84, 83]

    // pointsBlockDivs is an array containing the numbers that represent divs that have .points 
    let pointsBlockDivs = [13]

    // this is Mario's starting position
    let startingPosition = 31

    // we update Mario's position as he moves 
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let deleteBut = document.querySelector(".delete")

    let divContainer = document.querySelector(".div-container")

    let marioClass = "mario"
    let marioJump = "mario-jump"
    let amountOfLives = 4

    // Array containing starting positions of Goombas (enemies) 
    let goombaLocations = [33, 74, 78]

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

    //This function assigns Goombas new coordinates where to go and replaces the arrayOfDivs with updates divs
    // function randomEnemyMovement () {
    //     setInterval(() => {
    //         let selectedDivs = document.querySelectorAll(".goomba")
    //         console.log(selectedDivs)
    //         for (let i = 0; i <= selectedDivs.length; i++) {
    //             let randomNum = generateRandomMovements()
    //             console.log("This is the random num =>", randomNum)
    //             let newCoordinate = parseInt(selectedDivs[i].id) 
    //             console.log("This is the new coordinate =>", newCoordinate)
    //             // This checks if the new position is on top of the ground class
    //             // console.log("Is new block above ground", arrayOfDivs[newCoordinate + numOfRows].classList.contains("ground"))
    //             // console.log("Block below new coord", newCoordinate + numOfRows)
    //             if (arrayOfDivs[newCoordinate + numOfRows].classList.contains("ground")) {
    //                 // In this statement, also check if this is going off the grid
    //                 selectedDivs[i].classList.remove("goomba")
    //                 arrayOfDivs[newCoordinate].classList.add("goomba")
    //             }} 
    //     }, 2000)
    // }

    function marioGetHit() {
        if (amountOfLives === 0) {
            console.log("game over")
        } else if (amountOfLives > 0) {
            amountOfLives -= 1
            console.log(amountOfLives)
        }
    }

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
        }, 20000)
    }

    function checkCollisionTop(keyCode) {
        let goombaArray2 = Array.from(document.querySelectorAll(".goomba")) 
        for (let e in goombaArray2) {
            if (parseInt(goombaArray2[e].id) - numOfRows  === currentPosition) {
                if (goombaArray2[e].id -  numOfRows == currentPosition) {
                    console.log("squash")
                }
            }
        }
            
    }

    // This function makes Mario go down by one row until "ground" is below him 
    function marioGravity () {
        while(!arrayOfDivs[currentPosition + numOfRows].classList.contains("ground")) {
            setTimeout(() => {
                removeMario(currentPosition)
                addMario(currentPosition + numOfRows)
            }, 2000);
        }

        
        
        // while (!arrayOfDivs[currentPosition + numOfRows].classList.contains("ground")) {
        //     console.log("Inside while loop", currentPosition)
        //     removeMario(currentPosition)
        //     currentPosition += numOfRows
        //     addMario(currentPosition)
           
        

    }

    // This function creates the grid full of divs, assigns classes to some divs that match the criteria of being in another array
    function createDivGrid() {
        for (let i = 0; i <= numOfDivs; i++) {
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
            // addMario(currentPosition, marioJump)
            
        } else if (down === keyCode && 
            !document.getElementById(`${currentPosition + numOfRows}`).classList.contains("ground")){
            console.log("ARROW DOWN")
            currentPosition += numOfRows
            marioGravity ()
            addMario(currentPosition)
            checkCollisionTop(keyCode) 
                
        } else if (left === keyCode){
            console.log("ARROW LEFT")
            currentPosition -= 1
            addMario(currentPosition)
        } else if (right === keyCode){
            console.log("ARROW RIGHT")
            currentPosition += 1
            addMario(currentPosition)
        } else {
            console.log("ACTION NOT FOUND")
        }

        
    }


    //Events

    createDivGrid()

    document.addEventListener("keydown", marioMovement)

    deleteBut.addEventListener("click", deleteDivContainer)

    moveEnemies()

    generateGoombas()

}

window.addEventListener('DOMContentLoaded', init)