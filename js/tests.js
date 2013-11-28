/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 10.9.2013
 * Time: 15:55
 * To change this template use File | Settings | File Templates.
 */

test("Arrays and vectors", function () {
	var vecArr = [
	new Vector(0,0),
	new Vector(1,1),
	new Vector(2,2),
	new Vector(3,3),
	]

	equal(arrayContainsVector(vecArr, new Vector(0,0)), true);
	equal(findVectorIndex(vecArr, new Vector(2,2)), 2);
	removeVectorFromArray(vecArr, new Vector(2,2))
	equal(findVectorIndex(vecArr, new Vector(2,2)), -1);
	equal(arrayContainsVector(vecArr, new Vector(2,2)), false);
	equal(arrayContainsVector(vecArr, new Vector(0,0)), true);
	equal(arrayContainsVector(vecArr, new Vector(1,1)), true);
	equal(arrayContainsVector(vecArr, new Vector(3,3)), true);	
	equal(arrayContainsVector(vecArr, new Vector(1,3)), false);	

	});

test("Test queue",function () {

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


test("Verify priotity queues priority", function() {
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


    var valueList = ["P", "R", "I", "O", "R", "I", "T", "Y", "Q", "U", "E","U", "E"];
    var actual = queue.valueList();

    deepEqual(actual, valueList, "Expected right order of values");
    equal(queue.length, valueList.length, "Expected right length");

    var actualValues = [];
    for(var i = 0 ; i < valueList.length; ++i) {
        actualValues.push(queue.dequeue());
    }

    deepEqual(actualValues, valueList, "Expected right dequeue order");
    equal(queue.length, 0, "Expected empty queue");

});

