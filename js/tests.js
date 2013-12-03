/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:55
 * To change this template use File | Settings | File Templates.
 */

test("MinHeap functionality with simple values", function() {
    var heap = new Heap();
    equal(heap.empty(), true, "Initial heap should be empty");

    heap.insert(3);
    equal(heap.empty(), false, "heap should not be empty anymore");
    heap.insert(6);
    heap.insert(1);
    heap.insert(2);
    heap.insert(5);
    equal(heap.contains(1) >= 0, true, "Should find 1 in the heap");
    equal(heap.contains(6) >= 0, true, "Should find 6 in the heap");
    equal(heap.contains(10) > 0, false, "Should not find 10 in the heap");
    equal(heap.size(), 5, "Should be the size of 5 after initial inserts");
    equal(heap.getMinimum(), 1, "Should return 1 as smallest element");
    equal(heap.removeMinimum(), 1, "1 Should be the first removed");
    equal(heap.contains(1) < 0, true, "Should not find 1 in the heap");
    equal(heap.getMinimum(), 2, "Should return 2 as smallest after 1 has been removed");
    equal(heap.size(), 4, "Should be the size of 4");
    equal(heap.removeMinimum(), 2, "Should return 2 as smallest after 1 has been removed");
    equal(heap.removeMinimum(), 3, "Should return 3 as smallest after 1 has been removed");
    equal(heap.removeMinimum(), 5, "Should return 5 as smallest after 1 has been removed");
    equal(heap.removeMinimum(), 6, "Should return 6 as smallest after 1 has been removed");
    equal(heap.empty(), true, "heap should be empty after everything was removed");
    equal(heap.getMinimum(), null, "Should return null as smallest element after heap is empty");

});

test("MinHeap decreases with simple values", function() {
    var heap = new Heap();

    heap.insert("a", 1);
    heap.insert("b", 2);
    heap.insert("c", 3);
    heap.insert("d", 4);
    heap.insert("e", 5);
    heap.insert("f", 6);

    heap.decreaseKey(heap.contains("f"), -1);
    equal(heap.getMinimum(), "f", "Should return f as smallest weight is -1");
    heap.decreaseKey(heap.contains("e"), -2);
    heap.decreaseKey(heap.contains("a"), -10);
    equal(heap.getMinimum(), "a", "Should return a as smallest weight is -10");
    equal(heap.removeMinimum(), "a", "Should be a the first removed");
    equal(heap.getMinimum(), "e", "Should return e as smallest weight is -2");

});

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


    equal(vectorEqual(heap.getMinimum(), vecc), true, "Should return Vector c as the shortest distance vector");

});

test("Heap sorting should tell whether heap really works", function() {

    var array = [4,6,7,12,4,6,8,9,34,1,3,5,3,5,3,6,3,6,2131,7,4,4,3,1,2,5,7];
    var heap = new Heap();
    array.forEach(function(element) {
        heap.insert(element);
    });

    var result = [];
    while(!heap.empty()) {
        result.push(heap.removeMinimum());
    }
    var sorted = array.sort(function(a, b) {
        return a -b;
    });
    deepEqual(result, sorted, "Heap-sorted array should equal to one sorted natively");
    equal(heap.empty(), true, "should be empty");
})

test("Heap sorting needs to be tested with values", function() {

    var testString = "I AM STARTING TO FUCKING HATE THIS HEAP SHIT";
    var indexArr = [];
    var testArr = testString.split('');

    var heap = new Heap();
    for(var i = 0 ; i < testArr.length; ++i) {
        indexArr.push(i);
    }

    while(indexArr.length > 0) {
        var index = Math.floor(Math.random()*testArr.length);
        heap.insert(testArr[index], indexArr[index]);
        testArr.splice(index, 1);
        indexArr.splice(index,1);
    }

    var result = [];
    while(!heap.empty()) {
        result.push(heap.removeMinimum());
    }
    deepEqual(result.join(''), testString, "Heap-sorted array should equal to: I AM STARTING TO FUCKING HATE THIS HEAP SHIT");
    equal(heap.empty(), true, "should be empty");
})

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

    equal(vectorEqual(heap.getMinimum(), veca), true, "Should return Vector c as the shortest distance vector");

});
