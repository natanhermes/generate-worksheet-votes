async function fetchSessions(page) {
    // 2020
    // await page.goto(
    //     "https://resultados.tre-rs.jus.br/eleicoes/2020/426/85596/secoes.html"
    // );
    await page.goto('https://resultados.tre-rs.jus.br/eleicoes/2016/1turno/85596/secoes.html')
    const sessions = [];
    const tableElement = await page.waitForSelector("table.list_table");
    const rows = await tableElement.$$("tr");

    for (const row of rows) {
        const cells = await row.$$("td");
        for (const cell of cells) {
            const data = await page.evaluate((el) => el.textContent, cell);
            sessions.push(data);
        }
    }
    return sessions;
}

module.exports = {
    fetchSessions,
}