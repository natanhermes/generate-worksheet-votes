const XLSX = require('xlsx');

async function findSessionColumnByNumber(worksheet, session, maxColumnNumber) {
    let celulaEncontrada = null;

    for (let col = 1; col <= maxColumnNumber; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 3 - 1, c: col - 1 });
        const cellValue = worksheet[cellRef]?.v;

        if (cellValue?.toString() === session.toString()) {
            celulaEncontrada = cellRef;
            break;
        }
    }

    return celulaEncontrada || null;
}

module.exports = {
    findSessionColumnByNumber,
}