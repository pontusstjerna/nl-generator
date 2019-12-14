"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// every word has k-1 previous words, even if they are undefined
var k = 5;
var deterministic = false;
var tree = [];

var createStringArray = exports.createStringArray = function createStringArray(input) {
    var split = input.split(" ");
    var entry = [];
    for (var j = split.length - k + 1; j <= split.length; j++) {
        entry.push(split[j] ? split[j] : undefined);
    }
    return entry;
};

var hasLearned = exports.hasLearned = tree.length !== 0;

var createStringTree = function createStringTree(input) {
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

    k = dimensions;
    var split = input.split(" ");
    return split.map(function (word, i) {
        var entry = [];
        for (var j = i - k + 1; j <= i; j++) {
            entry.push(split[j]);
        }
        return entry;
    });
};

var learn = exports.learn = function learn(inputStrings) {
    tree = inputStrings.flatMap(function (input) {
        return createStringTree(input);
    });
};

var getMatch = function getMatch(entryA, entryB) {
    var sum = 0;
    for (var i = 0; i < k - 1; i++) {
        if (entryA[i] === entryB[i]) {
            sum++;
        }
    }

    return sum;
};

var getClosestPoint = function getClosestPoint(entry) {
    var closest = [tree[0]];
    var bestScore = getMatch(entry, closest);
    tree.forEach(function (element) {
        var score = getMatch(entry, element);
        if (score > bestScore) {
            closest = [element];
            bestScore = score;

            // we want words of equal probability to be randomized to not be deterministic (can be turned off)
        } else if (score === bestScore) {
            closest.push(element);
        }
    });

    return closest[deterministic ? 0 : Math.floor(Math.random() * closest.length)];
};

var getNextWord = exports.getNextWord = function getNextWord(input) {
    return getClosestPoint(createStringArray(input))[k - 1];
};

// TODO: take for example source-tree as argument, or maybe something more abstract like category

exports.default = function () {
    var numberWords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    var initiator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var output = initiator;
    for (var i = 0; i < numberWords; i++) {
        output = output + " " + getNextWord(output);
    }

    return output;
};