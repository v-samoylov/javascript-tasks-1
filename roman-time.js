var hours = parseInt(process.argv[2]);
var minutes = parseInt(process.argv[3]);
var resultIndexes = [];
var arabicNumerals = [1, 5, 10, 50];
var romanNumerals = ['', '', '', '', '', '']

romanNumerals[0] = '.___.'+
                   '|   |'+
                   '|   |'+
                   '|   |'+
                   '|___|'+
                   '     ';
romanNumerals[1] = '____   ____'+
                   '\\   \\ /   /'+
                   ' \\   Y   / '+
                   '  \\     /  '+
                   '   \\___/   '+
                   '           ';
romanNumerals[2] = '____  ___'+
                   '\\   \\/  /'+
                   ' \\     / '+
                   ' /     \\ '+
                   '/___/\\  \\'+
                   '      \\_/';

romanNumerals[3] = '.___.    '+
                   '|   |    '+
                   '|   |___.'+
                   '|       |'+
                   '|_______|'+
                   '         ';
romanNumerals[4] = '      '+
                   '|\\   |'+
                   '| \\  |'+
                   '|  \\ |'+
                   '|   \\|'+
                   '      ';
romanNumerals[5] = '       '+
                   '   _   '+
                   '  |_|  '+
                   '   _   '+
                   '  |_|  '+
                   '       ';

function joinAsciiNumerals (indexes_array) {
    /* j - счетчик строк
       i - счетчик римских цифр и знаков
       c - счетчик  столбцов */
    var result = '';
    var j = 0;
    while (j < 6) {
      for (var i = 0; i < indexes_array.length; i++) {
        var asciiNumeral = romanNumerals[indexes_array[i]];
        var numeralWidth = asciiNumeral.length / 6;
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
    var result = '';
    if (number == 0) {
      resultIndexes.push(4);
    }
    while (number != 0) {
        /* перебираем числа, начиная с последнего, 
           в массиве arabicNumerals для того, чтобы 
           найти подходящее для записи римское число */
        for (var i = 3; i >= 0; i--) { 
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
}

if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    console.log('Время указано не верно!');
}
else {
    convertNumber(hours);
    resultIndexes.push(5);
    convertNumber(minutes);
    console.log(joinAsciiNumerals(resultIndexes)); 
}
