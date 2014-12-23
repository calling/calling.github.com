---
layout: post
title: Hacker Rank — Maximizing XOR
---

Problem: https://www.hackerrank.com/challenges/maximizing-xor
My solution:

{% highlight javascript %}
function maxXor(l, r) {
    var l = parseInt(l, 10), r = parseInt(r, 10);
    var max = 0
    for (var i = l; i <= r; i++) {
        for (var j = l; j <= r ; j++) {
            if (i <= j) { 
                var xor = i ^ j;
                if (xor > max) {
                    max  = xor;
                }
            }
        }
    }
    return max;
}
{% endhighlight %}

The solution ended up being more condensed than I had hoped. My original solution resembled:

{% highlight javascript linenos %}
function createPairs(l, r) {
    var result = [];
    for (var i = l; i <= r; i++) {
        for (var j = l; j <= r ; j++) {
            if (i <= j) { 
                result.push([i, j]);
            }
        }
    }
    return result;
}

function maxXor(l, r) {
    var l = parseInt(l, 10), r = parseInt(r, 10);
    var pairs = createPairs(l, r)
    var xors = pairs.map(function(pair) {
      return pair[0] ^ pair[1];
    });
    return Math.max.apply(Math, xors);
}
{% endhighlight %}

I'll walk through my original solution first. `maxXor` takes two Strings of Numbers that ranged from \\(1 ≤ L ≤ R ≤ 10^{3}\\). The function must return the maximal values of A xor B given, \\(L ≤ A ≤ B ≤ R\\). First, we need the Numbers out of the Strings (line 14). Next, delegate to creating all possible pairs of A and B given the constraints of the problem. The function `createPairs` runs a two dimensional loop that returns an Array of Arrays (the inner Array representing a 'pair'). Next, xor all of the pairs, obtaining a new Array of Numbers. Next, courtesy of John Resig's [advice](http://ejohn.org/blog/fast-javascript-maxmin/) find the max Number of the Array. 

Unfortunately, `Max.apply` yields a `RangeError: Maximum call stack size exceeded` for `l=1, r=1000`. Surprisingly, `Function.prototype.apply` can [only receive an array of limited length](http://stackoverflow.com/a/20940386/1950772) and since the result of `createPairs(1, 1000)` is quite large, yet well within the problem constraints, we'll need to re-think finding the max approach. We could either find a better way to determine the max value of an Array of values, or we could keep a running value of the max. A quick glance over maxXor told me that runtime could be trivially optimized from it's current \\(O(3nm)\\) to a semi-palatable \\(O(nm)\\) if we did maintained everything in the loops. Since this was still pretty simple, I went with it. If this were production code, and optimization was not yet a concern, I'd consider organizing the code how I'd originally done for readability.
