    function capturarIds(){
        let material = document.querySelector("#material_opt").value;
        let resolucao = document.querySelector("#resolucao_opt").value;
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let semacabamentos = document.querySelector("#semacabamentos");
        let comverniz = document.querySelector("#verniz");
        let comrecorte = document.querySelector("#recorte");
        let resultado = document.querySelector("#resultado");
        let quantidade = document.querySelector("#quantidade").value;
        let altura = document.querySelector("#altura").value / 100;
        let largura = document.querySelector("#largura").value / 100;
        return material, resolucao, verniz, recorte, semacabamentos, comverniz, comrecorte, resultado, quantidade, altura, largura;
    }
    
    
    function acabamento(){
        let permiteverniz = materiais[capturarIds().material].verniz;
        let permiterecorte = materiais[capturarIds().material].recorte;

        capturarIds().verniz.style.display = permiteverniz ? "grid" : "none";
        capturarIds().recorte.style.display = permiterecorte ? "grid" : "none";

        capturarIds().semacabamentos.style.display = (permiteverniz || permiterecorte) ? "none" : "grid";

        //SE !(NÃO)permite verniz (seleção do "comverniz" muda para não selecionado)
        if(!permiteverniz) capturarIds().comverniz.checked = false;
        if(!permiterecorte) capturarIds().comrecorte.checked = false;

    }