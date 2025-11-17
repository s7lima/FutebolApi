const API_URL = "http://localhost:5038/api/Jogadores";

document.addEventListener("DOMContentLoaded", carregarJogadores);

const form = document.getElementById("playerForm");

// Carrega lista (versão de depuração: exibe 'time' também)
async function carregarJogadores() {
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error(`GET falhou: ${resp.status}`);
        const data = await resp.json();

        console.log("GET /api/Jogadores ->", data); // <--- cole o resultado do console aqui se quiser

        const table = document.getElementById("playersTable");
        table.innerHTML = "";

        data.forEach(j => {
            table.innerHTML += `
                <tr>
                    <td>${j.id}</td>
                    <td>${j.nome}</td>
                    <td>${j.time}</td>         <!-- mostramos o time -->
                    <td>${j.posicao}</td>     <!-- mostramos a posição -->
                    <td>${j.numeroCamisa}</td>
                    <td>
                        <button class="action-btn edit" onclick="editarJogador(${j.id})">Editar</button>
                        <button class="action-btn delete" onclick="excluirJogador(${j.id})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Erro carregarJogadores:", err);
        alert("Erro ao carregar jogadores — veja console do navegador.");
    }
}

// Envio do formulário (create/update)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("playerId").value;

    const jogador = {
        id: id ? parseInt(id) : 0,
        nome: document.getElementById("nome").value,
        time: "Velo Clube",
        posicao: document.getElementById("posicao").value,
        numeroCamisa: parseInt(document.getElementById("numeroCamisa").value)
    };

    let method = "POST";
    let url = API_URL;

    if (id) {
        method = "PUT";
        url = `${API_URL}/${id}`;
    }

    try {
        const resp = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jogador)
        });

        if (!resp.ok) {
            const text = await resp.text();
            console.error("Erro na resposta:", resp.status, text);
            alert(`Erro: ${resp.status} - ${text}`);
            return;
        }

        form.reset();
        carregarJogadores();
    } catch (err) {
        console.error("Erro ao enviar:", err);
        alert("Erro ao enviar dados — veja console do navegador.");
    }
});

// Editar
async function editarJogador(id) {
    try {
        const resp = await fetch(`${API_URL}/${id}`);
        if (!resp.ok) throw new Error(`GET /${id} falhou: ${resp.status}`);
        const j = await resp.json();

        document.getElementById("playerId").value = j.id;
        document.getElementById("nome").value = j.nome;
        document.getElementById("posicao").value = j.posicao;
        document.getElementById("numeroCamisa").value = j.numeroCamisa;
    } catch (err) {
        console.error("Erro editarJogador:", err);
        alert("Erro ao obter jogador — veja console do navegador.");
    }
}

// Excluir
async function excluirJogador(id) {
    if (!confirm("Deseja excluir este jogador?")) return;

    try {
        const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!resp.ok) throw new Error(`DELETE falhou: ${resp.status}`);
        carregarJogadores();
    } catch (err) {
        console.error("Erro excluirJogador:", err);
        alert("Erro ao excluir jogador — veja console do navegador.");
    }
}
