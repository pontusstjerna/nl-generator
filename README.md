# Natural Language generation using KD-trees

The goal of this small project is to generate a reasonable sentence or piece of text based on
text samples with a certain subject, such as blog posts, chats or horoscopes. 

## The algorithm
The algorithm uses a KD-tree inspired approach to generate new words depending on `k-1` 
previous words. 

### The learning process
When learning, the input text is split up by spaces and newlines. It is then processed
 and saved  per word in an array with `k-1` previous words. We call this an entry. 
 If it has no previous words, `undefined` will be used instead.  
 
For example, if the sentences "Hello world! This is a natural language generation test"
 would be used for learning it would be saved on the following format, if `k = 3`:
 
```
[[undefined, undefined, "Hello"], [undefined, "Hello", "world!"], 
 [undefined, undefined, "This"], [undefined, "This", "is"],
 ["This", "is", "a"], ["is", "a", "natural"], ["a", "natural", "language"],
 ["natural", "language", "geerator"], ["language", "generator", "test"]] 
```
 
### Generation
For the actual generation, the algorithm simply matches an input string's 
 words and finds the best match for the next word. Using the input "natural language" as
 input would create the array `[undefined, "natural", "language"]` and would match
 closest to the entry `["a", "natural", "language"]`. This would then generate the new
 word "language". 
 
This can then be done in a loop, starting with an input or simply the empty string, to
 generate text.
 
### Scoring
There are currently two different scoring functions: linear score or constant score. 
This is an ongoing experiment and can change in the future.

#### Constant score
Every matching word generates 1 point, and the sum of points is the score.

```
["a", "natural", "language"]
[undefined, "natural", "language"]
```

The example above would reward 2 score. 

#### Linear score
Every matching word generates `i+1` points, depending on where in the entry the match 
occurs. The sum of points is the score.

```
["a", "natural", "language"]
[undefined, "natural", "language"]
```

The example above would reward 5 score, 0 points for `"a" !== undefined`, 
2 points for `"natural" === "natural"` and 3 points for `"language" === "language"`.  
