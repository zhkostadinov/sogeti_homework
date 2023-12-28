export async function getContentType(inputArray) {
    for (var el in inputArray) {        
        if (inputArray[el]['name'] === 'Content-Type') {
            return inputArray[el]['value']
        }
    }
}

export async function convertMilisecondsToSeconds(tmsStart, tmsEnd) {
    return ((Math.abs(tmsEnd - tmsStart)) / 1000);
}