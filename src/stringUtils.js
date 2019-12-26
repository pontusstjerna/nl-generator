const sentenceSeparators = [".", "!", "?"];

const capitalizeFirst = input => input.charAt(0).toUpperCase() + input.substring(1);

const split = (input, separators) => {
    let result = input.split(separators[0]);
    separators.forEach(separator => {
        result = result.flatMap(part => part.split(separator));
    });

    return result;
};

const splitJoin = (input, divider, fn) => input.split(divider).map(fn).join(divider);

export const capitalizeSentences = input => {
    sentenceSeparators.forEach(separator => {
       input = splitJoin(input, separator + " ", capitalizeFirst);
    });
    return input;
};

export const removeLastSentence = input => {
    let lastSentenceEndIndex = 0;
    for (let i = 0; i < input.length; i++) {
        if (sentenceSeparators.includes(input.charAt(i)) && i > lastSentenceEndIndex) {
            lastSentenceEndIndex = i;
        }
    }

    return input.substring(0, lastSentenceEndIndex + 1);
};