function init () {

    //Elements

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 10
    let numOfCols = 10
    let numOfDivs = numOfRows * numOfCols

    // Array of divs is a total number of divs in the grid, these divs contain classes, which are linked to CSS
    let arrayOfDivs = []

    // terrainDivs is an array containing the numbers that represent divs that have .ground
    let terrainDivs = [37, 38, 39, 40, 41, 42, 43, 90, 89, 88, 87, 86, 85, 84]

    // pointsBlockDivs is an array containing the numbers that represent divs that have .points 
    let pointsBlockDivs = [13]

    // this is Mario's starting position
    let startingPosition = 28

    // we update Mario's position as he moves 
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let deleteBut = document.querySelector(".delete")

    let divContainer = document.querySelector(".div-container")

    let marioClass = "mario"

    // Object containing starting positions of Goombas (enemies) 
    let goombaLocations = {
        goomba1: 33, 
        goomba2: 76, 
        goomba3: 80,
    }
    
    //Execution

    // This function generates the Goombas in the initial position (taken from goombaLocations)
    function generateGoombas () {
        let arrayFromGLocations = Object.keys(goombaLocations).map(function(key) { return goombaLocations[key]})
        for (let i in arrayOfDivs) {
            if (arrayFromGLocations.includes(parseFloat(arrayOfDivs[i].id)))
            arrayOfDivs[i].classList.add("goomba")
        }
    }

    // This function generates -1 or 1 to give Goombas horizontal movement 
    function generateRandomMovements() {
        return Math.random() < 0.5 ? -1 : 1
    }

    // This function assigns Goombas new coordinates where to go and replaces the arrayOfDivs with updates divs
    function randomEnemyMovement () {
        setInterval(() => {
            // for (let enemy in goombaLocations) {
            //     let newGLocation = goombaLocations[enemy] + generateRandomMovements()
            //     goombaLocations[enemy] = newGLocation 
            //     console.log(goombaLocations[enemy])
            let selectedDivs = document.querySelectorAll(".goomba")
            console.log(selectedDivs.length)
            for (let i = 0; i < selectedDivs.length; i++) {
                let newCoordinate = parseFloat(selectedDivs[i].id) + generateRandomMovements()

            }

            // let newArray = Array.from(selectedDivs).forEach(item => {
            //     return item.id
            // })
            // console.log(newArray)

            // let newLocations = selectedDivs.forEach(enemyG => {
            //     return parseFloat(enemyG.id) + generateRandomMovements()
            // })
            // console.log(newLocations)
            // for (let enemyG in ) {
            //     console.log(enemyG)
            // }

        }, 2000)

    //     let location = parseFloat(document.querySelector(".goomba").id)+randomInt
    //     setInterval(() => {
    //         document.getElementById(`${location}`).classList.add("goomba")
    //     }, 2000);
    }

    // This function creates the grid full of divs, assigns classes to some divs that match the criteria of being in another array
    function createDivGrid() {
        for (let i = 1; i <= numOfDivs; i++) {
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
        
        addMario(startingPosition)
        
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
            currentPosition -= numOfRows-1
        } else if (down === keyCode && 
            !document.getElementById(`${currentPosition + numOfRows}`).classList.contains("ground")){
            console.log("ARROW DOWN")
            currentPosition += numOfRows-1
            console.log(currentPosition)

                
        } else if (left === keyCode){
            console.log("ARROW LEFT")
            currentPosition -= 1
        } else if (right === keyCode){
            console.log("ARROW RIGHT")
            currentPosition += 1
        } else {
            console.log("ACTION NOT FOUND")
        }

        addMario(currentPosition)

    }


    //Events

    createDivGrid()

    document.addEventListener("keydown", marioMovement)

    deleteBut.addEventListener("click", deleteDivContainer)

    randomEnemyMovement ()

    generateGoombas()

}

window.addEventListener('DOMContentLoaded', init)