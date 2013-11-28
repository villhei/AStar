/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */

var DEBUG = false;

function getLabel(vector) {
    return vector.toString()
}


function popArrayMinimum(array, heuristic) {
    array = array.sort(function compare(a, b) {
        var heura = heuristic(a);
        var heurb = heuristic(b);

        if (heura > heurb) {
            return 1;
        }
        if (heura < heurb) {
            return -1;
        }
        return 0;

    });
    return array.shift();
}


function findVectorIndex(array, vector) {
    testVector(vector);
    if (!TYPE.isArray(array)) {
        throw new TypeError("Expected an array, got a: " + array);
    }
    var index = -1;
    forEach(array, function find_index(candidate, arrIndex) {
        if (index === -1) {
            if (candidate.equals(vector)) {
                index = arrIndex;
            }
        }
    })
    return index;
}

function arrayContainsVector(array, vector) {
    testVector(vector);
    if (!TYPE.isArray(array)) {
        throw new TypeError("Expected an array, got a: " + array);
    }
    var found = false;
    forEach(array, function vectorEquals(element) {
        testVector(element);
        if (vector.equals(element)) {
            found = true;
        }
    });
    return found;
}

function removeVectorFromArray(array, vector) {

    var index = findVectorIndex(array, vector);
    if (index > -1) {
        array.splice(index, 1);
    }
    if(DEBUG) {
		logStuff(vector, " that from ", array);
	}

}

function aStar(graph, start, finish, heuristicFunc, allowDiagonals, specialPathWishes) {
    var openSet = [];
    openSet.push(start);
    var closedSet = [];
    var came_from = {};

    var g_score = {};
    var f_score = {};
    var startLabel = getLabel(start);
    g_score[startLabel] = 0;
    f_score[startLabel] = g_score[startLabel] + heuristicFunc(start, finish);

    while (openSet.length > 0) {
        var current = popArrayMinimum(openSet, function appliedHeuristic(candidate) {
            return heuristicFunc(candidate, finish);
        });
        if (current.equals(finish)) {
            if(DEBUG) {
				logStuff("VICTORY! CURRENT: ", current, " GOAL:", finish);
			}
            return replayPath(current);
        }

        removeVectorFromArray(openSet, current);
        closedSet.push(current);

        var currentLabel = getLabel(current);

       var neighbors = Graph.getNeighborghs(current, allowDiagonals);
        if(DEBUG) {
			logStuff("found candidates: ", neighbors);
		}
        forEach(neighbors, function (element) {
                    var vectorLabel = getLabel(element);
                    var tentative_g_score = g_score[currentLabel] + heuristicFunc(current, element);
                    var tentative_f_score = tentative_g_score + heuristicFunc(element, finish);
                    if (arrayContainsVector(closedSet, element) && tentative_f_score >= f_score[vectorLabel]) {
                        return;
                    }
                    if (!arrayContainsVector(openSet, element) || tentative_f_score < f_score[vectorLabel]) {
                        element.parent = current;
                        g_score[vectorLabel] = tentative_g_score;
                        f_score[vectorLabel] = tentative_f_score;
                        if (!arrayContainsVector(openSet, element)) {
                            if(DEBUG) {
								logStuff("pushed new : ", element);
							}
                            openSet.push(element);
                        }
                    }
                }
        );
        if(specialPathWishes) {
            specialPathWishes(replayPath(current), neighbors);
        }
    }
}

function replayPath(vector) {
    testVector(vector);
    var result = [];
    while (vector.parent) {
        result.push(vector);
        vector = vector.parent;
    }
    return result;
}


function PriorityQueue() {

    this.length = 0;
    this.rootNode = new Node(null, null);

    function Node(value, weight) {
        this._next = null;
        this._value = value;
        this._weight = weight;
    }

    this.insert = function (value, weight) {
        var newNode = new Node(value, weight);

        if (this.rootNode._next == null) {
            this.length++;
            this.rootNode._next = newNode;
            return;
        }
        var prevNode = this.rootNode;
        var nextNode = this.rootNode._next;
        while (nextNode != null && newNode._weight > nextNode._weight) {
            prevNode = nextNode;
            nextNode = nextNode._next;
        }
        prevNode._next = newNode;
        newNode._next = nextNode;
        this.length++;
    }

    this.valueList = function () {
        var values = [];
        var nextNode = this.rootNode._next;
        while (nextNode != null) {
            values.push(nextNode._value);
            nextNode = nextNode._next;
        }
        return values;
    }

    this.empty = function () {
        return this.length == 0;
    }

    this.dequeue = function () {
        if (this.length > 0) {
            var firstNode = this.rootNode._next;
            this.rootNode._next = firstNode._next;
            this.length--;
            return firstNode._value;
        } else {
            return null;
        }
    }
}


