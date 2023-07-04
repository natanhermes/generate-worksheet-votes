const XLSX = require("xlsx");

async function createNewSheet() {
    // Caminho do arquivo da planilha original
    const filePath = './planilha.xlsx';

    // Carrega o arquivo da planilha original
    const workbook = XLSX.readFile(filePath);

    // Obtém o nome da primeira planilha
    const sheetName = workbook.SheetNames[0];

    // Obtém a referência à primeira planilha
    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const minRowNumber = range.s.r;
    const maxRowNumber = range.e.r;
    const minColumnNumber = range.s.c;
    const maxColumnNumber = range.e.c;


    return { worksheet, workbook, minRowNumber, maxRowNumber, minColumnNumber, maxColumnNumber };
}

module.exports = {
    createNewSheet,
}