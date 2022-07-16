function init () {

    //Rows and number of divs - map size can be changed by changing the numOfRows
    let numOfRows = 10
    let numOfCols = 10
    let numOfDivs = numOfRows * numOfCols

    let arrayOfDivs = []
    let terrainDivs = [28, 29, 30, 31, 32, 33, 34]

    let startingPosition = 11
    let currentPosition = startingPosition

    let startButton = document.querySelector(".startbutton")
    
    let deleteBut = document.querySelector(".delete")

    let divContainer = document.querySelector(".div-container")

    let marioClass = "mario"

    function createDivGrid() {
        for (let i = 1; i <= numOfDivs; i++) {
            console.log("hello")
            let div = document.createElement("div")
            div.id = i
            if ()
            divContainer.appendChild(div)
            arrayOfDivs.push(div)
        }
        
        addMario(startingPosition)
        
    }

    function buildGround() {
         arrayOfDivs.map(div => {
            if (terrainDivs.includes(parseInt(div.id))) {
                div.classList.add(".ground")
            }
         })
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

        // // Remove cat from current position
        // removeCat(currentPosition)

        removeMario(currentPosition)

        // Check the keyCode on the event and match with the direction
        if(up === keyCode) {
            console.log("ARROW UP")
            currentPosition -= numOfRows-1
        } else if (down === keyCode){
            console.log("ARROW DOWN")
            currentPosition += numOfRows-1
        } else if (left === keyCode){
            console.log("ARROW LEFT")
            console.log(currentPosition % numOfRows)
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
    buildGround()

    document.addEventListener("keydown", marioMovement)

    deleteBut.addEventListener("click", deleteDivContainer)




}

window.addEventListener('DOMContentLoaded', init)