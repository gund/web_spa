score = {
	frames: 10,
	attempts: 2,
	strike:10,
	frameSet:[],
	addFrame: function(skittles, number_of_frame){
		var frame = {};
		if(number_of_frame == undefined){

			frame.skittlesPerFrame = {};
			frame.skittlesPerFrame.attempt1 = skittles;
			if(frame.skittlesPerFrame.attempt1 == 10){ // if strike
				frame.skittlesPerFrame.attempt2 = 0;
			}
			frame.bonus = 0;
			this.frameSet.push(frame)

		} else {
			this.frameSet[number_of_frame].skittlesPerFrame.attempt2 = skittles;
		}
		
		return JSON.stringify(this.frameSet);
	},

	addBonus: function(frame_number, bonus_stepsToAdd){
		if(this.frameSet[frame_number+1] == undefined){
			return 'No next step, call me later!';
		} else {
			// bonus for strikes
			if(bonus_stepsToAdd == 2){
				if(this.frameSet[frame_number+1].skittlesPerFrame.attempt1 != 10) {
					//to implement validation if attempt1 or attempt2 is undefined
					this.frameSet[frame_number].bonus = this.frameSet[frame_number+1].skittlesPerFrame.attempt1 + this.frameSet[frame_number+1].skittlesPerFrame.attempt2;
				} else {
					this.frameSet[frame_number].bonus = this.frameSet[frame_number+1].skittlesPerFrame.attempt1 + this.frameSet[frame_number+2].skittlesPerFrame.attempt1;
				}
			}
			// bonus for spare
			if(bonus_stepsToAdd == 1){
				this.frameSet[frame_number].bonus += this.frameSet[frame_number+1].skittlesPerFrame.attempt1
			}
			return JSON.stringify(this.frameSet);
		}
	},

	count: function(){
		var frameSetLenght, i, sum;
		frameSetLenght = this.frameSet.length;
		i=0;
		sum=0
		for (i; i<frameSetLenght; i++){
			sum+=this.frameSet[i].skittlesPerFrame.attempt1 + this.frameSet[i].skittlesPerFrame.attempt2 + this.frameSet[i].bonus;
		}
		return sum;
	}
};