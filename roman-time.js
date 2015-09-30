var hours = parseInt(process.argv[2]);
var minutes = parseInt(process.argv[3]);

function convertNumber(n) {
    var result = '';
    var romanNumerals = ['I', 'V', 'X', 'L'];
    var arabicNumerals = [1, 5, 10, 50];

    while (n != 0) {
        for (i = 3; i >= 0; i--) {
            j = i - 2 + i % 2;
            while (n / arabicNumerals[i] >= 1) {
                result += romanNumerals[i];
                n -= arabicNumerals[i];
            }
            while (j >= 0 && n / (arabicNumerals[i] - arabicNumerals[j]) >= 1) {
                result += romanNumerals[j] + romanNumerals[i];
                n -= arabicNumerals[i] - arabicNumerals[j];
            }
        }
    }
    return result
}

if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59)
    console.log('Время указано не верно!');
else 
    console.log(convertNumber(hours)+':'+convertNumber(minutes));
