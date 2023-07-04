const XLSX = require("xlsx");
const puppeteer = require("puppeteer");

const { deleteSheetData } = require('./utils/delete-sheet-data');
const { createNewSheet } = require('./utils/create-new-sheet');
const { fetchCandidatesVotes } = require('./utils/fetch-candidates-votes');
const { fetchSessions } = require('./utils/fetch-sessions');
const { fetchVotesBySession } = require('./utils/fetch-votes-by-session');
const { insertSheetVotes } = require('./utils/insert-sheet-votes');
const { findSessionColumnByNumber } = require('./utils/find-session-column-by-number');
const { findCandidateRowByName } = require('./utils/find-candidate-row-by-name');

async function insertSessionsSheetValues(worksheet, position, value) {
    const cellRef = `${position}`;
    worksheet[cellRef] = { t: 's', v: value };
}

async function main() {
    await deleteSheetData();
    const { worksheet, workbook, maxColumnNumber } = await createNewSheet();

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const candidatesVotes = [];
    const [mayorsData, aldermenData] = await fetchCandidatesVotes(page);

    candidatesVotes.push({
        mayors: mayorsData,
        aldermen: aldermenData,
    });

    await insertSheetVotes(worksheet, 'MAYOR', candidatesVotes[0].mayors);
    await insertSheetVotes(worksheet, 'ALDERMAN', candidatesVotes[0].aldermen);

    const filePath = './planilha.xlsx';
    XLSX.writeFile(workbook, filePath);
    console.log(`Arquivo ${filePath} atualizado com os votos de todos candidatos.`);

    const sessions = await fetchSessions(page);

    const results = [];
    for (const session of sessions) {
        const [mayorsData, aldermenData] = await fetchVotesBySession(page, session);
        const size = Math.ceil(aldermenData.length / 3);
        const smallArray1 = aldermenData.slice(0, size);
        const smallArray2 = aldermenData.slice(size, size * 2);
        const smallArray3 = aldermenData.slice(size * 2);
        results.push({
            session,
            mayors: mayorsData,
            aldermen: [
                smallArray1,
                smallArray2,
                smallArray3,
            ]
        });
    }

    await Promise.all(
        results.map(async (result) => {
            const col = await findSessionColumnByNumber(worksheet, result.session, maxColumnNumber);
            await Promise.all(
                result.mayors.map(async el => {
                    const row = await findCandidateRowByName(worksheet, el.name, maxColumnNumber);
                    if (col && row) {
                        const letter = col.match(/[a-zA-Z]+/g).join("");
                        const number = row.match(/\d+/g).join("");

                        const cell = letter + number;

                        console.log('mayors', {
                            row,
                            rowLength: row.length,
                            cell,
                            col,
                        });
                        await insertSessionsSheetValues(worksheet, cell, el.vote);
                    }
                }),
            );
            await Promise.all(
                result.aldermen[0].map(async el => {
                    const row = await findCandidateRowByName(worksheet, el.name, maxColumnNumber);

                    if (col && row) {
                        const letter = col.match(/[a-zA-Z]+/g).join("");
                        const number = row.match(/\d+/g).join("");

                        const cell = letter + number;

                        console.log('aldermen', {
                            row,
                            rowLength: row.length,
                            cell,
                            col,
                        });
                        await insertSessionsSheetValues(worksheet, cell, el.vote);
                    }
                }),
            );
            await Promise.all(
                result.aldermen[1].map(async el => {
                    const row = await findCandidateRowByName(worksheet, el.name, maxColumnNumber);

                    if (col && row) {
                        const letter = col.match(/[a-zA-Z]+/g).join("");
                        const number = row.match(/\d+/g).join("");

                        const cell = letter + number;

                        console.log('aldermen', {
                            row,
                            rowLength: row.length,
                            cell,
                            col,
                        });
                        await insertSessionsSheetValues(worksheet, cell, el.vote);
                    }
                }),
            );
            await Promise.all(
                result.aldermen[2].map(async el => {
                    const row = await findCandidateRowByName(worksheet, el.name, maxColumnNumber);

                    if (col && row) {
                        const letter = col.match(/[a-zA-Z]+/g).join("");
                        const number = row.match(/\d+/g).join("");

                        const cell = letter + number;

                        console.log('aldermen', {
                            row,
                            rowLength: row.length,
                            cell,
                            col,
                        });
                        await insertSessionsSheetValues(worksheet, cell, el.vote);
                    }
                }),
            );
        }));
    XLSX.writeFile(workbook, filePath);
    console.log(`Arquivo ${filePath} atualizado com os votos dos candidatos em cada sessão.`);
    await browser.close();
}

main();