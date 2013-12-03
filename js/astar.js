/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */

var DEBUG = true;

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
    if (DEBUG) {
        logStuff(vector, " that from ", array);
    }

}

function vectorEquals(a, b) {
    return a.equals(b);
}

function aStar(graph, start, finish, heuristicFunc, allowDiagonals, specialPathWishes) {
    var openSet = new Heap();
    openSet.insert(start, heuristicFunc(start, finish));
    var closedSet = [];
    var came_from = {};

    var g_score = {};
    var f_score = {};
    var startLabel = getLabel(start);
    g_score[startLabel] = 0;
    f_score[startLabel] = g_score[startLabel] + heuristicFunc(start, finish);

    while (!openSet.empty()) {
        var current = openSet.removeMinimum();
        if (current.equals(finish)) {
            if (DEBUG) {
                logStuff("VICTORY! CURRENT: ", current, " GOAL:", finish);
            }
            return replayPath(current);
        }
        closedSet.push(current);

        var currentLabel = getLabel(current);

        var neighbors = Graph.getNeighborghs(current, allowDiagonals);
        if (DEBUG) {
            logStuff("found candidates: ", neighbors);
        }
        neighbors.forEach(function (element) {
                var vectorLabel = getLabel(element);
                var tentative_g_score = g_score[currentLabel] + heuristicFunc(current, element);
                var tentative_f_score = tentative_g_score + heuristicFunc(element, finish);
                if (arrayContainsVector(closedSet, element) && tentative_f_score >= f_score[vectorLabel]) {
                    return;
                }
                if (openSet.contains(element, vectorEquals) < 0 || tentative_f_score < f_score[vectorLabel]) {
                    element.parent = current;
                    g_score[vectorLabel] = tentative_g_score;
                    f_score[vectorLabel] = tentative_f_score;
                    if (openSet.contains(element, vectorEquals) < 0) {
                        if (DEBUG) {
                            logStuff("pushed new : ", element);
                        }
                        openSet.insert(element, heuristicFunc(element, finish));
                    }
                }
            }
        );
        if (specialPathWishes) {
            specialPathWishes(replayPath(current), openSet);
        }
    }
    logStuff("error, did not find path");
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



