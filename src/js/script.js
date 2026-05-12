// DECLARAÇÕES DOS ELEMENTOS USAMDO DOM
const videoEelemento = document.getElementById("video");
const botaoScanner = document.getElementById("btn-texto");
const resultado = document.getElementById("resultado");
const canvas = document.getElementById("canvas");


// FUNÇÃO QUE HABILITA A CÂMERA
async function configuraCamera(){
    try{
        const midid =await navigator.mediaDevices.getUserMedia({
            video: {facingMode: "environment"},// aciona a ca,era traseira
            audio: false
        });
        // recebe a função midi para habilitar a camera
        videoElemento.srcObject = midia;
        //garante que o video comece
        videoElemento.onplay();

    }catch(erro){
        resultado.innerText="Erro ao acessar a camera";
    }
}
// executa a função camera
configurarCamera();

// função para ler o texto que  a camera pegar
botaoScanear.onclick = async ()=>{
    botaoScanear.disable=true; //habilita a camera
    resultado.innerText="Fazendo a leitura...aguarde";

    //preparando o canvas pra criar estrutura da camera
    const contexto = canvas.getContext("2d");

    //ajustar o tamanho  do canvas
    canvas.widht = videoElemento.videoWidth; //largura
    canvas.height = videoElemento.videoHeight; //altura

    //reset para garantir que a foto nao saia invertida
    contexto.setTransform(1,0,0,1,0,0)

    //filtro de contraste e escala de cinza antes de tirar a foto
    //ajuda a evitar as letras aleatorias
    contexto.filter = 'contrast(1.2) grayscale(1)';
 try{
    const { data: { text }} =await Tesseract.recognize(
        canvas, //aonde o texto vai aparecer
        'por' //idioma do texto
    );
    //remove espaços excessivos e caracteres especiais
    const textoFinal = text.trim();
    resultado.innerText = textoFinal.lenght > 0 ? textoFinal : "Não foi possivel identificar o textp";

    }catch(erro){
        console.error(erro);
        resultado.innerText="Erro ao processar",erro
    }
    finally{
        // desabilita a câmera para fazer uma nova captura
        botaoScanear.disable=false; 
    }


}
 