import { format } from "date-fns";
import { sv } from "date-fns/locale";

const sentenceSeparators = [".", "!", "?"];

const capitalizeFirst = input => input.charAt(0).toUpperCase() + input.substring(1);

export const capitalizeSentences = input => {
    sentenceSeparators.forEach(separator => {
        separator = separator + " ";
        input = input.split(separator).map(capitalizeFirst).join(separator);
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

export const replaceWeekdays = input => input.replace("[veckodag]", format(new Date(), "cccc", { locale: sv }));
