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

    heap.insert(3);
    equal(heap.empty(), false, "heap should not be empty anymore");
    heap.insert(6);
    heap.insert(1);
    heap.insert(2);
    heap.insert(5);
    deepEqual(heap.getArray(), [6,5,3,2,1], "should equal to test array");
    equal(heap.contains(1) >= 0, true, "Should find 1 in the heap");
    equal(heap.contains(6) >= 0, true, "Should find 6 in the heap");
    equal(heap.contains(10) > 0, false, "Should not find 10 in the heap");
    equal(heap.size(), 5, "Should be the size of 5 after initial inserts");
    equal(heap.getMinimum(), 1, "Should return 1 as smallest element");
    equal(heap.removeMinimum(), 1, "1 Should be the first removed");
    equal(heap.contains(1) < 0, true, "Should not find 1 in the heap");
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

test("Heap retains order", function() {
    var heap = new Heap();
    heap.insert("a", 1);
    heap.insert("b", 2);
    heap.insert("c", 3);
    heap.insert("d", 4);

    deepEqual(heap.getArray(), ["d","c","b","a"], "should equal to test array");
    equal(heap.getMinimum(), "a", "a should be the minimum value");
})

test("Heap retains order again", function() {
    var heap = new Heap();
    heap.insert("c", 3);
    heap.insert("d", 4);
    heap.insert("a", 1);
    heap.insert("e", 5);
    heap.insert("b", 2);

    deepEqual(heap.getArray(), ["e","d","c","b","a"], "should equal to test array");
    equal(heap.getMinimum(), "a", "a should be the minimum value");
})

test("MinHeap functionality with some complexicity from vectors", function() {
    var heap = new Heap();

    function vectorDistance(from, to) {
        return from.squaredDistance(to);
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

test("MinHeap functionality with some challenging cases", function() {
    var heap = new Heap();

    function vectorDistance(from, to) {
        return from.distance(to);
    }

    function vectorEqual(a, b) {
        return a.equals(b);
    }

    var finish = new Vector(3,3);
    var veca = new Vector(0,1);
    var vecc = new Vector(0,5);
    heap.insert(veca, vectorDistance(veca, finish));
    heap.insert(vecc, vectorDistance(vecc, finish));

    equal(vectorEqual(heap.getMaximum(), veca), true, "Should return Vector a as the longest distance vector");
    equal(vectorEqual(heap.getMinimum(), vecc), true, "Should return Vector c as the shortest distance vector");

});
