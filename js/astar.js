/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */

var canvas = {};
var ctx = {};

var TYPE = {
    '255255255':{value:0, name:"OPEN", cost:0},
    '000':{value:1, name:"WALL", cost:Number.MAX_VALUE},
    '25500':{value:2, name:"START", cost:0},
    '00255':{value:3, name:"FINISH", cost:0}
};

function setupCanvas(canvas2D, image) {
    var height = image.height;
    var width = image.width;

    canvas2D.width = width;
    canvas2D.height = height;

    var ctx = canvas2D.getContext('2d');

    ctx.drawImage(image, 0, 0);

}

function createGraphArray(canvas) {

    var graphArray = [];
    for (var i = 0; i < canvas.height; ++i) {
        graphArray.push([]);
    }
    var context = canvas.getContext('2d');
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    for (var i = 0; i < imgData.length; i += 4) {
        var red = imgData[i];
        var green = imgData[i + 1];
        var blue = imgData[i + 2];
        var color = '' + red + green + blue;
        var x = calculateX(canvas, i);
        var y = calculateY(canvas, i);
        graphArray[y].push(TYPE[color]);
    }
    return graphArray;
}

function calculateX(canvas, i) {
    return i / 4 % canvas.width;
}

function calculateY(canvas, i) {
    return Math.floor(i / 4 / canvas.height);
}

function findPointByName(graph, name) {

    for (var y = 0; y < graph.length; ++y) {
        for (var x = 0; x < graph[y].length; ++x) {
            if (graph[x][y].name == name) {
                return new Vector(y, x);
            }
        }
    }
    return false;
}

function arrayContainsVector(array, value) {
    for(var i = 0 ; i < array.length ; ++i) {
        if(array[i].equals(value)) {
            return true;
        }
    }
    return false;
}

function aStar(start, goal, graph) {
    var evaluatedNodes = [];
    var priorityQueue = new PriorityQueue();

    priorityQueue.insert(start, 0);
    var navigatedNodes = [];

    var navigated_cost = 0;
    var estimated_cost = navigated_cost + costEstimate(start, goal);

    while (!priorityQueue.empty()) {
        var current_node = priorityQueue.dequeue();
        if (current_node.x === goal.x && current.node.y === goal.y) {
            return reconstruct_path(navigatedNodes, goal);
        }
        navigatedNodes.push(current_node);
        var neighs = findNeigh(graph, node);
        neighs.forEach(function(element) {
            if(graph[element.y][element.x].name === "WALL" || arrayContainsVector(navigatedNodes, element)) {
                continue;
            }

        })
    }


    return [];
}

function findNeigh(graph, node) {
    var found = [];
    for(var y = node.y-1 ; y < node.y+2; ++y) {
        for(var x = node.x-1 ; x < node.x+2 ; ++x) {
            if(withinBounds(x, y, graph)) {
                found.push(new Vector(x,y));
            }
        }
    }
    return found;
}

function withinBounds(x, y, graph) {
    if(x < 0 || y < 0) {
        return false;
    }
    if(x > graph[0].length-1 || y > graph.length-1 ) {
        return false;
    }
    return true;
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

    function costEstimate(from, to) {
        return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
    }


$(document).ready(function () {
    canvas = document.getElementById('canvas2d');
    ctx = canvas.getContext('2d');
    var routeImage = new Image();
    var graph = [];
    routeImage.src = 'res/testroute1.png';
    routeImage.onload = (function () {
        setupCanvas(canvas, routeImage);
        graph = new createGraphArray(canvas);
        var start = findPointByName(graph, "START");
        var end = findPointByName(graph, "END");
        var path = aStar(start, end, graph);
    });
});