/**
 * Created with JetBrains WebStorm.
 * User: Ville
 * Date: 3.12.2013
 * Time: 12:56
 * To change this template use File | Settings | File Templates.
 */
function Heap() {
    this._elements = [];

    function Node(value, weight) {
        this.weight = weight === undefined ? value : weight;
        this.value = value;
    }

    function parentOf(index) {
        return Math.floor(index / 2);
    }

    function leftOf(index) {
        return 2 * index;
    }

    function rightOf(index) {
        return 2 * index + 1;
    }

    this.swap = function (fromIndex, toIndex) {
        var arr = this._elements;

        var temp = arr[toIndex];
        arr[toIndex] = arr[fromIndex];
        arr[fromIndex] = temp;

    }

    this.containsWeighted = function (element, weight, equality) {

    }

    this.contains = function (element, equality) {
        var arr = this._elements;
        var foundIndex = -1;
        arr.forEach(function (arrElem, arrIndex) {
            if (foundIndex > 0) {
                return;
            }
            if (equality) {
                if (equality(arrElem.value, element)) {
                    foundIndex = arrIndex;
                }
            } else if (element === arrElem.value) {
                foundIndex = arrIndex;
            }
        });
        return foundIndex;
    }

    this.heapify = function (index) {
        var left = leftOf(index);
        var right = rightOf(index);
        var arr = this._elements;
        if (right < arr.length) {
            if (arr[left].weight < arr[right].weight) {
                var minimum = left;
            } else {
                var minimum = right;
            }
            if (arr[index].weight > arr[minimum].weight) {
                this.swap(index, minimum);
                this.heapify(minimum);
            }
        } else if (left == arr.length - 1 && arr[index].weight >= arr[left].weight) {
            this.swap(index, left);
        }
    }

    this.insert = function (value, weight) {

        var newElem = new Node(value, weight);
        var arr = this._elements;

        var index = arr.length;
        while (index > 0 && (arr[parentOf(index)].weight > newElem.weight)) {
            arr[index] = arr[parentOf(index)];
            index = parentOf(index);
        }
        arr[index] = newElem;
    }

    this.getMinimum = function () {
        if (!this.empty()) {
            return this._elements[0].value;
        }
        return null;
    }

    this.removeMinimum = function () {
        if (this.empty()) {
            return null;
        }
        var arr = this._elements;
        var min = arr[0].value;
        arr[0] = arr[arr.length - 1];
        arr.splice(arr.length - 1, 1);
        this.heapify(0);

        return min;

    }

    this.decreaseKey = function(index, newWeight) {
        var arr = this._elements;
        if(newWeight < arr[index].weight) {
            arr[index].weight = newWeight;
            while(index > 0 && arr[parentOf(index)].weight > arr[index].weight) {
                this.swap(index, parentOf(index));
                index = parentOf(index);
            }
        }
    }

    this.size = function () {
        return this._elements.length;
    }

    this.empty = function () {
        return this._elements.length === 0;
    }

    this.getArray = function () {
        var result = [];

        this._elements.forEach(function (element) {
            result.push(element.value);
        })
        return result;
    }

}