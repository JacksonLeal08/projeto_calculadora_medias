
// Código JavaScript para o projeto de controle de notas
const form = document.getElementById('form-atividade');
const imgAprovado = '<img scr="./imagens//aprovado.png" alt="Emoji Feliz" />';
const imgReprovado = '<img scr="./imagens/reprovado.png" alt="Emoji Decepcionado" />';
const atividades = []; // Array para armazenar as atividades
const notas = []; // Array para armazenar as notas
const spanAprovado = '<span class="resultado aprovado" id="aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado" id="reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = '';
form.addEventListener('submit' , function (e) {
    e.preventDefault();

    AddLinhas(); // Adiciona a linha na tabela
    AtualizaTabela(); // Atualiza a tabela
    atualizaMediaFinal(); // Atualiza a média final
});

// Função para adicionar linhas na tabela
function AddLinhas (){ 
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A Materia: ${inputNomeAtividade.value} já foi inserida!`)
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        let linha = `<tr>`;
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;
        
        linhas += linha;
    }


    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// Função para atualizar a tabela
function AtualizaTabela() { 
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

// Função para calcular a média
function atualizaMediaFinal() {
    const mediaFinal = calcularMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    
    return somaDasNotas / notas.length;
}