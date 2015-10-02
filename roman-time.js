var hours = parseInt(process.argv[2]);
var minutes = parseInt(process.argv[3]);

var arabicNumerals = [1, 5, 10, 50];
var romanNumerals = [
    '.___.'+
    '|   |'+
    '|   |'+
    '|   |'+
    '|___|'+
    '     ',
    '____   ____'+
    '\\   \\ /   /'+
    ' \\   Y   / '+
    '  \\     /  '+
    '   \\___/   '+
    '           ',
    '____  ___'+
    '\\   \\/  /'+
    ' \\     / '+
    ' /     \\ '+
    '/___/\\  \\'+
    '      \\_/',
    '.___.    '+
    '|   |    '+
    '|   |___.'+
    '|       |'+
    '|_______|'+
    '         ',
    '      '+
    '|\\   |'+
    '| \\  |'+
    '|  \\ |'+
    '|   \\|'+
    '      ',
    '       '+
    '   _   '+
    '  |_|  '+
    '   _   '+
    '  |_|  '+
    '       '
] 

function joinAsciiNumerals (indexesArray) {
    var indexesArray;
    var result = '';    
    var NUMERALS_HEIGHT = 6;
    /* j - счетчик строк
       i - счетчик римских цифр и знаков
       c - счетчик  столбцов */
    var j = 0;
    
    while (j < NUMERALS_HEIGHT) {
        for (var i = 0; i < indexesArray.length; i++) {
            var numeralIndex = indexesArray[i];
            var asciiNumeral = romanNumerals[numeralIndex];
            var numeralWidth = asciiNumeral.length / NUMERALS_HEIGHT;
            for (var c = j*numeralWidth; c < (j + 1)*numeralWidth; c++) {
                result += asciiNumeral[c];
            }
        }
        result += '\n';
        j += 1;
    }
    return result;
}          

function convertNumber(number) {
    var number;
    var resultIndexes = [];
    if (number == 0) {
        var ZERO_INDEX = 4;
        resultIndexes.push(ZERO_INDEX);
        return resultIndexes;
    }
    while (number != 0) {
        /* перебираем числа, начиная с последнего, 
           в массиве arabicNumerals для того, чтобы 
           найти подходящее для записи римское число */
        for (var i = arabicNumerals.length - 1; i >= 0; i--) { 
            /* j - индекс числа, которое можно вычесть
               из взятого по индексу i */
            var j = i - 2 + i % 2;
            while (number / arabicNumerals[i] >= 1) {
                resultIndexes.push(i);
                number -= arabicNumerals[i];
            }
            if (j >= 0 && number / (arabicNumerals[i] - arabicNumerals[j]) >= 1) {
                resultIndexes.push(j);
                resultIndexes.push(i);
                number -= arabicNumerals[i] - arabicNumerals[j];
            }
        }
    }
    return resultIndexes;
}

if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    console.log('Время указано не верно!');
}
else {
    var result = convertNumber(hours);
    var COLON_INDEX = 5;
    result.push(COLON_INDEX);
    result = result.concat(convertNumber(minutes));
    console.log(joinAsciiNumerals(result));
}
