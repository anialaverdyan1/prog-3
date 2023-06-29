


const LivingCreature = require("./livingCreature");
let random = require("./random");

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
    }

    mul(mult) {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= mult) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}