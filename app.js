const api = axios.create({
    baseURL: "https://axios-api-v4um.onrender.com"
});

let section = "users";
let records = [];

const $ = selector => document.querySelector(selector);

async function listar(endpoint = `/${section}`) {
    try {
        const { data } = await api.get(endpoint);
        return data;
    } catch (erro) {
        console.log("Erro na consulta: ", erro.message);
        return[];
    }
}

function render() {
    const isUsers = section === "users";
    $(`#page-title`).textContent = isUsers ? "Usuários" : "Produtos"
    $(`#table-head`).innerHTML = isUsers
    ? "<tr><th>ID</th><th>Nome</th><th>E-mail</th></tr>"
    : "<tr><th>ID</th><th>Produtos</th><th>Preço</th></tr>";
    $(`#table-body`).innerHTML = records.map(
        item => `
        <tr>
            <td>${item.id ?? "-"}</td>
            <td>${item.name ?? "-"}</td>
        `
    );
}

async function carregar() {
    records = await listar();
    render();
    console.log(records);
}

carregar();