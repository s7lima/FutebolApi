const API_URL = "http://localhost:5038/api/Jogadores";

document.addEventListener("DOMContentLoaded", carregarJogadores);

const form = document.getElementById("playerForm");

// Carrega lista
async function carregarJogadores() {
    const resp = await fetch(API_URL);
    const data = await resp.json();

    const table = document.getElementById("playersTable");
    table.innerHTML = "";

    data.forEach(j => {
        table.innerHTML += `
            <tr>
                <td>${j.id}</td>
                <td>${j.nome}</td>
                <td>${j.time}</td>
                <td>${j.posicao}</td>
                <td>${j.numeroCamisa}</td>
                <td>
                    <button class="action-btn edit" onclick="editarJogador(${j.id})">Editar</button>
                    <button class="action-btn delete" onclick="excluirJogador(${j.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// Envio do formulário (create/update)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jogador = {
        nome: document.getElementById("nome").value,
        time: "Velo Clube",
        posicao: document.getElementById("posicao").value,
        numeroCamisa: parseInt(document.getElementById("numeroCamisa").value)
    };

    const id = document.getElementById("playerId").value;

    let method = "POST";
    let url = API_URL;

    if (id) {
        method = "PUT";
        url = `${API_URL}/${id}`;
    }

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jogador)
    });

    form.reset();
    carregarJogadores();
});

// Editar
async function editarJogador(id) {
    const resp = await fetch(`${API_URL}/${id}`);
    const j = await resp.json();

    document.getElementById("playerId").value = j.id;
    document.getElementById("nome").value = j.nome;
    document.getElementById("posicao").value = j.posicao;
    document.getElementById("numeroCamisa").value = j.numeroCamisa;
}

// Excluir
async function excluirJogador(id) {
    if (!confirm("Deseja excluir este jogador?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    carregarJogadores();
}
