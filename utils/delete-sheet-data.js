
const XLSX = require("xlsx");

async function deleteSheetData() {
    // Caminho do arquivo da planilha original
    const filePath = './planilha.xlsx';

    // Carrega o arquivo da planilha original
    const workbook = XLSX.readFile(filePath);

    // Obtém o nome da primeira planilha
    const sheetName = workbook.SheetNames[0];

    // Obtém a referência à primeira planilha
    const worksheet = workbook.Sheets[sheetName];

    // Encontra a última linha com dados
    const lastRow = XLSX.utils.decode_range(worksheet['!ref']).e.r;

    for (let row = 4; row <= lastRow + 1; row++) {
        const cellRefA = `A${row}`;
        const cellRefB = `B${row}`;
        const cellRefC = `C${row}`;
        worksheet[cellRefA] = { t: 's', v: '' };
        worksheet[cellRefB] = { t: 's', v: '' };
        worksheet[cellRefC] = { t: 's', v: '' };
    }
    XLSX.writeFile(workbook, filePath);

    console.log('Arquivo XLSX atualizado salvo com sucesso.');
}

module.exports = {
    deleteSheetData
}