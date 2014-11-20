describe("Reformer10", function () {

    it("ref10 should be defined", function () {
        expect(ref10).toBeDefined();
    });

    describe('toReform:', function () {
        it('ref10.toReform to be a function', function () {
            expect(ref10.toReform).toEqual(jasmine.any(Function))
        });
    });

    describe('<=10:', function () {

        describe('toReform: return I', function () {
            it('1', function () {
                expect(ref10.toReform(1)).toBe('I')
            });
        });
        describe('toReform: return V', function () {
            it('5', function () {
                expect(ref10.toReform(5)).toBe('V')
            });
        });
        describe('toReform: return VIII', function () {
            it('8', function () {
                expect(ref10.toReform(8)).toBe('VIII')
            });
        });

        describe('toReform: return VII', function () {
            it('7', function () {
                expect(ref10.toReform(7)).toBe('VII')
            });
        });
    });
});


describe("Reformer100", function () {
    it("ref100 should be defined", function () {
        expect(ref100).toBeDefined();
    });

    describe('toReform:', function () {
        it('ref100.toReform to be a function', function () {
            expect(ref100.toReform).toEqual(jasmine.any(Function))
        });
    });

    describe('10<number<100:', function () {

        describe('toReform: return L', function () {
            it('50', function () {
                expect(ref100.toReform(50)).toBe('L')
            });
        });
        describe('toReform: return XX', function () {
            it('20', function () {
                expect(ref100.toReform(20)).toBe('XX')
            });
        });
        describe('toReform: return XXX', function () {
            it('30', function () {
                expect(ref100.toReform(30)).toBe('XXX')
            });
        });
        describe('toReform: return XXV', function () {
            it('25', function () {
                expect(ref100.toReform(25)).toBe('XXV')
            });
        });
        describe('toReform: return XXXVII', function () {
            it('37', function () {
                expect(ref100.toReform(37)).toBe('XXXVII')
            });
        });
        describe('toReform: return XIX', function () {
            it('19', function () {
                expect(ref100.toReform(19)).toBe('XIX')
            });
        });
        describe('toReform: return LV', function () {
            it('55', function () {
                expect(ref100.toReform(55)).toBe('LV')
            });
        });
        describe('toReform: return LXXXVII', function () {
            it('87', function () {
                expect(ref100.toReform(87)).toBe('LXXXVII')
            });
        });

    });
});


describe("Reformer1000", function () {
    it("ref1000 should be defined", function () {
        expect(ref1000).toBeDefined();
    });

    describe('toReform:', function () {
        it('ref1000.toReform to be a function', function () {
            expect(ref1000.toReform).toEqual(jasmine.any(Function))
        });
    });

    describe('100<number<1000:', function () {

        describe('toReform: return DC', function () {
            it('600', function () {
                expect(ref1000.toReform(600)).toBe('DC')
            });
        });
        describe('toReform: return CCCLXXV', function () {
            it('375', function () {
                expect(ref1000.toReform(375)).toBe('CCCLXXV')
            });
        });
        describe('toReform: return CDXCVII', function () {
            it('497', function () {
                expect(ref1000.toReform(497)).toBe('CDXCVII')
            });
        });
        describe('toReform: return CMLXXIX', function () {
            it('979', function () {
                expect(ref1000.toReform(979)).toBe('CMLXXIX')
            });
        });
        describe('toReform: return CD', function () {
            it('400', function () {
                expect(ref1000.toReform(400)).toBe('CD')
            });
        });
        describe('toReform: return CM', function () {
            it('900', function () {
                expect(ref1000.toReform(900)).toBe('CM')
            });
        });
        describe('toReform: return D', function () {
            it('500', function () {
                expect(ref1000.toReform(500)).toBe('D')
            });
        });
        describe('toReform: return CC', function () {
            it('200', function () {
                expect(ref1000.toReform(200)).toBe('CC')
            });
        });
        describe('toReform: return CXC', function () {
            it('190', function () {
                expect(ref1000.toReform(190)).toBe('CXC')
            });
        });
        describe('toReform: return CDXC', function () {
            it('490', function () {
                expect(ref1000.toReform(490)).toBe('CDXC')
            });
        });
        describe('toReform: return CMLXX', function () {
            it('970', function () {
                expect(ref1000.toReform(970)).toBe('CMLXX')
            });
        });


    });
});

describe("Reformer3000", function () {
    it("ref3000 should be defined", function () {
        expect(ref3000).toBeDefined();
    });

    describe('toReform:', function () {
        it('ref3000.toReform to be a function', function () {
            expect(ref3000.toReform).toEqual(jasmine.any(Function))
        });
    });

    describe('1000<number<3000:', function () {

    });
    describe('toReform: return MMM', function () {
        it('3000', function () {
            expect(ref3000.toReform(3000)).toBe('MMM')
        });
    });

    describe('toReform: return MM', function () {
        it('2000', function () {
            expect(ref3000.toReform(2000)).toBe('MM')
        });
    });

    describe('toReform: return MMXVI', function () {
        it('2016', function () {
            expect(ref3000.toReform(2016)).toBe('MMXVI')
        });
        describe('toReform: return MMXIV', function () {
            it('2014', function () {
                expect(ref3000.toReform(2014)).toBe('MMXIV')
            });
        });

    });
});