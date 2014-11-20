var reformer10 = {
	one:'I',
	five:'V',
	ten:'X',
	fifty:'L',
	hundred:'C',
	five_hundred:'D',
	thousand:'M',

	toReform :function(number){

		// number <= 10
		if(number<=10){
			switch(number){
				case 1:
				return this.one;
				break;

				case 5:
				return this.five;
				break

				case 10: 
				return this.ten;
				break

				default: 

				if(1<number && number<4){
					return (function(){
						var sum = '', i=0;
						for(i; i<number; i++){
							sum+=reformer10.one;
						}
						return sum;
					})();
				}

				if(number>= 4){
					if(number == 4 || number == 9) {
						return (function(){
							var sum ='';
							var four = 5 - parseInt(number);
							var nine = 10 - parseInt(number);
							if(four == 1) {sum = reformer10.one + reformer10.five};
							if(nine == 1) {sum = reformer10.one + reformer10.ten};
							return sum;
						})();

					} else {

						return (function(){
							var sum =reformer10.five, i=0;
							var num_to_sum = parseInt(number) - 5;
							for(i; i<num_to_sum; i++){
								sum+=reformer10.one;
							}
							return sum;
						})();
					}
				};
			}
		}
	}
}

var reformer100 = {
	one:'I',
	five:'V',
	ten:'X',
	fifty:'L',
	hundred:'C',
	five_hundred:'D',
	thousand:'M',

	toReform :function(number){
		// 10<number<100

		if (10<number && number<=100) {
			switch(number){
				case 50:
				return this.fifty;
				break;

				case 100:
				return this.hundred;
				break

				default: 
				if(number%10 == 0){
					if(10<number && number<40){
						return (function(){
							var sum = '', i=0;
							var num_to_sum = number/10;
							for(i; i<num_to_sum; i++){
								sum+=reformer100.ten;
							}
							return sum;
						})();
					}

					if(number>= 40){
						if(number == 40 || number == 90) {
							return (function(){
								var sum ='';
								var four = 50 - parseInt(number);
								var nine = 100 - parseInt(number);
								if(four == 10) {sum = reformer100.ten + reformer100.fifty};
								if(nine == 10) {sum = reformer100.ten + reformer100.hundred};
								return sum;
							})();

						} else {

							return (function(){
								var sum =reformer100.fifty, i=0;
								var num_to_sum = (number - 50)/10;
								for(i; i<num_to_sum; i++){
									sum+=reformer100.ten;
								}
								return sum;
							})();
						}
					};
				} else {
					var num_to_sum = number/10;
					var num_to_sum_zeloe = Math.floor(num_to_sum);
					var num_to_sum_drobnoe = Math.round((num_to_sum - Math.floor(num_to_sum))*10);
					console.log(num_to_sum_drobnoe)
					if(10<number && number<40){
						return (function(){
							var sum = '', i=0;
							for(i; i<num_to_sum_zeloe; i++){
								sum+=reformer100.ten;
							}
							var final_sum = sum+reformer10.toReform(num_to_sum_drobnoe);
							return final_sum;
						})();
					}
					if(number>40){
						if((40<number && number<50) || (90<number && number<100)){
							return (function(){
								var sum ='';
								var fourty = 50 - parseInt(number);
								var ninty = 100 - parseInt(number);
								if(fourty < 10) {sum = (reformer100.ten + reformer100.fifty) +reformer10.toReform(num_to_sum_drobnoe)};
								if(ninty < 10) {sum = (reformer100.ten + reformer100.hundred)+reformer10.toReform(num_to_sum_drobnoe)};
								return sum;
							})();
						}else{
							return (function(){
								var sum =reformer100.fifty, i=0;
								var num_to_sum50 = (number - 50)/10;
								var num_to_sum_zeloe50 = Math.floor(num_to_sum50);
								var num_to_sum_drobnoe50 = Math.round((num_to_sum50 - Math.floor(num_to_sum50))*10);
								for(i; i<num_to_sum_zeloe50; i++){
									sum+=reformer100.ten;
								}
								var final_sum = sum+reformer10.toReform(num_to_sum_drobnoe50);
								return final_sum;
							})();
						}
					}
				}
			}
		}
	}	
};

var reformer1000 = {
	one:'I',
	five:'V',
	ten:'X',
	fifty:'L',
	hundred:'C',
	five_hundred:'D',
	thousand:'M',

	toReform :function(number){
		// 100<number<1000

		if (100<number && number<=1000) {
			switch(number){

				case 500:
				return this.five_hundred;
				break

				case 1000:
				return this.thousand;
				break

				default: 
				if(number%100 == 0){
					if(100<number && number<400){
						return (function(){
							var sum = '', i=0;
							var num_to_sum = number/100;
							for(i; i<num_to_sum; i++){
								sum+=reformer1000.hundred;
							}
							return sum;
						})();
					}

					if(number>= 400){
						if(number == 400 || number == 900) {
							return (function(){
								var sum ='';
								var four = 500 - parseInt(number);
								var nine = 1000 - parseInt(number);
								if(four == 100) {sum = reformer1000.hundred + reformer100.five_hundred};
								if(nine == 100) {sum = reformer1000.hundred + reformer100.thousand};
								return sum;
							})();

						} else {

							return (function(){
								var sum =reformer1000.five_hundred, i=0;
								var num_to_sum = (number - 500)/100;
								for(i; i<num_to_sum; i++){
									sum+=reformer1000.hundred;
								}
								return sum;
							})();
						}
					};
				} else {
					var num_to_sum = number/100;
					var num_to_sum_zeloe = Math.floor(num_to_sum);
					var num_to_sum_drobnoe = Math.round((num_to_sum - Math.floor(num_to_sum))*100);
					if(100<number && number<400){
						return (function(){
							var sum = '', i=0;
							for(i; i<num_to_sum_zeloe; i++){
								sum+=reformer1000.hundred;
							}
							console.log(num_to_sum_drobnoe)
							var final_sum = sum+reformer100.toReform(num_to_sum_drobnoe);
							return final_sum;
						})();
					}
					if(number>400){
						if((400<number && number<500) || (900<number && number<1000)){
							return (function(){
								var sum ='';
								var fourty = 500 - parseInt(number);
								var ninty = 1000 - parseInt(number);
								if(fourty < 100) {sum = (reformer1000.hundred + reformer1000.five_hundred) +reformer100.toReform(num_to_sum_drobnoe)};
								if(ninty < 100) {sum = (reformer1000.hundred + reformer1000.thousand)+reformer100.toReform(num_to_sum_drobnoe)};
								return sum;
							})();
						}else{
							return (function(){
								var sum =reformer1000.five_hundred, i=0;
								var num_to_sum500 = (number - 500)/100;
								var num_to_sum_zeloe500 = Math.floor(num_to_sum500);
								var num_to_sum_drobnoe500 = Math.round((num_to_sum500 - Math.floor(num_to_sum500))*100);
								for(i; i<num_to_sum_zeloe500; i++){
									sum+=reformer1000.hundred;
								}
								var final_sum = sum+reformer100.toReform(num_to_sum_drobnoe500);
								return final_sum;
							})();
						}
					}
				}
			}
		}
	}	
};


var reformer3000 = {
	one:'I',
	five:'V',
	ten:'X',
	fifty:'L',
	hundred:'C',
	five_hundred:'D',
	thousand:'M',

	toReform :function(number){
		// 1000<number<3000

		if (1000<number && number<=3000) {
			if(number%1000 == 0){
				return (function(){
							var sum = '', i=0;
							var num_to_sum = number/1000;
							for(i; i<num_to_sum; i++){
								sum+=reformer3000.thousand;
							}
							return sum;
						})();
			} else {
				var num_to_sum = number/1000;
				var num_to_sum_zeloe = Math.floor(num_to_sum);
				var num_to_sum_drobnoe = Math.round((num_to_sum - Math.floor(num_to_sum))*1000);
				console.log(num_to_sum_drobnoe);
				return (function(){
							var sum = '', i=0;
							for(i; i<num_to_sum_zeloe; i++){
								sum+=reformer3000.thousand;
							}
							if(num_to_sum_drobnoe<100) {
								var final_sum = sum+reformer100.toReform(num_to_sum_drobnoe);
							} else {
								var final_sum = sum+reformer1000.toReform(num_to_sum_drobnoe);
							}
							
							return final_sum;
						})();
			}
		}
	}	
};