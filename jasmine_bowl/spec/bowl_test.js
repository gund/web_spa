describe("Bowling", function() {

	it("bwScore should be defined", function() {
		expect(bwScore).toBeDefined();
	});

	describe('addFrame: to be a function', function(){
		it("addFrame: is a function", function(){
			expect(bwScore.addFrame).toEqual(jasmine.any(Function))
		})
	});
	describe('frameSet to be an Array', function(){
		it("frameSet to be an Array", function(){
			expect(bwScore.frameSet).toEqual(jasmine.any(Array))
		})
	});
	describe('addBonus: to be a function', function(){
		it("addBonus: is a function", function(){
			expect(bwScore.addBonus).toEqual(jasmine.any(Function))
		})
	});

	//check how data sets to frame
	describe('putting skittles to frameSet', function(){

		//first, second, third frame
		describe('put 3 frames', function(){
			beforeEach(function() {
				bwScore.addFrame(10);
				bwScore.addFrame(5);
				bwScore.addFrame(4,1);
				bwScore.addFrame(9);
			});
			it("3d frame", function(){
				expect(bwScore.addFrame(1,2)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":0},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":0}]')
			})
		})

	});

	describe('putting bonus to frameSet', function(){

		describe('put strike bonus to first frame', function(){
			it("att1: 10, att2: 0, bonus: 5+4", function(){
				expect(bwScore.addBonus(0,2)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":9},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":0}]');
			})
		});

		describe('put spare bonus to third frame', function(){
			it("att1: 9, att2: 1, bonus: undefined, No next step available", function(){
				expect(bwScore.addBonus(2,1)).toBe('No next step available');
			})
		});

		describe('put spare bonus to third frame', function(){
			beforeEach(function() {
				bwScore.addFrame(7);
				bwScore.addFrame(2,3);
			});
			it("att1: 9, att2: 1, bonus: 7", function(){
				expect(bwScore.addBonus(2,1)).toBe('[{"skittlesPerFrame":{"attempt1":10,"attempt2":0},"bonus":9},{"skittlesPerFrame":{"attempt1":5,"attempt2":4},"bonus":0},{"skittlesPerFrame":{"attempt1":9,"attempt2":1},"bonus":7},{"skittlesPerFrame":{"attempt1":7,"attempt2":2},"bonus":0}]');
			})
		});

	});

	describe('counting hole bwScore', function(){
		it("retrun sum of hole bwScore -> 54", function(){
			expect(bwScore.count()).toBe(54);
		})
	});

})