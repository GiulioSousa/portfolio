let text = document.getElementById('text')
const nomes = ["Giulio Sousa", "Desenvolvedor PHP/Laravel", "Freelancer"]
const delayEscrever = [4000, 5000, 3000]
const delayApagar = [1500, 3000, 2000]

function escrever(nome) {
    return new Promise(resolve => {
        nome.split('').forEach((letter, i) => {
            setTimeout(() => {
                text.textContent += letter
            }, 100 * i);
        });
        resolve();
    })
}

function apagar() {
    return new Promise(resolve => {
        for (let i = text.textContent.length; i >= 0; i--) {
            setTimeout(() => {
                text.textContent = text.textContent.substring(0, text.textContent.length - 1)
            }, (text.textContent.length - i) * 100);
        }
        resolve();
    })
}

function timeout(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo))
}

function executar() {
    
    let indice = 0;
    
    async function bloco() {
        await escrever(nomes[indice])
        await timeout(delayEscrever[indice])
        await apagar()
        await timeout(delayApagar[indice])
        indice++
        if (indice >= nomes.length) {
            indice = 0
        }
    }

    function executarBloco() {
        return bloco().then(() => {
            if (indice < nomes.length) {
                return executarBloco()
            }
        })
    }

    return executarBloco();
}

executar();
