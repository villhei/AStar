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


function vectorEquals(a, b) {
    return a.equals(b);
}

function aStar(graph, start, finish, heuristicFunc, allowDiagonals, specialPathWishes) {
    var openSet = new Heap();
    var evaluatedNodes = [];

    var g_score = {};
    var f_score = {};
    g_score[start] = 0;
    f_score[start] = g_score[start] + heuristicFunc(start, finish);
    openSet.insert(start, f_score[start]);

    var steps = 0;
    while (!openSet.empty()) {
        steps++;
        var current = openSet.removeMinimum();
        if (current.equals(finish)) {
            if (DEBUG) {
                logStuff("VICTORY! CURRENT: ", current, " GOAL:", finish);
                logStuff("Took: ", steps, " steps")
            }
            return replayPath(current);
        }

        evaluatedNodes.push(current);
        var neighbors = Graph.getNeighborghs(current, allowDiagonals);
        neighbors.forEach(function (neighbor) {
                neighbor.parent = current;
                var tentative_g_score = g_score[current] + heuristicFunc(current, neighbor);
                var tentative_f_score = tentative_g_score + heuristicFunc(neighbor, finish);
                if (arrayContainsVector(evaluatedNodes, neighbor) && tentative_f_score > f_score[neighbor]) {
                    return;
                }
                var position = openSet.contains(neighbor, vectorEquals);
                if (position === -1 || tentative_f_score < f_score[neighbor]) {

                    g_score[neighbor] = tentative_g_score;
                    f_score[neighbor] = tentative_f_score;
                    if (position > -1) {
                        if (DEBUG) {
                            logStuff("pushed new : ", neighbor);
                        }
                        openSet.decreaseKey(position, f_score[neighbor]);
                    } else {
                        console.log("decreased key")
                        openSet.insert(neighbor, f_score[neighbor]);
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



