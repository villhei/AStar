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

function aStar(current, target, graph) {
    if (current.x == target.x && current.y == target.y) {
        return construct_path;
    }

    return [];
}

function costEstimate(from, to) {
    return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
}

function PriorityQueue() {

    this.length = 0;
    this.nodeList = new Node(null, null);

    function Node(value, weight) {
        this._next = null;
        this._value = value;
        this._weight = weight;
    }

    this.insert = function (value, weight) {
        var newNode = new Node(value, weight);
        console.log("inserting: " + value);

        if (this.nodeList._next == null) {
            this.nodeList._next = newNode;
            return;
        }
        var nextNode = this.nodeList._next;
        while (nextNode != null && newNode._weight > nextNode._weight) {
            nextNode = nextNode._next;
        }
        nextNode = newNode;
        this.length++;
        console.log(this.nodeList);
    }

    this.dequeue = function () {
        if (length > 0) {
            var firstNode = this.nodeList._next;
            this.nodeList._next = firstNode._next;
            this.nodeList._next._prev = this.nodeList;
            length--;
            return firstNode._value;
        } else {
            return null;
        }
    }


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