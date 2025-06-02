export const renderPhrase = (number) => {
    const lastTwoDigits = String(number).slice(-2);
    const arrayLetters = String(number).split("");
    if (
        (lastTwoDigits !== "12" &&
            arrayLetters[arrayLetters.length - 1] === "2") ||
        (lastTwoDigits !== "13" &&
            arrayLetters[arrayLetters.length - 1] === "3") ||
        (lastTwoDigits !== "14" &&
            arrayLetters[arrayLetters.length - 1] === "4")
    ) {
        return "человека тусанут";
    }
    return "человек тусанет";
};
