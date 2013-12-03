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
        if(weight) {
            if(typeof weight !== 'number') {
                throw new TypeError("Expected weight to be a number, instead received", weight);
            }
        }
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
        var l = left(index);
        var r = right(index);
        var arr = this._elements;
        if (r <= arr.length) {
            if (arr[l].weight > arr[r].weight) {
                var largest = l;
            } else {
                var largest = r;
            }
            if (arr[index].weight < arr[largest].weight) {
                swap(index, largest);
                this.heapify(largest);
            }
        } else if (l == arr.length && arr[index].weight < arr[l].weight) {
            swap(index, l);
        }
    }

    this.insert = function (value, weight) {

        var arr = this._elements;
        var index = arr.length;
        while (index > 0 && arr[parent(index)].weight < weight) {
            arr[index] = arr[parent(index)];
            index = parent(index);
        }
        arr[index] = new Node(value, weight);
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
        var value = arr.splice(arr.length-1, 1)[0].value;
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
        var max = this._elements.shift();
        return max.value;

    }

    this.size = function() {
        return this._elements.length;
    }

    this.empty = function () {
        return this._elements.length <= 0;
    }

    this.getArray = function () {
        var result = [];

        this._elements.forEach(function(element) {
            result.push(element.value);
        });
        return result;
    }

}