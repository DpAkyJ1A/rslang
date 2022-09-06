// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any) => {
    for (let n = array.length - 1; n > 0; n--) {
        const j = Math.floor(Math.random() * (n + 1));

        [array[n], array[j]] = [array[j], array[n]];
    }

    return array;
};
