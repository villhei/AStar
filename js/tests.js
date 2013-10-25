/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:55
 * To change this template use File | Settings | File Templates.
 */

test("Canvas coordinates, x", 4, function () {

    var canvas = document.getElementById('canvas2d');
    canvas.width = 10;
    canvas.height = 10;
    equal(calculateX(canvas, 0), 0);
    equal(calculateX(canvas, 4), 1);
    equal(calculateX(canvas, 40), 0);
    equal(calculateX(canvas, 76), 9);
    console.log("ran");
});

test("Canvas coordinates, y",function () {

    var canvas = document.getElementById('canvas2d');
    canvas.width = 10;
    canvas.height = 10;
    equal(calculateY(canvas, 0), 0);
    equal(calculateY(canvas, 44), 1);
    equal(calculateY(canvas, 80), 2);
    equal(calculateY(canvas, 76), 1);
    equal(calculateY(canvas, 396), 9);
});

test("Cost estimate returns sensible values",function () {

    equal(costEstimate(new Vector(0,0), new Vector(9,9)), 18);
    equal(costEstimate(new Vector(9,9), new Vector(0,0)), 18);
    equal(costEstimate(new Vector(0,9), new Vector(0,0)), 9);
    equal(costEstimate(new Vector(0,0), new Vector(9,0)), 9);

});

test("Test queue",function () {

    var queue = new PriorityQueue();
    queue.insert("small value", 0);
    queue.insert("bigger value", 1);
    queue.insert("biggest value", 2);
    queue.insert("smallest value", -1);

    var smallest = queue.dequeue();
    var small = queue.dequeue();
    equal(smallest, "smallest value", "Should dequeue right value");
    equal(small, "small value", "Should dequeue 2nd smallest after smallest");
    console.log(queue);

});


asyncTest("Canvas setup, correct size", function () {

    var canvas = document.getElementById('canvas2d');
    var image = new Image();
    image.src = 'res/testroute1.png';
    image.onload = function () {
        setupCanvas(canvas, image);
    }
    setTimeout(function(){
        equal(canvas.width, image.width, "width was right");
        equal(canvas.height, image.height, "height was right");
        equal(canvas.width, 10);
        equal(canvas.height, 10);
        start();
    }, 100);

});

asyncTest("Canvas setup, correct positions", function () {

    var canvas = document.getElementById('canvas2d');
    var image = new Image();
    var graph = [];
    image.src = 'res/testroute1.png';
    image.onload = function () {
        setupCanvas(canvas, image);
        graph = createGraphArray(canvas);
    }
    setTimeout(function(){
        equal(graph[1][0].name, "START", "Start in place");
        equal(graph[0][1].name, "FINISH", "Finish in place");
        equal(graph[0][0].name, "WALL", "Wall is in place");
        equal(graph[9][9].name, "OPEN", "Bottomright corner");
        equal(graph[8][8].name, "WALL", "Bottomright corner");
        start();
    }, 100);

});

asyncTest("Correct starts and finish places",function () {

    var canvas = document.getElementById('canvas2d');
    var image = new Image();
    var graph = [];
    image.src = 'res/testroute1.png';
    image.onload = function () {
        setupCanvas(canvas, image);
        graph = createGraphArray(canvas);
    }
    setTimeout(function(){
        deepEqual(findPointByName(graph, "START"), new Vector(0,1), "Found startpoint");
        deepEqual(findPointByName(graph, "FINISH"), new Vector(1,0), "Found finish");
        equal(findPointByName(graph, "Imnotthere"), false, "Found something nonexistent");
        start();
    }, 100);

});

asyncTest("AStar finds the way",function () {

    var canvas = document.getElementById('canvas2d');
    var image = new Image();
    var graph = [];
    image.src = 'res/testroute1.png';
    image.onload = function () {
        setupCanvas(canvas, image);
        graph = createGraphArray(canvas);
    }
    setTimeout(function(){
        var start = findPointByName(graph, "START");
        var end = findPointByName(graph, "FINISH");

        var path = aStar(start, end, graph);

        var expectedResult = [
            new Vector(0,1),
            new Vector(0,2),
            new Vector(2,2),
            new Vector(2,3),
            new Vector(3,3),
            new Vector(3,4),
            new Vector(4,4),
            new Vector(5,4),
            new Vector(5,5),
            new Vector(6,5),
            new Vector(6,6),
            new Vector(7,6),
            new Vector(7,7),
            new Vector(8,7),
            new Vector(8,8),
            new Vector(8,9),
            new Vector(9,9),
            new Vector(9,8),
            new Vector(9,7),
            new Vector(8,7),
            new Vector(8,6),
            new Vector(7,6),
            new Vector(7,5),
            new Vector(6,5),
            new Vector(6,4),
            new Vector(5,4),
            new Vector(5,3),
            new Vector(4,3),
            new Vector(4,2),
            new Vector(3,2),
            new Vector(3,1),
            new Vector(2,1)
        ];
        console.log(expectedResult);
        deepEqual(path, expectedResult, "tried to find a route")
    }, 100);

});

