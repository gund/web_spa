var bwScore = {
    frames: 10,
    attempts: 2,
    strike: 10,
    frameSet: [],
    addFrame: function (skit, frameCount) {
        var f = {};
        if (frameCount === undefined) {
            f.skittlesPerFrame = {};
            f.skittlesPerFrame.attempt1 = skit;
            if (f.skittlesPerFrame.attempt1 == 10) f.skittlesPerFrame.attempt2 = 0;
            f.bonus = 0;
            this.frameSet.push(f);
        } else {
            this.frameSet[frameCount].skittlesPerFrame.attempt2 = skit;
        }
        return JSON.stringify(this.frameSet);
    },
    addBonus: function (frameCount, addBonusSteps) {
        if (this.frameSet[frameCount + 1] === undefined) {
            return 'No next step available';
        } else {
            // bonus for strikes
            if (addBonusSteps == 2) {
                if (this.frameSet[frameCount + 1].skittlesPerFrame.attempt1 != 10) {
                    //to implement validation if attempt1 or attempt2 is undefined
                    this.frameSet[frameCount].bonus = this.frameSet[frameCount + 1].skittlesPerFrame.attempt1 + this.frameSet[frameCount + 1].skittlesPerFrame.attempt2;
                } else {
                    this.frameSet[frameCount].bonus = this.frameSet[frameCount + 1].skittlesPerFrame.attempt1 + this.frameSet[frameCount + 2].skittlesPerFrame.attempt1;
                }
            }
            // bonus for spare
            if (addBonusSteps == 1) {
                this.frameSet[frameCount].bonus += this.frameSet[frameCount + 1].skittlesPerFrame.attempt1
            }
            return JSON.stringify(this.frameSet);
        }
    },

    count: function () {
        var frameSetLenght, i, sum;
        frameSetLenght = this.frameSet.length;
        i = 0;
        sum = 0
        for (i; i < frameSetLenght; i++) {
            sum += this.frameSet[i].skittlesPerFrame.attempt1 + this.frameSet[i].skittlesPerFrame.attempt2 + this.frameSet[i].bonus;
        }
        return sum;
    }
};