async function fetchCandidatesVotes(page) {
    const mayorsData = [];
    const aldermenData = [];
    // 2020
    // await page.goto(
    //     `https://resultados.tre-rs.jus.br/eleicoes/2020/426/RS85596.html`
    // );

    await page.goto('https://resultados.tre-rs.jus.br/eleicoes/2016/1turno/RS85596.html');
    const tableElements = await page.$$("table.list_table");
    const mayorRows = await tableElements[0].$$("tr");
    const aldermenRows = await tableElements[2].$$("tr");

    for (const row of mayorRows) {
        const cells = await row.$$("td");

        const obj = {};
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const data = await page.evaluate((el) => el.textContent, cell);
            if (i === 1) {
                let palavras = data.split(' ');

                let nomeFormatado = palavras.map(function (palavra) {
                    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
                });
                obj.name = nomeFormatado.join(' ');
            }
            if (i === 4) obj.votes = data;
        }
        mayorsData.push(obj);
    }
    mayorsData.shift();
    mayorsData.splice(-2);

    for (const row of aldermenRows) {
        const cells = await row.$$("td");
        const obj = {};
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const data = await page.evaluate((el) => el.textContent, cell);
            if (i === 1) {
                let palavras = data.split(' ');

                let nomeFormatado = palavras.map(function (palavra) {
                    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
                });
                obj.name = nomeFormatado.join(' ');
            }
            if (i === 4) obj.votes = data;
        }
        aldermenData.push(obj);
    }
    aldermenData.shift();
    aldermenData.splice(-2);

    return [mayorsData, aldermenData];
}

module.exports = {
    fetchCandidatesVotes,
}