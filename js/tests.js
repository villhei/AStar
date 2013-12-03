/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:55
 * To change this template use File | Settings | File Templates.
 */

test("Arrays and vectors", function () {
    var vecArr = [
        new Vector(0, 0),
        new Vector(1, 1),
        new Vector(2, 2),
        new Vector(3, 3),
    ]

    equal(arrayContainsVector(vecArr, new Vector(0, 0)), true);
    equal(findVectorIndex(vecArr, new Vector(2, 2)), 2);
    removeVectorFromArray(vecArr, new Vector(2, 2))
    equal(findVectorIndex(vecArr, new Vector(2, 2)), -1);
    equal(arrayContainsVector(vecArr, new Vector(2, 2)), false);
    equal(arrayContainsVector(vecArr, new Vector(0, 0)), true);
    equal(arrayContainsVector(vecArr, new Vector(1, 1)), true);
    equal(arrayContainsVector(vecArr, new Vector(3, 3)), true);
    equal(arrayContainsVector(vecArr, new Vector(1, 3)), false);

});

test("MinHeap functionality with simple values", function() {
    var heap = new Heap();
    equal(heap.empty(), true, "Initial heap should be empty");
    heap.insert(5);
    equal(heap.empty(), false, "heap should not be empty anymore");
    heap.insert(6);
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    equal(heap.contains(1) >= 0, true, "Should find 1 in the heap");
    equal(heap.contains(6) >= 0, true, "Should find 6 in the heap");

    equal(heap.contains(10) > 0, false, "Should not find 10 in the heap");
    equal(heap.size(), 5, "Should be the size of 5 after initial inserts");
    equal(heap.getMinimum(), 1, "Should return 1 as smallest element");
    equal(heap.removeMinimum(), 1, "1 Should be the first removed");
    equal(heap.getMinimum(), 2, "Should return 2 as smallest after 1 has been removed");
    equal(heap.getMaximum(), 6, "Should return 6 as largest element");
    equal(heap.removeMaximum(), 6, "Should return 6 as largest removed");
    equal(heap.getMaximum(), 5, "Should return 5 as 6 was removed ");
    equal(heap.size(), 3, "Should be the size of 3 after removed 6 and 1");
    equal(heap.removeMaximum(), 5, "Should return 5 as largest removed");
    equal(heap.removeMaximum(), 3, "Should return 3 as largest removed");
    equal(heap.removeMaximum(), 2, "Should return 2 as largest removed");
    equal(heap.empty(), true, "heap should be empty after everything was removed");
    equal(heap.getMinimum(), null, "Should return null as smallest element after heap is empty");
    equal(heap.getMaximum(), null, "Should return null as max element after heap is empty");

});

test("MinHeap functionality with some complexicity from vectors", function() {
    var heap = new Heap();

    function vectorDistance(from, to) {
        return from.distance(to);
    }

    function vectorEqual(a, b) {
        return a.equals(b);
    }

    var finish = new Vector(5,5);
    var veca = new Vector(0,0);
    var vecb = new Vector(1,1);
    var vecc = new Vector(2,2);
    equal(heap.contains(veca, vectorEqual) >= 0, false, "Should not find Vector a in the heap before insert");
    heap.insert(veca, vectorDistance(veca, finish));
    equal(heap.contains(veca, vectorEqual) >= 0, true, "Should find Vector a in the heap");
    heap.insert(vecb, vectorDistance(vecb, finish));
    heap.insert(vecc, vectorDistance(vecc, finish));

    equal(vectorEqual(heap.getMaximum(), veca), true, "Should return Vector a as the longest distance vector");
    equal(vectorEqual(heap.getMaximum(), vecb), false, "Vector b is not a max vector");
    equal(vectorEqual(heap.getMinimum(), vecc), true, "Should return Vector c as the shortest distance vector");

});

test("Test queue", function () {

    var queue = new PriorityQueue();
    queue.insert("small value", 0);
    queue.insert("bigger value", 1);
    queue.insert("biggest value", 2);
    queue.insert("smallest value", -1);
    equal(4, queue.length, "Length should be the same as inserted")
    var smallest = queue.dequeue();
    var small = queue.dequeue();
    equal(smallest, "smallest value", "Should dequeue right value");
    equal(small, "small value", "Should dequeue 2nd smallest after smallest");
    queue.insert("huge value", 10);
    queue.insert("extra small value", -10);

    var xtrasmall = queue.dequeue();
    equal(xtrasmall, "extra small value", "Should dequeue new xtrasmall");
    equal(3, queue.length, "Length should be the same as inserted-dequeued")
    var bigger = queue.dequeue();
    equal(bigger, "bigger value", "Expect right ordering");
    var biggest = queue.dequeue();
    equal(biggest, "biggest value", "Expected right ordering");
    var huge = queue.dequeue();
    equal(huge, "huge value", "last one dequeued");
    equal(0, queue.length, "queue should be empty");

});


test("Verify priotity queues priority", function () {
    var queue = new PriorityQueue();

    queue.insert("O", 3);
    queue.insert("R", 4);
    queue.insert("I", 5);
    queue.insert("Q", 8);
    queue.insert("U", 9);
    queue.insert("E", 10);
    queue.insert("U", 11);
    queue.insert("E", 12);
    queue.insert("P", 0);
    queue.insert("R", 1);
    queue.insert("I", 2);
    queue.insert("T", 6);
    queue.insert("Y", 7);


    var valueList = ["P", "R", "I", "O", "R", "I", "T", "Y", "Q", "U", "E", "U", "E"];
    var actual = queue.valueList();

    deepEqual(actual, valueList, "Expected right order of values");
    equal(queue.length, valueList.length, "Expected right length");

    var actualValues = [];
    for (var i = 0; i < valueList.length; ++i) {
        actualValues.push(queue.dequeue());
    }

    deepEqual(actualValues, valueList, "Expected right dequeue order");
    equal(queue.length, 0, "Expected empty queue");

});

