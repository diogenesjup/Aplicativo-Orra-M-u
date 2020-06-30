class Loja{

    constructor(){

        let $ = document.querySelector.bind(document);
         
        this._produtos = {};
        this._checkout = {};
        this._countCarrinho = 0;
        this._countCarrinhoValor = 0.0;
        
        this._btnAddToCart = $("#addCarrinhoProduto");     
        this._carrinhoHtml = $("#listagemDeProdutosCarrinho .carrinho");

        
    }


    // SALVAR TODOS OS PRODUTOS NA MEMÓRIA 
    declararLocalStorage(produtos){
        localStorage.setItem("listProdutos",JSON.stringify(produtos));
    }

    // DECLARANDO GALERIAS DOS PRODUTOS
    galeria(galerias){
        localStorage.setItem("galeriaProdutos",JSON.stringify(galerias));
    }
    

    // PROCESSAR AS ROTINAS INTERNAS DO DETALHE DO PRODUTO
    rotinasInterna(idProduto){

        localStorage.setItem("idProdutoDetalhe",idProduto);

        this._btnAddToCart.setAttribute("data-id",idProduto);

         let listaProdutos = this.recuperarLocalStorage();
         let dadosProdutos  = [];
         let galeriaProduto = [];
         
         // FILTRAR PELOS DADOS
         listaProdutos.reduce(function(info, n){
              if(n.id==idProduto){
                dadosProdutos = n;
                 return n;
              }
          }, []);
         
         // ALIMENTAR A GALERIA DOS PRODUTOS
         galeriaProduto.push(this.getGaleria(idProduto));    
         
         console.log("GALERIA DO PRODUTO:");
         console.log(galeriaProduto);
         
         // GALERIA DE IMAGENS
         for(var i = 0;i<galeriaProduto[0].length;i++){
              
              $("#galeriaImagensProduto").append(`
                 <div class="item">
                    <img src="${urlCdn2+galeriaProduto[0][i].foto}" alt="${dadosProdutos.nome}">
                 </div>
             `);
              
              // PARA CADA FOTO, UM DOT, DESDE QUE SEJA MAIOR QUE UM
              if(galeriaProduto[0].length>1){
                  $(".dots-galeria-produto").append(`
                        <li class="owl-dot">&nbsp;</li>
                  `);
              }else{
                $(".dots-galeria-produto").remove();
              }

         }
         
         
         // DADOS DO PRODUTO
         $(".metas-produto").html(`
                 
                 <div class="row">
                      <div class="col-9 titulo-produto">
                             ${dadosProdutos.nome}
                      </div>
                      <div class="col-3 preco-produto">
                             ${dadosProdutos.preco}
                      </div>
                 </div>
                 <div class="row">
                      <div class="col-12">
                             ${dadosProdutos.descricao}
                      </div>
                 </div>

         `);

                                // GALERIA DE IMAGENS DO PRODUTO
                                var galeriaImagensProduto = $('#galeriaImagensProduto').owlCarousel({
                                        loop:true,
                                        margin:30,
                                        items: 1,
                                        autoplay: false,
                                        center: false,
                                        //navContainer: '.custom-nav-banner',
                                        //autoplay:true,
                                        //autoplayTimeout:6500,
                                        dotsContainer: '#carousel-custom-dots',
                                        //autoplayHoverPause:true,
                                        //animateIn: 'fadeIn', // add this
                                        //animateOut: 'fadeOut', // and this
                                        
                                });
                                // AGORA TEMOS ATÉ DOTS!!!
                                $('#carousel-custom-dots .owl-dot').click(function () {
                                  galeriaImagensProduto.trigger('to.owl.carousel', [$(this).index(), 300]);
                                });

    }

 


    // OBTENDO GALERIAS DE UM PRODUTO
    getGaleria(idProduto){

        let galerias = JSON.parse(localStorage.getItem("galeriaProdutos"));
    
        let galeriaProduto = [];
    
        for(var i = 0;i<galerias.length;i++){
            if(galerias[i].id_produto==idProduto){
                galeriaProduto.push(galerias[i]);
            }
        }
    
        return galeriaProduto;
    
    }

    
    // ADICIONAR PRODUTO AO CARRINHO
    addToCart(){
       
       let idProduto = this._btnAddToCart.getAttribute("data-id");
       console.log("ADICIONANDO PRODUTO AO CARRINHO: "+idProduto);

       let checkout =  this.recuperarLocalStorageCheckout();
       console.log("%c CHECKOUT RECUPERADO:","background:#fff000;color:#000");
       console.log(checkout);
        
       let listaProdutos = this.recuperarLocalStorage();
       let dadosProdutos  = {};
       
       listaProdutos.reduce(function(info, n){
              if(n.id==idProduto){
                dadosProdutos = n;
                 return n;
              }
       }, []);
       
       var produtos = {};
       var qtdCarrinho = 0;

       produtos.id = dadosProdutos.id;
       produtos.nome = dadosProdutos.nome;
       produtos.preco = this.converterFormatoNumerico(dadosProdutos.preco);
       produtos.qtd = 1;

       checkout.push(produtos);

       console.log("%c ARRAY CHECKOUT: ","background:#ff0000;color:#fff");
       console.log(checkout);

       this._countCarrinho = parseInt(localStorage.getItem("qtdCarrinho")) + 1;

       this._countCarrinhoValor = parseFloat(localStorage.getItem("valorCarrinho")) + parseFloat(this.converterFormatoNumerico(dadosProdutos.preco));

       this.declararLocalStorageCheckout(checkout,this._countCarrinho,this._countCarrinhoValor);

    }

     // ADICIONAR PRODUTO AO CARRINHO
    removeFromCart(idProduto){
       
       $("#variacaoId"+idProduto).val(0);
       mudarQuantidadeProdutoCarrinho(idProduto);


    }


    
    // RECUPERAR TODOS OS PRODUTOS DA MEMÓRIA
    recuperarLocalStorage(){
        return JSON.parse(localStorage.getItem("listProdutos"));
    }




    // SALVAR TODOS OS PRODUTOS NA MEMÓRIA 
    declararLocalStorageCheckout(produtos,qtdCarrinho,valorCarrinho){
        
        console.log("ATUALIZANDO VALORES NA LOCAL STORAGE");
        console.log(produtos);       

        localStorage.setItem("listaProdutosCheckout",JSON.stringify(produtos));
        localStorage.setItem("qtdCarrinho",qtdCarrinho);
        localStorage.setItem("valorCarrinho",parseFloat(valorCarrinho));

        this.atualizarHtmlCarrinho();

    }
    

    atualizarHtmlCarrinho(){
        // ATUALIZAR A QUANTIDADE DO CARRINHO
        $(".fields-loja .col-3 span").html(localStorage.getItem("qtdCarrinho"));
    }

    carrinhoHtml(){

        let produtosCheckout = this.recuperarLocalStorageCheckout();

        var total = parseFloat(localStorage.getItem("valorCarrinho"));
        var subtotal = parseFloat(localStorage.getItem("valorCarrinho"));

        $("#valorSubtotal").html(subtotal.toFixed(2));
        $("#valorTotal").html(total.toFixed(2));

        // GARANTIR QUE O HTML DO CARRINHO TENHA SIDO LIMPO ANTES DA ALIMENTAÇÃO
        $(this._carrinhoHtml).html("");
        
        for(var i = 1;i<produtosCheckout.length;i++){
                             
                             if(produtosCheckout[i].qtd!=0){

                             $(this._carrinhoHtml).append(`

                                    <!-- PRODUTO --> 
                                    <div class="row produto" id="linhaProduto${produtosCheckout[i].id}">
                                       <!-- FOTO PRODUTO -->
                                       <div class="foto-produto" style="background: url('${this.fotoProduto(produtosCheckout[i].id)}') transparent no-repeat;background-size: auto 80%;background-position: center center; ">
                                          <a href="javascript:void(0)" onclick="detalheProduto(${produtosCheckout[i].id})" title="Clique para ver detalhes sobre o produto">
                                             &nbsp;
                                          </a>
                                       </div>
                                       <!-- FOTO PRODUTO -->
                                       <!-- DADOS E AÇÕES PRODUTO -->
                                       <div class="dados-acoes-produto">
                                          <h2>
                                             ${produtosCheckout[i].nome}<br>
                                             <b><span class="precoProdutoCarrinho">R$ ${produtosCheckout[i].preco}</span></b>
                                          </h2>
                                          <div class="form-group opcoes-variacao-produto">
                                            <span style="font-size:12px;margin-right:12px;">Quantidade</span>
                                            <select class="form-control" id="variacaoId${produtosCheckout[i].id}" onchange="mudarQuantidadeProdutoCarrinho(${produtosCheckout[i].id})">
                                              <option value="1" ${this.qtdProduto(produtosCheckout[i].qtd,1)}>1</option>
                                              <option value="2" ${this.qtdProduto(produtosCheckout[i].qtd,2)}>2</option>
                                              <option value="3" ${this.qtdProduto(produtosCheckout[i].qtd,3)}>3</option>
                                              <option value="4" ${this.qtdProduto(produtosCheckout[i].qtd,4)}>4</option>
                                              <option value="5" ${this.qtdProduto(produtosCheckout[i].qtd,5)}>5</option>
                                              <option value="0" ${this.qtdProduto(produtosCheckout[i].qtd,0)}>0</option>
                                            </select>
                                            
                                          </div>
                                       </div>
                                       <!-- DADOS E AÇÕES PRODUTO -->
                                       <div class="remover-produto-carrinho">
                                         <a href="javascript:void(0)" title="Remover produto" onclick="removerProduto(${produtosCheckout[i].id})" style="color:#ff0000;font-size:19px;">
                                            <i class="fa fa-trash"></i>
                                         </a>
                                       </div>
                                    </div>
                                    <!-- PRODUTO -->

                            `);

                         }

        }

        

    }

    
    // RECUPERAR TODOS OS PRODUTOS DA MEMÓRIA
    recuperarLocalStorageCheckout(){
        return JSON.parse(localStorage.getItem("listaProdutosCheckout"));
    }
    

    // FOTO DO PRODUTO PARA O CARRINHO
    fotoProduto(idProduto){

        let listaProdutos = this.recuperarLocalStorage();
        let dadosProdutos  = [];
        let galeriaProduto = [];
         
         // FILTRAR PELOS DADOS
         listaProdutos.reduce(function(info, n){
              if(n.id==idProduto){
                dadosProdutos = n;
                 return n;
              }
          }, []);
         
         // ALIMENTAR A GALERIA DOS PRODUTOS
         galeriaProduto.push(this.getGaleria(idProduto));    
         
         console.log("GALERIA DO PRODUTO:");
         console.log(galeriaProduto);         
        
         return urlCdn2+galeriaProduto[0][0].foto;
    
    }

    qtdProduto(qtd,passo){
        if(qtd==passo){
            return "selected";
        }
    }




    // RECUPERAR TODOS OS PRODUTOS
    get produtos(){
        return this._produtos;
    }
    

    // CONVERTER O PREÇO PARA FORMATO NÚMERICO
    converterFormatoNumerico(entrada){
    
        let saida = entrada.replace("R$ ", "");
        saida = saida.replace(",",".");

        return saida;
    
    }


    // EXIBIR DETALHE DO PRODUTO
    showProduto(idProduto){


    }



}