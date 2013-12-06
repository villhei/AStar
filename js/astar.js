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
    var startLabel = getLabel(start);
    g_score[startLabel] = 0;
    f_score[startLabel] = g_score[startLabel];
    openSet.insert(start, 0);
    var steps = 0;
    while (!openSet.empty()) {
        steps++;
        var current = openSet.removeMinimum();
        if (current.equals(finish)) {
            console.log("took: " + steps + " steps");
            return replayPath(current);
        }

        evaluatedNodes.push(current);
        var neighbors = graph.getNeighborghs(current, allowDiagonals);
        neighbors.forEach(function (neighbor) {
                neighbor.parent = current;
                var tentative_g_score = g_score[current] + heuristicFunc(current, neighbor);
                var tentative_f_score = tentative_g_score + heuristicFunc(neighbor, finish);
                if (arrayContainsVector(evaluatedNodes, neighbor) && tentative_f_score > f_score[neighbor]) {
                    return;
                }
                var position = openSet.contains(neighbor, vectorEquals);
                if (position === -1 || tentative_f_score <= f_score[neighbor]) {

                    g_score[neighbor] = tentative_g_score;
                    if(!g_score) {
                        alert(g_score);
                    }
                    f_score[neighbor] = tentative_f_score;
                    if(!g_score) {
                        alert(g_score);
                    }
                    if (position > -1) {
                        openSet.decreaseKey(position, f_score[neighbor]);
                    } else {
                        openSet.insert(neighbor, f_score[neighbor]);
                    }
                }
            }
        );

        if (specialPathWishes) {
            specialPathWishes(replayPath(current), openSet);
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



