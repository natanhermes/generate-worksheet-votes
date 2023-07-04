const XLSX = require('xlsx');

async function findCandidateRowByName(worksheet, name, maxColumnNumber) {
    let celulaEncontrada = null;

    for (let row = 1; row <= maxColumnNumber; row++) {
        const cellRef = XLSX.utils.encode_cell({ r: row - 1, c: 1 - 1 });
        const cellValue = worksheet[cellRef]?.v;

        if (cellValue?.toString() + ' ' === name.toString()) {
            celulaEncontrada = cellRef;
            break;
        }
    }

    return celulaEncontrada || null;
}

module.exports = {
    findCandidateRowByName,
}