const materiais = {
    "promocional100g": { "ar": 28.00, "gf": 25.00, "verniz": true, "recorte": true, "complemento": "do Vinil Promocional 100G"},

    "promocional120g": { "ar": 32.00, "gf": 30.00, "verniz": true, "recorte": true, "complemento": "do Vinil Promocional 120G"},

    "avery": { "ar": 35.00, "gf": 33.00, "verniz": true, "recorte": true, "complemento": "do Vinil Avery"},

    "blackout": { "ar": 35.00, "gf": 33.00, "verniz": true, "recorte": true, "complemento": "do Vinil Blackout"},

    "transparente": { "ar": 38.00, "gf": 35.00, "verniz": false, "recorte": true, "complemento": "do Vinil Transparente"},

    "fosco": { "ar": 35.00, "gf": 33.00, "verniz": true, "recorte": true, "complemento": "do Vinil Fosco"},

    "perfurado": { "gf": null, "ar": 35.00, "verniz": false, "recorte": false, "complemento": "do Vinil Perfurado"},

    "lona440": { "ar": 35.00, "gf": 32.00, "verniz": true, "recorte": false, "banner": true, "complemento": "da Lona 440g"},

    "lona340": { "ar": 34.00, "gf": 31.00, "verniz": true, "recorte": false, "banner": true, "complemento": "da Lona 340g"},

    "outdoor": { "ar": 15.00, "gf": 15.00, "verniz": false, "recorte": false, "complemento": "do Papel Outdoor"},

    "acabamentos": { "recorte": 10.00, "verniz": 14.00, "bannerate70cm": 8.00, "bannerate120cm": 10.00, "bannerate145cm": 12.00, "bannerate200cm": 20.00, "semacabamentodebanner": 0.00}
    
};

const ids = {
    material: document.querySelector("#material_opt"),
    resolucao: document.querySelector("#resolucao_opt"),
    verniz: document.querySelector("#boxverniz"),
    recorte: document.querySelector("#boxrecorte"),
    banner: document.querySelector("#banner"),
    banner_opt: document.querySelector("#banner_opt"),
    semacabamentos: document.querySelector("#semacabamentos"),
    comverniz: document.querySelector("#verniz"),
    comrecorte: document.querySelector("#recorte"),
    resultado: document.querySelector("#resultado"),
    quantidade: document.querySelector("#quantidade"),
    altura: document.querySelector("#altura"),
    largura: document.querySelector("#largura")
};

document.addEventListener("DOMContentLoaded", () => {
    ids.material.addEventListener("change", () => { acabamento(); calcular(); });
    ids.verniz.addEventListener("change", calcular);
    ids.recorte.addEventListener("change", calcular);
    ids.quantidade.addEventListener("input", calcular);
    ids.altura.addEventListener("input", calcular);
    ids.largura.addEventListener("input", calcular);
    ids.resolucao.addEventListener("change", calcular);
    ids.banner_opt.addEventListener("change", calcular);

    // primeira renderização
    acabamento();
    calcular();
});

function formatarNumero(valor) {
    // Corrige erro de ponto flutuante e remove zeros desnecessários
    let arredondado = Math.round(valor * 100) / 100;
    return arredondado % 1 === 0 ? arredondado.toString() : arredondado.toFixed(2).replace(/\.?0+$/, '');
}

function acabamento(){
    const materialSelecionado = ids.material.value

    ids.verniz.style.display = materiais[materialSelecionado].verniz ? "grid" : "none";
    ids.recorte.style.display = materiais[materialSelecionado].recorte ? "grid" : "none";
    ids.banner.style.display = materiais[materialSelecionado].banner ? "grid" : "none";

    const acabamentoDiv = document.getElementById("acabamento");

    if(materiais[materialSelecionado].banner){
        acabamentoDiv.style.gridTemplateRows = "20px 70px 50px 10px";
    } else{
        acabamentoDiv.style.gridTemplateRows = "10px 0px 1fr 10px";
    }

    ids.semacabamentos.style.display = (materiais[materialSelecionado].verniz || materiais[materialSelecionado].recorte) ? "none" : "grid";

    //SE !(NÃO)permite verniz (seleção do "comverniz" muda para não selecionado)
    if(!materiais[materialSelecionado].verniz) ids.comverniz.checked = false;
    if(!materiais[materialSelecionado].recorte) ids.comrecorte.checked = false;

    /*let permiteverniz = materiais[materialSelecionado].verniz;
    let permiterecorte = materiais[materialSelecionado].recorte;
    if(!permiteverniz) ids.comverniz.checked = false;
    if(!permiterecorte) ids.comrecorte.checked = false;*/

}
function calcular(){
    let material = ids.material.value;
    let resolucao = ids.resolucao.value;
    let comverniz = ids.comverniz.checked;
    let comrecorte = ids.comrecorte.checked;
    let altura = ids.altura.value / 100;
    let largura = ids.largura.value / 100;
    let quantidade = parseInt(ids.quantidade.value);
    let complemento = materiais[material].complemento;

    let uni = "unidade";
    let fica = "custa";


    let m2unitario = altura*largura;
    let m2total = m2unitario*quantidade;

    let precom2 = resolucao === "ar" ? materiais[material].ar : materiais[material].gf;

    if (comverniz){
        complemento += ` envernizado`;
        ids.verniz.style.background = "green";
        ids.verniz.style.color = "white";
        precom2 += materiais.acabamentos.verniz;
    } else {
        ids.verniz.style.background = "darkred";
        ids.verniz.style.color = "white";
    }

    if (comrecorte){
        complemento += ` com recorte`;
        ids.recorte.style.background = "green";
        ids.recorte.style.color = "white";
        precom2 += materiais.acabamentos.recorte;
    } else{
        ids.recorte.style.background = "darkred";
        ids.recorte.style.color = "white";
    }

    let total = quantidade * m2unitario * precom2;

    if(materiais[material].banner){
        let precoAcabamentoBanner = materiais.acabamentos[ids.banner_opt.value];
        total += quantidade * precoAcabamentoBanner;
    }

    if(material === "outdoor" && m2total < 1){
        total = materiais.outdoor.gf;
    }

    if(quantidade !== 1){
        uni = "unidades";
        fica = "custam";
    }

    let alturaFormatada = formatarNumero(altura * 100);
    let larguraFormatada = formatarNumero(largura * 100);

    ids.resultado.innerHTML = `<textarea>${quantidade} ${uni} ${complemento} no tamanho de ${alturaFormatada}x${larguraFormatada}cm ${fica} R$${total.toFixed(2)}</textarea>`;
}