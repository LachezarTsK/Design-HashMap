
#include <list>
#include <array>
#include <algorithm>
using namespace std;

template<typename K, typename V> class Bucket {
    
private:
    list<pair<K, V>> bucketPairs;

public:
    Bucket() = default;
    ~Bucket() = default;

    void insertIntoBucket(K key, V value) {
        auto p = findPair(key);
        if (p != bucketPairs.end()) {
            p->second = value;
            return;
        }
        bucketPairs.push_front(pair(key, value));
    }

    void removeFromBucket(K key) {
        auto p = findPair(key);
        if (p != bucketPairs.end()) {
            bucketPairs.erase(p);
            return;
        }
    }

    optional<V> getValue(K key) {
        auto p = findPair(key);
        if (p != bucketPairs.end()) {
            return p->second;
        }
        return {};
    }

    auto findPair(K key) {
        return find_if(bucketPairs.begin(), bucketPairs.end(), [&key](const pair<int, int>& p) {
            return key == p.first; });
    }
};

class MyHashMap {
    
private:
    inline static const size_t SIZE = 809; //prime number
    inline static const int NOT_FOUND = -1;
    array<Bucket<int, int>, SIZE> buckets;

public:
    MyHashMap() = default;
    ~MyHashMap() = default;

    void put(int key, int value) {
        buckets[hashKey(key)].insertIntoBucket(key, value);
    }

    int get(int key) {
        return buckets[hashKey(key)].getValue(key).has_value() ? buckets[hashKey(key)].getValue(key).value() : NOT_FOUND;
    }

    void remove(int key) {
        buckets[hashKey(key)].removeFromBucket(key);
    }

    int hashKey(int key) {
        return key % SIZE;
    }
};
