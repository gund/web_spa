describe("Bowling", function() {

	it("score should be defined", function() {
		expect(score).toBeDefined();
	});

	describe('addFrame: to be a function', function(){
		it("addFrame: is a function", function(){
			expect(score.addFrame).toEqual(jasmine.any(Function))
		})
	});
	describe('frameSet to be an Array', function(){
		it("frameSet to be an Array", function(){
			expect(score.frameSet).toEqual(jasmine.any(Array))
		})
	});
	describe('addBonus: to be a function', function(){
		it("addBonus: is a function", function(){
			expect(score.addBonus).toEqual(jasmine.any(Function))
		})
	});

	//check how data sets to frame
	describe('putting skittles to frameSet', function(){

		//first, second, third frame
		describe('put 3 frames', function(){
			beforeEach(function() {
				score.addFrame(10);
				score.addFrame(5);
				score.addFrame(4,1);
				score.addFrame(9);
			});
			it("3d frame", function(){
				expect(score.addFrame(1,2)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":0},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":0}]')
			})
		})

	});

	describe('putting bonus to frameSet', function(){

		describe('put strike bonus to first frame', function(){
			it("att1: 10, att2: 0, bonus: 5+4", function(){
				expect(score.addBonus(0,2)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":9},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":0}]');
			})
		});

		describe('put spare bonus to third frame', function(){
			it("att1: 9, att2: 1, bonus: undefined, no next step yet", function(){
				expect(score.addBonus(2,1)).toBe('No next step, call me later!');
			})
		});

		describe('put spare bonus to third frame', function(){
			beforeEach(function() {
				score.addFrame(7);
				score.addFrame(2,3);
			});
			it("att1: 9, att2: 1, bonus: 7", function(){
				expect(score.addBonus(2,1)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":9},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":7},{"skittlesPerFrame":{"attempt1":7,"attempt2":2},"bonus":0}]');
			})
		});

	});

	describe('counting hole score', function(){
		it("retrun sum of hole score -> 54", function(){
			expect(score.count()).toBe(54);
		})
	});

})