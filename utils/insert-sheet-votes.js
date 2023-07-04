async function insertSheetVotes(worksheet, candidatesType, candidates) {
    let startRow;
    if (candidatesType === 'MAYOR') {
        startRow = 4;
    } else if (candidatesType === 'ALDERMAN') {
        startRow = 9;
    }

    candidates.forEach((candidate, index) => {
        const cellRefA = `A${startRow + index}`;
        const cellRefB = `B${startRow + index}`;
        const { name, votes } = candidate;
        worksheet[cellRefA] = { t: 's', v: name };
        worksheet[cellRefB] = { t: 's', v: votes };
    });
}

module.exports = {
    insertSheetVotes,
}