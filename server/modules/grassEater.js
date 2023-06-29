


const LivingCreature = require("./livingCreature");
let random = require("./random");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index)
        this.energy = 8;
        this.isFemale = isFemale
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell  && this.energy >13) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] =  this.index;
            var newGrass = new GrassEater(newX, newY, this.index, !this.isFemale);
            grassEaterArr.push(newGrass);
            this.energy  = 8
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] =  this.index;
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] =  this.index;
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if(this.isFemale){
                this.energy += 2
            }
            else{
                this.energy += 4
            }
            

        }
    }
    die() {
        if (this.energy <= 0 && this.isFemale) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    matrix[this.y][this.x] = 0
                    break;
                }
            }
        }
    }
}
