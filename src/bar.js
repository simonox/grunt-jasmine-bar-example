/**
* A Drink with ingredients
*/
var Drink = function() {
    this.ingredients = undefined;
};

/**
* A specific Wodka-Lemon-Drink 
*/
var WodkaLemon = function() {
    this.ingredients = "Wodka and Lemon";
};

WodkaLemon.prototype = new Drink();

/**
* A specific Campari-Orange-Drink 
*/
var CampariOrange = function() {
    this.ingredients = "Campari and Orange";
};
CampariOrange.prototype = new Drink();

/**
* A specific Cuba-Libre-Drink 
*/
var CubaLibre = function() {
    this.ingredients = "Cola and Rum";
};

CubaLibre.prototype = new Drink();

/**
* A menu card. 
*/
var menu = {
    wodkaLemon: {
        price: 4.50,
        size: '4cl',
        name: "Wodka Lemon"
    },
    campariOrange: {
        price: 4.50,
        size: '4cl',
        name: "Campari Orange"
    },
    cubaLibre: {
        price: 5.00,
        size: '4cl',
        name: "Cuba Libre"
    }
};

// =====> to be implemented: Order
/**
* An Order. 
*/
var Order = function() {
	this.items = [];
	/**
	* You can add a Drink to the the order.
	* @param drink A drink
	*/
	this.add = function(drink) {
		this.items.push(drink);
	};
};


/**
* A Barkeeper. 
*/
var barkeeper = {
	/**
	* A Barkeeper accepts an order, which is a list of drinks. 
	*/
    accept : function(order) {
        throw "not implemented yet";
    }
};



