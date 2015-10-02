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

var NUMERALS_NUMBER = 3;
var ROMAN_ZERO = 4;
var COLON = 5;
var NUMERAL_HEIGHT = 6;

function joinAsciiNumerals (indexesArray) {
    var indexesArray;
    var result = '';    
    /* j - счетчик строк
       i - счетчик римских цифр и знаков
       c - счетчик  столбцов */
    var j = 0;
    while (j < NUMERAL_HEIGHT) {
        for (var i = 0; i < indexesArray.length; i++) {
            var asciiNumeral = romanNumerals[indexesArray[i]];
            var numeralWidth = asciiNumeral.length / NUMERAL_HEIGHT;
            for (var c = j*numeralWidth; c < j*numeralWidth + numeralWidth; c++) {
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
    var j;
    var resultIndexes = [];
    if (number == 0) {
        resultIndexes.push(ROMAN_ZERO);
        return resultIndexes;
    }
    while (number != 0) {
        /* перебираем числа, начиная с последнего, 
           в массиве arabicNumerals для того, чтобы 
           найти подходящее для записи римское число */
        for (var i = NUMERALS_NUMBER; i >= 0; i--) { 
            /* j - индекс числа, которое можно вычесть
               из взятого по индексу i */
            j = i - 2 + i % 2;
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
    result.push(COLON);
    result = result.concat(convertNumber(minutes));
    console.log(joinAsciiNumerals(result));
}
