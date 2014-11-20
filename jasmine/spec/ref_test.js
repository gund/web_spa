 describe("Reformer10", function() {

    it("ref10 should be defined", function() {
      expect(ref10).toBeDefined();
 	});

 	describe('toReform:', function(){
 		it('ref10.toReform to be a function', function(){
 			expect(ref10.toReform).toEqual(jasmine.any(Function))
 		});
 	});

 	describe('<=10:', function(){ 

	 	describe('toReform: return I', function(){
	 		it('1', function(){
	 			expect(ref10.toReform(1)).toBe('I')
	 		});
	 	});
	 	describe('toReform: return X', function(){
	 		it('10', function(){
	 			expect(ref10.toReform(10)).toBe('X')
	 		});
	 	});
	 	describe('toReform: return V', function(){
	 		it('5', function(){
	 			expect(ref10.toReform(5)).toBe('V')
	 		});
	 	});
	 	describe('toReform: return II', function(){
	 		it('2', function(){
	 			expect(ref10.toReform(2)).toBe('II')
	 		});
	 	});

	 	describe('toReform: return III', function(){
	 		it('3', function(){
	 			expect(ref10.toReform(3)).toBe('III')
	 		});
	 	});

	 	describe('toReform: return IV', function(){
	 		it('4', function(){
	 			expect(ref10.toReform(4)).toBe('IV')
	 		});
	 	});

	 	describe('toReform: return IX', function(){
	 		it('9', function(){
	 			expect(ref10.toReform(9)).toBe('IX')
	 		});
	 	});

	 	describe('toReform: return VIII', function(){
	 		it('8', function(){
	 			expect(ref10.toReform(8)).toBe('VIII')
	 		});
	 	});

	 	describe('toReform: return VII', function(){
	 		it('7', function(){
	 			expect(ref10.toReform(7)).toBe('VII')
	 		});
	 	});
	 });
});


describe("Reformer100", function() {
	  it("ref100 should be defined", function() {
	     	expect(ref100).toBeDefined();
	 	});

 	describe('toReform:', function(){
 		it('ref100.toReform to be a function', function(){
 			expect(ref100.toReform).toEqual(jasmine.any(Function))
 		});
 	});

 	describe('10<number<100:', function(){ 

 		describe('toReform: return L', function(){
	 		it('50', function(){
	 			expect(ref100.toReform(50)).toBe('L')
	 		});
	 	});

	 	describe('toReform: return C', function(){
	 		it('100', function(){
	 			expect(ref100.toReform(100)).toBe('C')
	 		});
	 	});
	 	// chisla kratnie 10, ne 40 i ne 90
	 	describe('toReform: return XX', function(){
	 		it('20', function(){
	 			expect(ref100.toReform(20)).toBe('XX')
	 		});
	 	});
	 	describe('toReform: return XXX', function(){
	 		it('30', function(){
	 			expect(ref100.toReform(30)).toBe('XXX')
	 		});
	 	});
	 	describe('toReform: return LXXX', function(){
	 		it('80', function(){
	 			expect(ref100.toReform(80)).toBe('LXXX')
	 		});
	 	});
	 	describe('toReform: return VX', function(){
	 		it('60', function(){
	 			expect(ref100.toReform(60)).toBe('LX')
	 		});
	 	});

	 	// 40 i 90 
	 	describe('toReform: return XL', function(){
	 		it('40', function(){
	 			expect(ref100.toReform(40)).toBe('XL')
	 		});
	 	});
	 	describe('toReform: return XC', function(){
	 		it('90', function(){
	 			expect(ref100.toReform(90)).toBe('XC')
	 		});
	 	});
	 	//chisla ne kratnie 10 -> 25, 37, 19, 49,97, 55, 87
	 	describe('toReform: return XXV', function(){
	 		it('25', function(){
	 			expect(ref100.toReform(25)).toBe('XXV')
	 		});
	 	});
	 	describe('toReform: return XXXVII', function(){
	 		it('37', function(){
	 			expect(ref100.toReform(37)).toBe('XXXVII')
	 		});
	 	});
	 	describe('toReform: return XIX', function(){
	 		it('19', function(){
	 			expect(ref100.toReform(19)).toBe('XIX')
	 		});
	 	});
	 	describe('toReform: return XLIX', function(){
	 		it('49', function(){
	 			expect(ref100.toReform(49)).toBe('XLIX')
	 		});
	 	});
	 	describe('toReform: return XCVII', function(){
	 		it('97', function(){
	 			expect(ref100.toReform(97)).toBe('XCVII')
	 		});
	 	});
	 	describe('toReform: return LV', function(){
	 		it('55', function(){
	 			expect(ref100.toReform(55)).toBe('LV')
	 		});
	 	});
	 	describe('toReform: return LXXXVII', function(){
	 		it('87', function(){
	 			expect(ref100.toReform(87)).toBe('LXXXVII')
	 		});
	 	});

 	});
});


describe("Reformer1000", function() {
	  it("ref1000 should be defined", function() {
	     	expect(ref1000).toBeDefined();
	 	});

 	describe('toReform:', function(){
 		it('ref1000.toReform to be a function', function(){
 			expect(ref1000.toReform).toEqual(jasmine.any(Function))
 		});
 	});

 	describe('100<number<1000:', function(){ 

 		describe('toReform: return D', function(){
	 		it('500', function(){
	 			expect(ref1000.toReform(500)).toBe('D')
	 		});
	 	});
	 	describe('toReform: return M', function(){
	 		it('1000', function(){
	 			expect(ref1000.toReform(1000)).toBe('M')
	 		});
	 	});

	 	// chisla kratnie 100, ne 400 i ne 900
	 	describe('toReform: return CC', function(){
	 		it('200', function(){
	 			expect(ref1000.toReform(200)).toBe('CC')
	 		});
	 	});
	 	describe('toReform: return CCC', function(){
	 		it('300', function(){
	 			expect(ref1000.toReform(300)).toBe('CCC')
	 		});
	 	});
	 	describe('toReform: return DCCC', function(){
	 		it('800', function(){
	 			expect(ref1000.toReform(800)).toBe('DCCC')
	 		});
	 	});
	 	describe('toReform: return DC', function(){
	 		it('600', function(){
	 			expect(ref1000.toReform(600)).toBe('DC')
	 		});
	 	});

	 	// 400 i 900 
	 	describe('toReform: return CD', function(){
	 		it('400', function(){
	 			expect(ref1000.toReform(400)).toBe('CD')
	 		});
	 	});
	 	describe('toReform: return CM', function(){
	 		it('900', function(){
	 			expect(ref1000.toReform(900)).toBe('CM')
	 		});
	 	});
	 	//chisla ne kratnie 100 -> 250, 370, 190, 490,970, 550, 870
	 	describe('toReform: return CCL', function(){
	 		it('250', function(){
	 			expect(ref1000.toReform(250)).toBe('CCL')
	 		});
	 	});
	 	describe('toReform: return CCCLXX', function(){
	 		it('370', function(){
	 			expect(ref1000.toReform(370)).toBe('CCCLXX')
	 		});
	 	});
	 	describe('toReform: return CXC', function(){
	 		it('190', function(){
	 			expect(ref1000.toReform(190)).toBe('CXC')
	 		});
	 	});
	 	describe('toReform: return CDXC', function(){
	 		it('490', function(){
	 			expect(ref1000.toReform(490)).toBe('CDXC')
	 		});
	 	});
	 	describe('toReform: return CMLXX', function(){
	 		it('970', function(){
	 			expect(ref1000.toReform(970)).toBe('CMLXX')
	 		});
	 	});
	 	describe('toReform: return DL', function(){
	 		it('550', function(){
	 			expect(ref1000.toReform(550)).toBe('DL')
	 		});
	 	});
	 	describe('toReform: return DCCCLXX', function(){
	 		it('870', function(){
	 			expect(ref1000.toReform(870)).toBe('DCCCLXX')
	 		});
	 	});

	 	//chisla ne kratnie 10 -> 252, 375, 198, 497,979, 554, 873
	 	describe('toReform: return CCLII', function(){
	 		it('252', function(){
	 			expect(ref1000.toReform(252)).toBe('CCLII')
	 		});
	 	});
	 	describe('toReform: return CCCLXXV', function(){
	 		it('375', function(){
	 			expect(ref1000.toReform(375)).toBe('CCCLXXV')
	 		});
	 	});
	 	describe('toReform: return CXCVIII', function(){
	 		it('198', function(){
	 			expect(ref1000.toReform(198)).toBe('CXCVIII')
	 		});
	 	});
	 	describe('toReform: return CDXCVII', function(){
	 		it('497', function(){
	 			expect(ref1000.toReform(497)).toBe('CDXCVII')
	 		});
	 	});
	 	describe('toReform: return CMLXXIX', function(){
	 		it('979', function(){
	 			expect(ref1000.toReform(979)).toBe('CMLXXIX')
	 		});
	 	});
	 	describe('toReform: return DLIV', function(){
	 		it('554', function(){
	 			expect(ref1000.toReform(554)).toBe('DLIV')
	 		});
	 	});
	 	describe('toReform: return DCCCLXXIII', function(){
	 		it('873', function(){
	 			expect(ref1000.toReform(873)).toBe('DCCCLXXIII')
	 		});
	 	});


 	});
});

 describe("Reformer3000", function() {
	  it("ref3000 should be defined", function() {
	     	expect(ref3000).toBeDefined();
	 	});

 	describe('toReform:', function(){
 		it('ref3000.toReform to be a function', function(){
 			expect(ref3000.toReform).toEqual(jasmine.any(Function))
 		});
 	});
 	//chisla kratnie 1000
 	describe('1000<number<3000:', function(){ 

 		describe('toReform: return MM', function(){
	 		it('2000', function(){
	 			expect(ref3000.toReform(2000)).toBe('MM')
	 		});
	 	});
	 	describe('toReform: return MMM', function(){
	 		it('3000', function(){
	 			expect(ref3000.toReform(3000)).toBe('MMM')
	 		});
	 	});

	 	describe('toReform: return MMM', function(){
	 		it('3000', function(){
	 			expect(ref3000.toReform(3000)).toBe('MMM')
	 		});
	 	});
	 //chisla ne kratnie 1000
	 	describe('toReform: return MMXIV', function(){
	 		it('2014', function(){
	 			expect(ref3000.toReform(2014)).toBe('MMXIV')
	 		});
	 	});
	 	describe('toReform: return MCMXXVI', function(){
	 		it('1926', function(){
	 			expect(ref3000.toReform(1926)).toBe('MCMXXVI')
	 		});
	 	});

	 	describe('toReform: return MMXVI', function(){
	 		it('2016', function(){
	 			expect(ref3000.toReform(2016)).toBe('MMXVI')
	 		});
	 	});

	});
});