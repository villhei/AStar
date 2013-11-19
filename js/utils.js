/*
 Luokan käyttämä poikkeus
 */
function IllegalArgumentException(message) {
    this.message = message;
}

/*
 Tyyppitarkistusluokka
 */

var TYPE = {

    /* Päätellään, että luku on INT, mikäli se on jaollinen yhdellä */

    isInteger: function (input) {
        if (TYPE.isNumber(input)) {
            return false;
        }
        return input % 1 === 0;
    },

    /* JS: perustyypit, yksinkertainen testi */

    isNumber:function (input) {
        return TYPE._typeOfTest('number', input);
    },

    isString:function (input) {
        return TYPE._typeOfTest('string', input);
    },

    isBoolean:function (input) {
        return TYPE._typeOfTest('boolean', input);
    },

    /* Taulukot tarkistetaan kutsumalla apufunktiota arrayContains

     *  Huomaa this -viittauksen pakottaminen _this -muuttujaan.
     *  Tämä täytyy tehdä anonyymin funktion näkvyyden takia, sillä
     *  this viittaisi testifunktion kutsuvaiheessa väärään olioon
     * */

    isIntArray:function (input) {
        var _this = this;
        return TYPE.arrayContains(
            (function (testValue) {
                return _this.integer(testValue);
            }), input);
    },

    isNumberArray:function (input) {
        var _this = this;
        return TYPE.arrayContains(
            (function (testValue) {
                return _this.number(testValue);
            }), input);
    },

    isArray:function (input) {
        if (Object.prototype.toString.call(input) !== '[object Array]') {
            return false;
        }
        return true;
    },

    isTypeOf:function(typeAsString, input) {
        if(!TYPE.isString(stringType)) {
            throw IllegalArgumentException('Type must be given as a string, now was: ' + typeAsString);
        }
        return typeof input === typeAsString;
    },

    isFunction: function(input) {
        return !!(input && input.constructor && input.call && input.apply);
    },

    /*
     arrayContains -funktio heitää poikkeuksen, mikäli jompi kumpi
     sen parametreista puuttuu. Tyyppitarkistus voisi palauttaa erikoisia arvoja ilman tätä
     */

    arrayContains:function (testFunction, inputArray) {
        if (!testFunction) {
            throw new IllegalArgumentException("Missing test function!");
        } else if (!inputArray) {
            throw new IllegalArgumentException("Missing test array, was:" + inputArray);
        }
        //  Tarkistetaan että taulukko on taulukko sen toString -esityksellä
        if (!this.isArray(inputArray)) {
            return false;
        }
        // Iteroidaan taulukko, palautetaan tulos

        return this._testArrayElementsWith(testFunction, inputArray);
    },

    /*
     Iteroidaan taulukko testifunktiolla
     */

    _testArrayElementsWith:function (testFunction, inputArray) {
        for (var i = 0, len = inputArray.length; i < len; i++) {
            if (!testFunction(inputArray[i])) {
                throw new TypeError("Test failed with " + inputArray[i]);
            }
        }
        return true;
    },

    /*
     Wrapatty typeof -tarkistus
     */
    _typeOfTest:function (type, input) {
        return typeof input === type;
    }

};

function ArrayError(message) {
    this.message = message;
}
ArrayError.prototype = new Error();

/*
 Esimerkki väljien tyyppiparametrien käytöstä
 */

function logStuff() {
    var args = Array.prototype.slice.call(arguments);
    for(var i = 0 ; i < args.length; ++i) {
        console.log(args[i]);
    }
}

/*
 Donde esta mia input parameter!?
 */

function concatenate() {
    return Array.prototype.slice.call(arguments).join(" ")
}

/*
 Esimerkki funktionaalisen tyylin selkeydestä
 */

function throwArrayError(errValue) {
    throw new ArrayError("Input is not an array: " + errValue);
}

function testArray(array) {
    if(!TYPE.isArray(array)) {
        throwArrayError(array);
    }
}

function functionError(errValue) {
    throw new TypeError("Parameter was not a function: "+ errValue);
}

function forEach(array, targetFunction) {
    testArray(array);

    if(!TYPE.isFunction(targetFunction)) {
        functionError(targetFunction);
    }
    for(var i = 0, len = array.length; i < len ; ++i) {
        targetFunction.apply(null, [array[i], i]);    }
}

function map(targetFunction, array) {
    testArray(array);
    if(!TYPE.isFunction(targetFunction)) {
        functionError(targetFunction);
    }
    var result = [];
    forEach(array, function(element) {
        result.push(targetFunction(element));
    });
    return result;
}

function arrayHasIndex(array, index) {
    testArray(array);
    return index >= 0 && index < array.length;
}

