
var MyHashMap = function () {
    this.SIZE = 809; //prime number
    this.NOT_FOUND = -1;
    this.buckets = Array.from(new Array(this.SIZE), () => []);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
    let currentBucket = this.buckets[this.hashKey(key)];
    let index = this.findIndexOfPair(currentBucket, key);
    if (index !== this.NOT_FOUND) {
        currentBucket[index].value = value;
        return;
    }
    currentBucket.push(new Pair(key, value));
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
    let currentBucket = this.buckets[this.hashKey(key)];
    let index = this.findIndexOfPair(currentBucket, key);
    return index !== this.NOT_FOUND ? currentBucket[index].value : this.NOT_FOUND;
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
    let currentBucket = this.buckets[this.hashKey(key)];
    let index = this.findIndexOfPair(currentBucket, key);
    if (index !== this.NOT_FOUND) {
        currentBucket.splice(index, 1);
    }
};

/** 
 * @param {number[]} currentBucket 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.findIndexOfPair = function (currentBucket, key) {
    for (let i = 0; i < currentBucket.length; ++i) {
        if (currentBucket[i].key === key) {
            return i;
        }
    }
    return this.NOT_FOUND;
};

/** 
 * @param {number} key 
 * @return {number}
 */
MyHashMap.prototype.hashKey = function (key) {
    return key % this.SIZE;
};

function Pair(key, value) {
    this.key = key;
    this.value = value;
}
