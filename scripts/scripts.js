function init () {

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 10
    let numOfCols = 10
    let numOfDivs = numOfRows * numOfCols

    let arrayOfDivs = []
    let terrainDivs = [37, 38, 39, 40, 41, 42, 43, 90, 89, 88, 87, 86, 85, 84]
    let enemyDivs = [33]
    let pointsBlockDivs = [13]

    let startingPosition = 28
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let deleteBut = document.querySelector(".delete")

    let divContainer = document.querySelector(".div-container")

    let marioClass = "mario"

    let goombaLocations = {
        goomba1: 33, 
        goomba2: 76, 
        goomba3: 80,
    }

    function generateGoombas () {
        let arrayFromGLocations = Object.keys(goombaLocations).map(function(key) { return goombaLocations[key]})
        for (let i in arrayOfDivs) {
            if (arrayFromGLocations.includes(parseFloat(arrayOfDivs[i].id)))
            arrayOfDivs[i].classList.add("goomba")
        }
    }

    function generateRandomMovements() {
        return Math.random() < 0.5 ? -1 : 1
    }

    function randomEnemyMovement () {
        setInterval(() => {
            // for (let enemy in goombaLocations) {
            //     let newGLocation = goombaLocations[enemy] + generateRandomMovements()
            //     goombaLocations[enemy] = newGLocation 
            //     console.log(goombaLocations[enemy])

            let newLocations = document.querySelectorAll(".goomba").forEach(enemyG => {
                return parseFloat(enemyG.id) + generateRandomMovements()
            })
            console.log(newLocations)
            // for (let enemyG in ) {
            //     console.log(enemyG)
            // }

        }, 2000)

    //     let location = parseFloat(document.querySelector(".goomba").id)+randomInt
    //     setInterval(() => {
    //         document.getElementById(`${location}`).classList.add("goomba")
    //     }, 2000);
    }

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

    function buildGround() {
        document.getElementById("20").classList.add("points-block")
        // document.querySelector("#20").classList.add("points-block")
    }

    function addMario (position) {
        arrayOfDivs[position].classList.add(marioClass)
    }

    function deleteDivContainer () {
        divContainer.remove()
    }


    function removeMario(position){
        arrayOfDivs[position].classList.remove(marioClass)
      }

    
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

    //Elements

    //Execution

    //Events

    //Create div grid

    
    createDivGrid()
    
    startButton.addEventListener("click", buildGround)

    document.addEventListener("keydown", marioMovement)

    deleteBut.addEventListener("click", deleteDivContainer)
    randomEnemyMovement ()
    generateGoombas()

}

window.addEventListener('DOMContentLoaded', init)