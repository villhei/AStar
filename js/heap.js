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
        this.value = value;
        this.weight = weight ? weight : value;
    }

    function parent(index) {
        return Math.floor(index / 2);
    }

    function left(index) {
        return 2 * index;
    }

    function right(index) {
        return 2 * index + 1;
    }

    function swap(fromIndex, toIndex) {
        var arr = this._elements;
        var temp = arr[toIndex];
        arr[toIndex] = arr[fromIndex];
        arr[fromIndex] = temp;

    }

    this.containsWeighted = function(element, weight, equality) {

    }

    this.contains = function (element, equality) {
        var arr = this._elements;
        var foundIndex = -1;
        arr.forEach(function(arrElem, arrIndex) {
            if(foundIndex > 0) {
                return;
            }
            if(equality) {
                if(equality(arrElem.value, element)) {
                    foundIndex = arrIndex;
                }
            } else if(element === arrElem.value) {
                foundIndex = arrIndex;
            }
        });
        return foundIndex;
    }

    this.heapify = function (index) {
        var left = left(index);
        var right = right(index);
        var arr = this._elements;
        if (right <= arr.length) {
            if (arr[left].weight > arr[right].weight) {
                var largest = left;
            } else {
                var largest = right;
            }
            if (arr[index].weight < arr[largest].weight) {
                swap(index, largest);
                this.heapify(largest);
            }
        } else if (left == arr.length && arr[index].weight < arr[left].weight) {
            swap(index, left);
        }
    }

    this.insert = function (value, weight) {

        var newElem = new Node(value, weight);
        var arr = this._elements;
        var index = arr.length;
        while (index > 0 && arr[parent(index)].weight < newElem.weight) {
            arr[index] = arr[parent(index)];
            index = parent(index);
        }
        arr[index] = newElem;
    }

    this.getMinimum = function () {
        var arr = this._elements;
        if (this.empty()) {
            return null;
        }
        return arr[arr.length - 1].value;
    }

    this.removeMinimum = function () {
        var arr = this._elements;
        if (this.empty()) {
            return null;
        }
        var value = arr.splice(arr.length - 1, 1)[0].value;
        return value;
    }

    this.getMaximum = function () {
        if (!this.empty()) {
            return this._elements[0].value;
        }
        return null;
    }

    this.removeMaximum = function () {
        if (this.empty()) {
            return null;
        }
        var max = this._elements.splice(0, 1)[0].value;
        return max;

    }

    this.size = function() {
        return this._elements.length;
    }

    this.empty = function () {
        return this._elements.length <= 0;
    }

    this.getArray = function () {
        return this._elements.splice(0);
    }

}