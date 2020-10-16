var urlApi = "https://servidorseguro.cloud/orrameu/api/";
var urlCdn = "https://servidorseguro.cloud/orrameu/administrativo/arquivos/";
var urlCdn2 = "https://servidorseguro.cloud/orrameu/cdn/";
var urlDom = "https://servidorseguro.cloud/orrameu/";

// TESTAR ATIVIDADE API
function testeApi(){
   
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"teste-api.php",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c VERIFICAÇÃO DE DISPONIBILIDADE DE API","background:#ff0000;color:#fff;");
                  console.log(dados);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (apiAtiva)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

}

function carregarInicio(){
    
    console.log("INICIANDO FUNÇÃO PARA CARREGAR OS DADOS BÁSICAS DO APP");
    
    $("#nomeUsuario").html(localStorage.getItem("nomeUsuario"));

    localStorage.setItem("checkout",null);
    localStorage.setItem("qtdCarrinho",0);
    localStorage.setItem("valorCarrinho",0);
    localStorage.setItem("listaProdutosCheckout","[{}]");

    var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
    console.log("DADOS JSON PARSE: ");
    console.log(obj);

    // LINK DO CONTRATO
    $("#btnContrato").attr("onclick","window.open('https://servidorseguro.cloud/orrameu/administrativo/contrato-cadastro.php?nome_usuario="+obj.dados[0].sobrenome+"&data_cadastro="+obj.dados[0].data_cadastro+"','_system'); return false;");
                  
    
                  
    // ALTERAR FOTO DE PERFIL
    if(obj.dados[0].foto_perfil!==null){
       
       /*
       $(".profile-picture").css("background","url('"+obj.dados[0].foto_perfil+"') #f2f2f2 no-repeat");
       $(".profile-picture").css("background-size","cover");
       $(".profile-picture").css("background-position","center center");
       */
       
       manterFotoPerfilAtualizada();

    }

              // CARREGANDO PARCEIROS
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"parceiros.php",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c PARCEIROS","background:#ff0000;color:#fff;");
                  console.log(dados);
                  
                  for(var i = 0;i<dados.dados.length;i++){

                     $("#parceirosOrraMeu").append('<img src="'+urlCdn+dados.dados[i].imagem+'?v=2" alt="'+dados.dados[i].nome+'">');
                  }                  

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (carregarInicio) - LISTA DE PARCEIROS");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   //aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

              // CARREGANDO MODALIDADES
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"init-modalidades.php",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c MODALIDADES","background:#ff0000;color:#fff;");
                  console.log(dados);
                  
                  for(var i = 0;i<dados.dados.length;i++){

                     $("#inputAddListaModalidade").append('<option value="'+dados.dados[i].id+'">'+dados.dados[i].nome_modalidade+' (valor aula: R$ '+dados.dados[i].valor_modalidade+')</option>');
                  }                  

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (carregarInicio) - LISTA DE MODALIDADE");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   //aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

}

// INICIANDO FUNÇAO PARA SALVAR A NOVA MODALIDADE
function addModalidadeContratoAluno(){
    
    console.log("INICIANDO FUNÇÃO PARA ADICIONAR NOVA MODALIDADE NO CONTRATO DO ALUNO");

    var idUsuario = localStorage.getItem("idUsuario");

    var inputAddListaModalidade = $("#inputAddListaModalidade").val();
    var inputAddAulasSemana     = $("#inputAddAulasSemana").val();

    // ENVIAR DADOS PARA O SERVIDOR
    // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"add-modalidade-contrato.php",
                  data:{idUsuario:idUsuario,inputAddListaModalidade:inputAddListaModalidade,inputAddAulasSemana:inputAddAulasSemana}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO ADD MODALIDADE","background:#ff0000;color:#fff;");
                  console.log(dados);

                  if(dados.sucesso==200){
                  
                      // APAGAR DADOS QUE ESTEJAM NA DIV DE APPEND
                      $("#appendItensContrato").html("");
                      // ALIMENTAR O HTML
                      for(var i = 0;i<dados.dados.length;i++){
                          if(i==dados.dados.length-1){
                             $("#appendItensContrato").append('<div id="cpc'+dados.dados[i].id+'" class="row caixa-pai-contrato contadores-de-caixa ultima-caixa"> <div class="caixa-contrato"> <div class="row"> <div class="col-sm-7 col-7 coluna-um"> Modalidade: </div><div class="col-sm-5 col-5 coluna-dois"> '+dados.dados[i].nome_modalidade+' <a href="javascript:void(0)" onclick="confirmarRemoverModalidade('+dados.dados[i].id+');"><img src="images/fechar-modalidade.png" alt="Remover modalidade"></a> </div></div></div><div class="add-mais-modalidades"> <a href="javascript:void(0)" title="Adicionar Modalidade" onclick="adicionarNovaModalidade();"> <img src="images/adicionar-modalidade.png" alt="Adicionar modalidade"> </a> </div></div>');
                          }else{
                            $("#appendItensContrato").append('<div id="cpc'+dados.dados[i].id+'" class="row caixa-pai-contrato contadores-de-caixa"> <div class="caixa-contrato"> <div class="row"> <div class="col-sm-7 col-7 coluna-um"> Modalidade: </div><div class="col-sm-5 col-5 coluna-dois"> '+dados.dados[i].nome_modalidade+' <a href="javascript:void(0)" onclick="confirmarRemoverModalidade('+dados.dados[i].id+');"><img src="images/fechar-modalidade.png" alt="Remover modalidade"></a> </div></div></div><div class="add-mais-modalidades"> <a href="javascript:void(0)" title="Adicionar Modalidade" onclick="adicionarNovaModalidade();"> <img src="images/adicionar-modalidade.png" alt="Adicionar modalidade"> </a> </div></div>');
                          }
                      }

                      cancelarActionCombo();
                      aviso("Deu certo!","Modalidade adicionada ao seu contrato com sucesso!");

                  }else{
                      
                      
                      cancelarActionCombo();
                      aviso("Oops!","Você já possuí essa modalidade no seu contrato!");

                  }

                  

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (addModalidadeContratoAluno)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   //aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX


}

function manterFotoPerfilAtualizada(){

   console.log("INICIANDO FUNÇÃO PARA MANTER A FOTO DE PERFIL DO USUÁRIO ATUALIZADA");
   
   var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
    console.log("DADOS JSON PARSE: ");
    console.log(obj);
    
    // ALTERAR FOTO DE PERFIL
    if(obj.dados[0].foto_perfil!==null){
        
            // VERIFICAR SE A IMAGEM EXISTE NA MEMÓRIA LOCAL, OU SE TEREMOS QUE BUSCAR NO SERVIDOR CDN
            var image = new Image();
            var url_image = obj.dados[0].foto_perfil;
            image.src = url_image;
            if (image.width == 0) {
               console.log("BUSCANDO IMAGEM DE PERFIL DO CDN");
               $(".profile-picture").css("background","url('"+urlCdn+obj.dados[0].foto_perfil+"') #f2f2f2 no-repeat");
               $(".profile-picture").css("background-size","cover");
               $(".profile-picture").css("background-position","center center");
               
               $(".foto-perfil-inner-corpo").css("background","url('"+urlCdn+obj.dados[0].foto_perfil+"')");
               $(".foto-perfil-inner-corpo").css("background-size","cover");
               $(".foto-perfil-inner-corpo").css("background-position","center center");
               
               $(".perfil-banner .foto-perfil").css("background","url('"+urlCdn+obj.dados[0].foto_perfil+"')");
               $(".perfil-banner .foto-perfil").css("background-size","cover");
               $(".perfil-banner .foto-perfil").css("background-position","center center");
            } else {
               console.log("BUSCANDO IMAGEM DE PERFIL DA MEMÓRIA LOCAL");
               $(".profile-picture").css("background","url('"+obj.dados[0].foto_perfil+"') #f2f2f2 no-repeat");
               $(".profile-picture").css("background-size","cover");
               $(".profile-picture").css("background-position","center center");
               
               $(".foto-perfil-inner-corpo").css("background","url('"+obj.dados[0].foto_perfil+"')");
               $(".foto-perfil-inner-corpo").css("background-size","cover");
               $(".foto-perfil-inner-corpo").css("background-position","center center");
               
               $(".perfil-banner .foto-perfil").css("background","url('"+obj.dados[0].foto_perfil+"')");
               $(".perfil-banner .foto-perfil").css("background-size","cover");
               $(".perfil-banner .foto-perfil").css("background-position","center center");
            }
          

    }

}

function notificacoes(){
  
}

// PROCESSAR LOGIN
function procLogin(){

  console.log("INICIANDO FUNÇÃO PARA LOGIN");

  var loginUsuario = $("#loginUsuario").val();
  var loginSenha   = $("#loginSenha").val();
  
  $("#procLogin").html("Carregando...");

              // INICIO CHAMADA AJAX
              var request = $.ajax({
                  method: "POST",
                  url: urlApi+"login.php",
                  data:{loginUsuario:loginUsuario,loginSenha:loginSenha}              
              })
              request.done(function (dados) {            

                  if(dados["sucesso"]=="200"){

                              console.log("DADOS RETORNADOS:");
                              console.log(dados);

                              // SALVAR DADOS NA SESSÃO
                              localStorage.setItem("nomeUsuario",dados["nome"]);
                              localStorage.setItem("emailUsuario",dados["email"]);
                              localStorage.setItem("idUsuario",dados["id"]);

                              localStorage.setItem("logado-orrameu","sim");
                              
                              localStorage.setItem("dadosUsuario",JSON.stringify(dados));

                              location.href="dashboard.html";
                             

                  }else{

                              console.log("NÃO FOI POSSÍVEL FAZER O LOGIN (procLogin)");
                              console.log(dados);
                              $("#procLogin").html("Entrar");

                              aviso("Oops! Login e senha inválidos","Verifique as informações inseridas e tente novamente.");

                  }
                  
              });
              request.fail(function (dados) {
                     
                   console.log("NÃO FOI POSSÍVEL SALVAR O LOG DE ERROS (salvarLog)");
                   console.log(dados);
                   $("#procLogin").html("Entrar");

                   aviso("Oops! Login e senha inválidos","Verifique as informações inseridas e tente novamente.");

              });
              // FINAL CHAMADA AJAX



}


  var controleExibirSenha = 0;
  function exibirSenha(){
     
     if(controleExibirSenha==0){
         $("#loginSenha").attr("type","text");
         $("#cadastroSenha").attr("type","text");
         $("#cadastroSenhaConfirmar").attr("type","text");         

         controleExibirSenha = 1;
     }else{
         $("#loginSenha").attr("type","password");
         $("#cadastroSenha").attr("type","password");
         $("#cadastroSenhaConfirmar").attr("type","password"); 
         controleExibirSenha = 0;
     }

  }


// PROCESSAR CADASTRO
function procCadastro(){

  console.log("INICIANDO FUNÇÃO PARA PROCESSAR O CADASTRO");

  $("#procCadastro").html("Processando...");

	var cadastroSenha = $("#cadastroSenha").val();
  var cadastroSenhaConfirmar = $("#cadastroSenhaConfirmar").val();

    if(cadastroSenha!=cadastroSenhaConfirmar){
    	
      aviso("Oops! Temos um problema.","As senhas informadas precisam ser iguais! Verifique os dados inseridos e tente novamente.");
      $("#procCadastro").html("Cadastrar");
    
    }else{    	   

         var cadastroUsuario = $("#cadastroUsuario").val();
         var cadastroEmail = $("#cadastroEmail").val();
         var cadastroNome = $("#cadastroNome").val();
         var cadastroCelular = $("#cadastroCelular").val();
         var cadastroInstagram = $("#cadastroInstagram").val();
         var cadastroSexo = $("#cadastroSexo").val();
         var cadastroNascimento = $("#cadastroNascimento").val();
         var cadastroSenha = $("#cadastroSenha").val();

         if(cadastroUsuario!=""&&cadastroEmail!=""&&cadastroNome!=""&&cadastroCelular!=""&&cadastroInstagram!=""&&cadastroSexo!=""&&cadastroNascimento!=""&&cadastroSenha!=""){

              // VERIFICAR SE O E-MAIL NÃO EXISTE
              // INICIO CHAMADA AJAX
              var request = $.ajax({
                  method: "POST",
                  url: urlApi+"verificaremailesms.php",
                  data:{cadastroEmail:cadastroEmail,cadastroCelular:cadastroCelular}              
              })
              request.done(function (dados) {            

                  if(dados["sucesso"]=="400"){
                     
                     aviso("Oops! Temos um problema.","Esse e-mail ou telefone já estão sendo usados em outra conta.");
                     $("#procCadastro").html("Cadastrar");
                     console.log("RETORNO DOS DADOS CONSULTA EMAIL OU CELULAR JÁ CADASTRADO");
                     console.log(dados);

                  }else{
                    //location.href="dashboard.html";

                        console.log("RETORNO DOS DADOS CONSULTA EMAIL OU CELULAR JÁ CADASTRADO");
                        console.log(dados);

                        // INICIO CHAMADA AJAX
                        var request = $.ajax({
                            method: "POST",
                            url: urlApi+"cadastro.php",
                            data:{cadastroUsuario:cadastroUsuario,cadastroEmail:cadastroEmail,cadastroNome:cadastroNome,cadastroCelular:cadastroCelular,cadastroInstagram:cadastroInstagram,cadastroSexo:cadastroSexo,cadastroNascimento:cadastroNascimento,cadastroSenha:cadastroSenha}              
                        })
                        request.done(function (dados) {            
                            
                            if(dados["sucesso"]=="200"){
                              console.log("CADASTRO DEU CERTO!");
                              console.log("DADOS RETORNADOS:");
                              console.log(dados);

                              // SALVAR DADOS NA SESSÃO
                              localStorage.setItem("nomeUsuario",dados["nome"]);
                              localStorage.setItem("emailUsuario",dados["email"]);
                              localStorage.setItem("idUsuario",dados["id"]);
                              localStorage.setItem("status",dados["status"])
                              localStorage.setItem("logado","sim");

                              localStorage.setItem("dadosUsuario",JSON.stringify(dados));
                              
                              location.href="dashboard.html";

                            }else{
                              console.log("NÃO FOI POSSÍVEL FAZER O CADASTRO (procCadastro)");
                              console.log(dados);
                              aviso("Oops! Temos um problema","Não conseguimos comunicação com o servidor. Tente novamente depois de alguns minutos.");
                              $("#procCadastro").html("Cadastrar");
                            }                            
                            
                        });
                        request.fail(function (dados) {
                               
                             console.log("NÃO FOI POSSÍVEL FAZER O CADASTRO (procCadastro)");
                             console.log(dados);
                             aviso("Oops! Temos um problema","Não conseguimos comunicação com o servidor. Tente novamente depois de alguns minutos.");
                             $("#procCadastro").html("Cadastrar");

                        });
                        // FINAL CHAMADA AJAX


         } // FINAL ELSE
         

   });
                        request.fail(function (dados) {
                               
                             console.log("NÃO FOI POSSÍVEL FAZER O CADASTRO (procCadastro)");
                             console.log(dados);
                             aviso("Oops! Temos um problema","Não conseguimos comunicação com o servidor. Tente novamente depois de alguns minutos.");
                             $("#procCadastro").html("Cadastrar");

                        }); // FINAL AJAX PAI

       } // IF CAMPOS VAZIOS

   } //ELSE

} // FUNÇÃO






// PROCESSAR EDITAR CADASTRO
function procEditarCadastro(){

    var cadastroSenha = $("#cadastroEditarSenha").val();
    var cadastroSenhaConfirmar = $("#cadastroEditarSenhaConfirmar").val();

    if(cadastroSenha!=cadastroSenhaConfirmar){
      aviso("Oops! Temos um problema.","As senhas informadas precisam ser iguais! Verifique os dados inseridos e tente novamente.");
    }else{
      
      // RECUPERAR OS DADOS

      var idUsuario = localStorage.getItem("idUsuario");

      var cadastroEditarUsuario = $("#cadastroEditarUsuario").val();
      var cadastroEditarEmail = $("#cadastroEditarEmail").val();
      var cadastroEditarNome = $("#cadastroEditarNome").val();
      var cadastroEditarCelular = $("#cadastroEditarCelular").val();
      var cadastroEditarInstagram = $("#cadastroEditarInstagram").val();
      var cadastroEditarSexo = $("#cadastroEditarSexo").val();
      var cadastroEditarNascimento = $("#cadastroEditarNascimento").val();
      var cadastroEditarSenha = $("#cadastroEditarSenha").val();

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"atualizar-cadastro.php",
                  data:{idUsuario:idUsuario, 
                    cadastroEditarUsuario:cadastroEditarUsuario, 
                    cadastroEditarEmail:cadastroEditarEmail, 
                    cadastroEditarNome:cadastroEditarNome,
                    cadastroEditarCelular:cadastroEditarCelular,
                    cadastroEditarInstagram:cadastroEditarInstagram,
                    cadastroEditarSexo:cadastroEditarSexo,
                    cadastroEditarNascimento:cadastroEditarNascimento,
                    cadastroEditarSenha:cadastroEditarSenha }
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DOS DADOS DA API","background:#ff0000;color:#fff;");
                  console.log(dados);

                   // SALVAR DADOS NA SESSÃO
                   localStorage.setItem("nomeUsuario",dados.dados[0].nome);
                   localStorage.setItem("emailUsuario",dados.dados[0].email);
                   localStorage.setItem("idUsuario",dados.dados[0].id);
                   localStorage.setItem("logado-orrameu","sim");
                   localStorage.setItem("dadosUsuario",JSON.stringify(dados));

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (procEditarCadastro)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

      aviso("Dados salvos com sucesso","As informações informadas foram salvas com sucesso! Obrigado por manter o seu perfil atualizado.");
      voltarAoInicio();
   

    }

}



// DIRECIONAR PARA A TELA DE PAGAMENTOS
function meusPagamentos(){
    

   // FECHAR O MENU MOBILE
   fecharMenuMobile();
  
   // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
   $JSView.goToView('viewPagamentos');

   // CARREGAR MASCARAS DOS CAMPOS
   carregarMascaras();
   
   //  MANTER A FOTO DE PERFIL ATUALIZADA
   manterFotoPerfilAtualizada();

   // MONTAR O OWL CARROUSEL DESSA SESSÃO

                                var listaDepagamentos = $('#listaDepagamentos').owlCarousel({
                                        loop:false,
                                        margin:6,
                                        items: 2,
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
                                $('.owl-dot').click(function () {
                                  listaDepagamentos.trigger('to.owl.carousel', [$(this).index(), 300]);
                                });

 

}



// REDIRECIONAR PARA A TELA DE MINHAS AULAS
function minhasAulas(){

    // FECHAR O MENU MOBILE
   fecharMenuMobile();
  
   // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
   $JSView.goToView('viewMinhasAulas');

   // CARREGAR MASCARAS DOS CAMPOS
   carregarMascaras();

   //  MANTER A FOTO DE PERFIL ATUALIZADA
   manterFotoPerfilAtualizada();


                                // MONTAR O OWL CARROUSEL DESSA SESSÃO
                                var minhasAulasRegulares = $('#minhasAulasRegulares').owlCarousel({
                                        loop:false,
                                        margin:0,
                                        items: 3,
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
                                  minhasAulasRegulares.trigger('to.owl.carousel', [$(this).index(), 300]);
                                });


                                var minhasAulasSuplementares = $('#minhasAulasSuplementares').owlCarousel({
                                        loop:false,
                                        margin:6,
                                        items: 1,
                                        autoplay: false,
                                        center: false,
                                        //navContainer: '.custom-nav-banner',
                                        //autoplay:true,
                                        //autoplayTimeout:6500,
                                        dotsContainer: '#carousel-custom-dots2',
                                        //autoplayHoverPause:true,
                                        //animateIn: 'fadeIn', // add this
                                        //animateOut: 'fadeOut', // and this
                                        
                                });
                                // AGORA TEMOS ATÉ DOTS!!!
                                $('#carousel-custom-dots2 .owl-dot').click(function () {
                                  minhasAulasSuplementares.trigger('to.owl.carousel', [$(this).index(), 300]);
                                });

}


// REDIRECIONAR PARA A AGENDA
function verAgenda(){

                                // DIRECIONAR PARA A VIEW DE AGENDAMENTO
                                $JSView.goToView('viewAgendar');

                                // CARREGAR MASCARAS DOS CAMPOS
                                carregarMascaras();

                                // MONTAR O OWL CARROUSEL DESSA SESSÃO

                                var minhasAulasRegularesAgendar = $('#minhasAulasRegularesAgendar').owlCarousel({
                                        loop:false,
                                        margin:30,
                                        items: 1,
                                        autoplay: false,
                                        center: false,
                                        //navContainer: '.custom-nav-banner',
                                        //autoplay:true,
                                        //autoplayTimeout:6500,
                                        dotsContainer: '#carousel-custom-dots3',
                                        //autoplayHoverPause:true,
                                        //animateIn: 'fadeIn', // add this
                                        //animateOut: 'fadeOut', // and this
                                        
                                });
                                // AGORA TEMOS ATÉ DOTS!!!
                                $('#carousel-custom-dots3 .owl-dot').click(function () {
                                  minhasAulasRegularesAgendar.trigger('to.owl.carousel', [$(this).index(), 300]);
                                });

}



// REDIRECIONAR PARA A TELA DE EVENTOS
var arrayEventos = [];

function eventos(){

       // FECHAR O MENU MOBILE
       fecharMenuMobile();
      
       // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
       $JSView.goToView('viewEventos');

       //  MANTER A FOTO DE PERFIL ATUALIZADA
       manterFotoPerfilAtualizada();

       // RECUPERAR TODOS OS EVENTOS
       // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"eventos.php",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DA API SOBRE A LISTA DE EVENTOS","background:#ff0000;color:#fff;");
                  console.log(dados);

                  $("#carregandoEventos").fadeOut();

                  console.log("QUANTIDADE DE EVENTOS: "+dados.dados.length);

                  // ADICIONAR A LISTA
                  arrayEventos = new ListaEventos();
                  arrayEventos.adiciona(dados.dados);
                  console.log("LISTA DE EVENTOS:");
                  console.log(arrayEventos.eventos);

                   if(dados.dados.length>0){

                                 var mesAnterior = "x";
                                 var mesAtual = "y";
                                 var controle = 0;
                                 var contadorDePaginas = 0;
                                
                                // ALIMENTAR OS MESES
                                for(let i = 0;i<dados.dados.length;i++){
                                  console.log("ENTREI NO FOR");
                                  mesAtual = Cale2000.cale002(dados.dados[i].data_evento);
                                  if(mesAnterior!=mesAtual){
                                              $("#eventosGerais").append(`                                                    
                                                 <!-- COLUNA / MÊS -->
                                                 <div class="item">
                                                     <h3>${Cale2000.cale002(dados.dados[i].data_evento)}</h3>
                                                     <div class="row mes-exibicao-eventos-${dados.dados[i].data_evento}">
                                                     </div>
                                                 </div>
                                                 <!-- COLUNA / MÊS -->
                                                `);
                                       contadorDePaginas++;
                                  }                                  
                                   mesAnterior = mesAtual;
                                }                  


                                // ALIMENTAR OS EVENTOS
                                for(let i = 0;i<dados.dados.length;i++){
                                  $(".mes-exibicao-eventos-"+dados.dados[i].data_evento).append(` 
                                               <!-- COLUNA -->
                                               <div class="col-4">
                                                   <div class="coluna">
                                                       <a href="javascript:void(0)" onclick="detalheEvento(${dados.dados[i].id});" title="Clique para ver o detalhe do evento">
                                                            <span>${dados.dados[i].nome_evento}</span><br clear="both">${Cale2000.cale003(dados.dados[i].data_evento)}
                                                       </a>
                                                    </div>
                                               </div>
                                               <!-- COLUNA -->                                              
                                    `);
                                }              


                                // ALIMENTAR OS DOTS (CADA MÊS, UMA PÁGINA)
                                for(var j = 0;j<contadorDePaginas;j++){
                                   console.log("ENTREI NO FOR DOS DOTS");
                                   $(".owl-dots-eventos").append(`<li class="owl-dot">&nbsp;</li>`);
                                }


                                // MONTAR O OWL CARROUSEL DESSA SESSÃO
                                var eventosGerais = $('#eventosGerais').owlCarousel({
                                        loop:false,
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
                                  eventosGerais.trigger('to.owl.carousel', [$(this).index(), 300]);
                                }); 


                   }else{
                      $("#eventosGerais").html(`<p style="text-align:center;>Nenhum evento ainda :(</p>`);
                   }

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (eventos)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX


                                

}

// ABRIR LIGHTBOX DETALHE EVENTO
function detalheEvento(idEvento){
  
    console.log("ABRINDO DETALHE DO EVENTO: "+idEvento);
    
    // EXIBIR O DETALHE DO EVENTO
    let detalheEvento  = new ListaEventos(); 
    detalheEvento.showEvento(idEvento);

}

// FECHAR LIGHTBOX DETALHE EVENTO
function fecharEvento(){
  
  console.log("FECHANDO DETALHE DO EVENTO");
  
  $(".lightbox-eventos").fadeOut("500"); 

}


// REDIRECIONAR PARA A LOJA
function loja(){
       
       console.log("INICIANDO FUNÇÃO PARA CARREGAMENTO DA LOJA");

       let loja = new Loja();
  
       // FECHAR O MENU MOBILE
       fecharMenuMobile();
      
       // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
       $JSView.goToView('viewLoja');

       //  MANTER A FOTO DE PERFIL ATUALIZADA
       manterFotoPerfilAtualizada();

       loja.atualizarHtmlCarrinho();

       // CARREGAR PRODUTOS
       // carregarProdutos();

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"produtos.php",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DA API SOBRE A LOJA","background:#ff0000;color:#fff;");
                  console.log(dados);

                  console.log("%c TOTAL DE PRODUTOS: "+dados.produtos.length,"background:#ff0000;color:#fff;");

                  if(dados.produtos.length>0){
                     $("#carregandoProdutos").remove();
                  }else{
                     $("#carregandoProdutos").html("Nenhum produto cadastrado para mostrar.");
                  }
                   
                   // PERCORRER PRODUTOS
                   for(var i = 0;i<dados.produtos.length;i++){
                       
                       $("#listagemDeProdutos").append(`
                           
                                 <!-- PRODUTO -->
                                 <div class="col-6">
                                    <div class="produto">
                                       <!-- FOTO PRODUTO -->
                                       <div class="foto-produto" style="background: url('${urlCdn2+dados.produtos[i].foto}') transparent no-repeat;background-size: auto 80%;background-position: center center; ">
                                          <a href="javascript:void(0)" onclick="detalheProduto(${dados.produtos[i].id})" title="Clique para ver detalhes sobre o produto">
                                             &nbsp;
                                          </a>
                                       </div>
                                       <!-- FOTO PRODUTO -->
                                       <h2>
                                         ${dados.produtos[i].nome}<br clear="both">
                                         <b>${dados.produtos[i].preco}</b>
                                       </h2>
                                    </div>
                                 </div>
                                 <!-- PRODUTO -->

                       `);

                   }

                   // SALVAR NA INSTANCIA DA CLASSE
                   loja.declararLocalStorage(dados.produtos);
                   loja.galeria(dados.galeria);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (loja)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

    console.log("FUNÇÃO PARA CARREGAMENTO DA LOJA FINALIZADA");

}



// FUNÇÃO PARA PESQUISA DE PRODUTOS NA LOJA
function filtroProdutos(){
  
         // Declare variables
          var input, filter, ul, li, a, i, controle = 1;
          input = document.getElementById('buscaProdutos');

          filter = input.value.toUpperCase();
          
          ul = document.getElementById("listagemDeProdutos");
          li = ul.getElementsByClassName('produto');

          // Loop through all list items, and hide those who don't match the search query
          for (i = 0; i < li.length; i++) {
              a = li[i]; 
              if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  li[i].style.display = "";
                  controle = 2;
              } else {
                  li[i].style.display = "none";
                  
              }
          }          

          // FAZER APARECER OU NÃO O "nenhum resultado encontrado"
          if(i>=li.length){
            if(controle==1){
                $("#buscaVazia").show();
            }else{
                $("#buscaVazia").hide();
            }
          }


}



// FUNÇÃO PARA DIRECIONAR PARA A PÁGINA DE DETALHE DO PRODUTO
function detalheProduto(idProduto){
     
     $JSView.goToView('viewDetalheProduto');

     manterFotoPerfilAtualizada();

     let produto = new Loja();
     
     produto.rotinasInterna(idProduto);

     produto.atualizarHtmlCarrinho();

}

// ADICIONAR PRODUTO AO CARRINHO
function addCarrinho(idCarrinho){
  
  console.log("ADICIONAR PRODUTO AO CARRINHO");

  // DIRECIONAR PARA A VIEW DO CARRINHO
   $JSView.goToView('viewCarrinho');

   manterFotoPerfilAtualizada();

   let carrinho = new Loja();

   carrinho.addToCart();

   carrinho.carrinhoHtml();

}

function carrinho(){

    // DIRECIONAR PARA A VIEW DO CARRINHO

    if(localStorage.getItem("qtdCarrinho")>0){

        $JSView.goToView('viewCarrinho');
        manterFotoPerfilAtualizada();
        let carrinho = new Loja();

        carrinho.carrinhoHtml();

    }else{

        aviso("Carrinho está vazio","Você ainda não adicionou produtos ao carrinho");

    }

    

}


function mudarQuantidadeProdutoCarrinho(idProduto){
   
   console.log("ATUALIZANDO A QUANTIDADE DO MESMO PRODUTO DO CARRINHO");

   let loja = new Loja();

   let produtosCheckout = loja.recuperarLocalStorageCheckout();
   let valorCarrinho = 0;
   let novaQtd = $("#variacaoId"+idProduto).val();

   for(var i = 1;i<produtosCheckout.length;i++){
      
      if(produtosCheckout[i].id==idProduto){

         produtosCheckout[i].qtd = novaQtd;
         valorCarrinho = parseFloat(valorCarrinho) + (novaQtd * parseFloat(produtosCheckout[i].preco));
        

      }else{

        // ATUALIZAR O VALOR TOTAL DO CARRINHO
        valorCarrinho = parseFloat(valorCarrinho) + (produtosCheckout[i].qtd * parseFloat(produtosCheckout[i].preco));

      }     
      

   }

   console.log("ATUALIZANDO A LOCAL STORAGE");
   localStorage.setItem("valorCarrinho",valorCarrinho);
   localStorage.setItem("listaProdutosCheckout",JSON.stringify(produtosCheckout));
  
   loja.carrinhoHtml();
   
}


function removerProduto(idProduto){

     $("#linhaProduto"+idProduto).fadeOut();

     let loja = new Loja();

     loja.removeFromCart(idProduto);

}



function finalizarReserva(){  
   

   let checkout = localStorage.getItem("listaProdutosCheckout");
   let qtdCarrinho = localStorage.getItem("qtdCarrinho");
   let valorCarrinho = localStorage.getItem("valorCarrinho");
   let idUsuario = localStorage.getItem("idUsuario");
   

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"reserva.php",
                  data:{idUsuario:idUsuario,checkout:checkout,qtdCarrinho:qtdCarrinho,valorCarrinho:valorCarrinho}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DOS DADOS SOBRE A RESERVA","background:#ff0000;color:#fff;");
                  console.log(dados);
                  
                  $JSView.goToView('viewFinalizarReserva');

                  manterFotoPerfilAtualizada();

                  $(".confirmacao-reserva h1 small").html("NÚMERO PEDIDO: #"+dados.numero_pedido);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (finalizarReserva)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

}


function falaAe(){

  $JSView.goToView('viewFalaAe');
  fecharMenuMobile();
  manterFotoPerfilAtualizada();

}

function procFalaAe(){
   
   var idUsuario = localStorage.getItem("idUsuario");
   var msgAssunto = $("#msgAssunto").val();
   var msgMensagem = $("#msgMensagem").val();

   if(msgAssunto!="" && msgMensagem!=""){
   
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"falaae.php",
                  data:{idUsuario:idUsuario,msgAssunto:msgAssunto,msgMensagem:msgMensagem}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DOS DADOS SOBRE A MENSAGEM","background:#ff0000;color:#fff;");
                  console.log(dados);
                  
                  voltarAoInicio();
                  aviso("Deu certo!","Mensagem foi enviada com sucesso! Em breve vamos retornar o seu contato");

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (procFalaAe)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");
                   $("#procFalaAe").html("Enviar mensagem");

              });
              // FINAL CHAMADA AJAX

    }else{

      aviso("Oops! Campos não preenchidos","Todos os campos do formulário são obrigatórios para o envio.");
    
    }

}



// REDIRECIONAR PARA O LOGIN
function redirecionarLogin(){
    
    $JSView.goToView('viewPrincipal');

}


// REDIRECIONAR PARA O CADASTRO
function redirecionarCadastro(){

	$JSView.goToView('viewCadastro');
	carregarMascaras();


	
}

// REDIRECIONAR PARA TELA DE ESQUECI SENHA
function redirecionarEsqueciSenha(){
  
    $JSView.goToView('viewEsqueciSenha');
    
    manterFotoPerfilAtualizada();
   
}




// CARREGAR MASCARAS
function carregarMascaras(){

    console.log("CARREGANDO MASCARAS DE FORMULÁRIOS");

    $("#cadastroCelular").inputmask("(99) 9 9999-9999");
    $("#cadastroNascimento").inputmask("99/99/9999");

    $("#cadastroEditarCelular").inputmask("(99) 9 9999-9999");
    $("#cadastroEditarNascimento").inputmask("99/99/9999");

    
    $("#pagtoCCNumero").inputmask("9999-9999-9999-9999");
    $("#pagtoCCValidade").inputmask("99/99");

    $("#pagtoCDNumero").inputmask("9999-9999-9999-9999");
    $("#pagtoCDValidade").inputmask("99/99");

    $("#pagtoBBNumeroCPF").inputmask("999.999.999-99");
    
    

}


// FUNÇÃO PARA VOLTAR AO INÍCIO
function voltarAoInicio(){
    
    console.log("FUNÇÃO PARA VOLTAR AO INÍCIO");
    $JSView.goToView('viewPrincipal');

    carregarInicio();
    
    // FECHAR O MENU MOBILE
    fecharMenuMobile();

}

// FUNÇÃO PARA EDIÇÃO DE CADASTRO
function meuCadastro(){

  // FECHAR O MENU MOBILE
  fecharMenuMobile();
  
  // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
  $JSView.goToView('viewCadastro');

  var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
  console.log("DADOS JSON PARSE: ");
  console.log(obj);
    
  // ALTERAR FOTO DE PERFIL
  if(obj.dados[0].foto_perfil!==null){

     manterFotoPerfilAtualizada();

  }
  
  // PREENCHER OS CAMPOS DO HTML
  $("#cadastroEditarUsuario").val(obj.dados[0].nome);
  $("#cadastroEditarEmail").val(obj.dados[0].email);
  $("#cadastroEditarNome").val(obj.dados[0].sobrenome);
  $("#cadastroEditarCelular").val(obj.dados[0].numero_tel);
  $("#cadastroEditarInstagram").val(obj.dados[0].instagram);
  $("#cadastroEditarSexo").val(obj.dados[0].sexo);
  $("#cadastroEditarNascimento").val(obj.dados[0].nascimento);
  $("#cadastroEditarSenha").val(obj.dados[0].senha);
  $("#cadastroEditarSenhaConfirmar").val(obj.dados[0].senha);

  // CARREGANDO MASCARAS
  carregarMascaras();
  
}


// FUNÇÃO PARA DIRECIONAR PARA A PÁGINA DO CONTRATO
function meuContrato(){

  var idUsuario = localStorage.getItem("idUsuario");   
  
   // FECHAR O MENU MOBILE
   fecharMenuMobile();
  
   // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
   $JSView.goToView('viewContrato');

   manterFotoPerfilAtualizada();

   // RECUPERAR DADOS DO CONTRATO DO USUÁRIO
   // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"contratoUsuario.php",
                  data:{idUsuario:idUsuario}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DOS DADOS CONTRATO DO USUÁRIO","background:#ff0000;color:#fff;");
                  console.log(dados);

                  if(dados.contrato.length==0){
                     $("#appendItensContrato").html('<p style="font-size: 15px;text-align: center;">Nenhuma modalidade ainda</p><p style="font-size: 16px;text-align: center;"><a href="javascript:void(0)" title="Adicionar modalidade" onclick="adicionarNovaModalidade();" class="btn btn-primary" style="width:300px;">Adicionar modalidade</a></p>');
                  }else{

                    // LIMPAR O HTML
                    $("#appendItensContrato").html("");
                    console.log("TESTE TAMANHO: "+dados.contrato.length);

                    // ALIMENTAR O HTML
                    for(var i = 0;i<dados.contrato.length;i++){

                        if(i==dados.contrato.length-1){
                           $("#appendItensContrato").append('<div id="cpc'+dados.contrato[i].id+'" class="row caixa-pai-contrato contadores-de-caixa ultima-caixa"> <div class="caixa-contrato"> <div class="row"> <div class="col-sm-7 col-7 coluna-um"> Modalidade: </div><div class="col-sm-5 col-5 coluna-dois"> '+dados.contrato[i].nome_modalidade+' <a href="javascript:void(0)" onclick="confirmarRemoverModalidade('+dados.contrato[i].id+');"><img src="images/fechar-modalidade.png" alt="Remover modalidade"></a> </div></div></div><div class="add-mais-modalidades"> <a href="javascript:void(0)" title="Adicionar Modalidade" onclick="adicionarNovaModalidade();"> <img src="images/adicionar-modalidade.png" alt="Adicionar modalidade"> </a> </div></div>');
                        }else{
                           $("#appendItensContrato").append('<div id="cpc'+dados.contrato[i].id+'" class="row caixa-pai-contrato contadores-de-caixa"> <div class="caixa-contrato"> <div class="row"> <div class="col-sm-7 col-7 coluna-um"> Modalidade: </div><div class="col-sm-5 col-5 coluna-dois"> '+dados.contrato[i].nome_modalidade+' <a href="javascript:void(0)" onclick="confirmarRemoverModalidade('+dados.contrato[i].id+');"><img src="images/fechar-modalidade.png" alt="Remover modalidade"></a> </div></div></div><div class="add-mais-modalidades"> <a href="javascript:void(0)" title="Adicionar Modalidade" onclick="adicionarNovaModalidade();"> <img src="images/adicionar-modalidade.png" alt="Adicionar modalidade"> </a> </div></div>');
                        }                        
                        
                    }
                                       
                  }

                  // CARREGANDO DADOS DO USUÁRIO
                  var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
                  //obj.dados[0].foto_perfil = 'data:image/jpeg;base64,'+imageData;
                     
                  // ATUALIZAR O HTML DOS PLANOS
                  $(".linha-cpc-planos span").html(obj.dados[0].periodicidade_plano);
                  $(".linha-cpc-valor span").html("R$ "+obj.dados[0].valor_mensalidade);
                  $(".linha-cpc-vencimento span").html("todo dia "+obj.dados[0].data_vencimento);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (meuContrato)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

   

   // CARREGAR MASCARAS DOS CAMPOS
   carregarMascaras();

}


// FUNÇÃO PARA ALTERAR A QUANTIDADE DE AULAS POR SEMANA
function editarAulasPorSemana(){
  
  $("#alterarAulasPorSemana").css("bottom","0px");
  $(".mascara-menu").fadeIn(500);

}


// FECHAR (CANCELAR) ACTION DOS COMBOS
function cancelarActionCombo(){
   
   $(".actions-combos").css("bottom","-46%");
   $(".mascara-menu").hide(0);

}


// SALVAR ACTION COMBO
function salvarActionCombo(inputSeletor,inputCaixaSeletor){

  // O VALOR DO CAMPO ESTÁ NA VARIAVEL inputSeletor
  // A CAIXA QUE DEVE SAIR FICA NA VARIAVEL inputCaixaSeletor
  
  $(inputCaixaSeletor).css("bottom","-46%");
  $(".mascara-menu").hide(0);
  
  aviso("Opções salvas com sucesso!","Suas informações foram atualizadas! Fique atento por que os valores e condições de pagamento podem ter sido mudadas.");

}


// CONFIRMAR SE O USUÁRIO QUER MESMO REMOVER A MODALIDADE
function confirmarRemoverModalidade(idItem){
  
   $("#removerModalidadeConfirmar").css("bottom","0px");
   $(".mascara-menu").fadeIn(500);

   console.log("VAMOS CONFIRMAR SE O USUÁRIO QUER REMOVER A MODALIDADE: "+idItem);

   localStorage.setItem("idRemocaoModalidade",idItem);

}

function efetivarRemoverModalidade(){
   
   console.log("VAMOS COMEÇAR A FUNÇÃO PARA REMOVER A MODALIDADE DO CONTRATO");
   var idModalidade = localStorage.getItem("idRemocaoModalidade");

   console.log("ID DA MODALIDADE A SER REMOVIDA: "+idModalidade);

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"remover-modalidade.php",
                  data:{idModalidade:idModalidade}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DA API SOBRE A REMOÇÃO","background:#ff0000;color:#fff;");
                  console.log(dados);

                  $("#cpc"+idModalidade).fadeOut();
                  cancelarActionCombo();
                  voltarAoInicio();
                  aviso("Deu certo!","Modalidade foi removida do seu contrato com sucesso");

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (efetivarRemoverModalidade)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

      console.log("FUNÇÃO ENCERRADA");   

}




// ADICIONAR MODALIDADE
function adicionarNovaModalidade(){
  
    $("#addModalidade").css("bottom","0px");
    $(".mascara-menu").fadeIn(500);

}




/* FUNÇÃO GERAL PARA EXIBIR OS AVISOS DO PÁGINA */
function aviso(titulo,mensagem){
  
  console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
  $(".modal-avisos").fadeIn(100);

  $(".modal-avisos .aviso").css("bottom","0");
  

  // ALIMENTAR O HTML
  $(".aviso h3 span").html(titulo);
  $(".aviso p").html(mensagem+'<p style="padding-top:12px;"><button type="button" onclick="fecharAviso();" class="btn btn-primary">Ok</button></p>');

}
function fecharAviso(){
  
  $(".modal-avisos .aviso").css("bottom","-30%");
  $(".modal-avisos").fadeOut(500);

}


/* FUNÇÃO PARA RESET DE SENHA */
function procEsqueciSenha(){
    
    aviso("Reset de senha realizado com sucesso.","As intruções para o reset de senha foram enviadas para o seu e-mail cadastrado.");

}

// FUNÇÃO PARA ABRIR MENU MOBILE
function openMenu(){

	$(".menu-principal").css("top","0px");
	$(".mascara-menu").fadeIn(500);

}

// FUNÇÃO PARA FECHAR MENU MOBILE
function fecharMenuMobile(){
    
    $(".menu-principal").css("top","-95%");
	$(".mascara-menu").fadeOut(500);


}

// VERIFICAR SESSAO
function verificarSessao(){
  
  if(localStorage.getItem("logado-orrameu")=="sim"){

    console.log("USUÁRIO JÁ ESTÁ LOGADO, REDIRECIONANDO...");
    location.href="dashboard.html";

  }else{

    console.log("USUÁRIO NÃO ESTÁ LOGADO");


  }

}

// SAIR DO APLICATIVO
function logoff(){
  
    console.log("VAMOS INICIAR O LOGOFF");    
    
    localStorage.setItem("logado-orrameu","não");

    localStorage.clear();
    
    location.href="index.html";

}



// FUNÇÃO PARA PERGUNTAR SE O USUÁRIO QUER MESMO SAIR
function perguntarSair(){
  
   $(".menu-principal").css("top","-95%");
   $(".perguntar-sair").css("bottom","0%");

}


// CANCELAR O SAIR DO APLICATIVO
function cancelarSair(){
  
  fecharMenuMobile();
  $(".perguntar-sair").css("bottom","-45%");


}




// DIRECIONAR O USUÁRIO PARA OS MEIOS DE ATUALIZAÇÃO DA FOTO DE PERFIL
function atualizarFotoPerfil(){
    
   console.log("USUÁRIO QUER ATUALIZAR A FOTO PERFIL");

   // DIRECIONAR PARA A VIEW DO CARRINHO
   $JSView.goToView('viewAtualizarFotoPerfil');
   
   manterFotoPerfilAtualizada();

}



/* ######### FUNÇÕES USO DE CAMERA SELFIE #########  */
var minhaImagem;
var controleFotoEnviada = 1;
var tipoArquivo = "nenhum";
function initCameraSelfie(){

         minhaImagem;
         controleFotoEnviada = 1;
         
         tipoArquivo = "camera";

         console.log("INICIANDO FUNÇÃO PARA INICIALIZAR A CAMERA SELFE");

        // SCRIPTS DA CAMERA                                 

                        controleFotoEnviada = 2;
                        console.log("CONTROLE FOTO ENVIADA ATUALIZADA");
                        
                        console.log("INICIALIZANDO A CAMERA");
                        $("#retornoMsgSelfie").html("inicializando a câmera para a selfie");
                        navigator.camera.getPicture(onSuccess2, onFail2, {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL
                        });

                        function onSuccess2(imageData) {
                            console.log("CAMERA INICIALIZADA COM SUCESSO");
                            $("#retornoMsgSelfie").html("Imagem capturada com sucesso!");
                            var image = document.getElementById('fotoDestinoSelfie');
                            image.style.display = 'block';
                            image.src = "data:image/jpeg;base64," + imageData;

                            minhaImagem = imageData;

                            $(".perfil-banner .foto-perfil").css("background","url('data:image/jpeg;base64,"+imageData+"')");
                            $(".perfil-banner .foto-perfil").css("background-size","cover");
                            $(".perfil-banner .foto-perfil").css("background-position","center center");
                            localStorage.setItem("parametroFoto",1);

                            var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
                            obj.dados[0].foto_perfil = 'data:image/jpeg;base64,'+imageData;

                            localStorage.setItem("dadosUsuario",JSON.stringify(obj));
                            
                            $('.btn-action-foto').attr('onclick',"uploadMyImageSelfie()");

                        }

                        function onFail2(message) {
                            console.log("CAMERA NÃO FUNCIONOU");
                            $("#retornoMsgSelfie").html("Não possível obter a imagem da sua câmera, tente novamente. "+message);
                            console.log('### MOTIVO FALHA DE ACESSO A CÂMERA: ' + message);
                        }                           

        document.addEventListener("deviceready", function () {  
        //alert("Phonegap");                                                                                        
        }, false); 

}

function uploadMyImageSelfie(){

              console.log("INICIANDO FUNÇÃO PARA FAZER UPLOAD DA IMAGEM");
   
                                    if(controleFotoEnviada == 2){

                                            $('.btn-action-foto').html("processando...");

                                            var cadastroEmail = localStorage.getItem("idUsuario");
                                            
                                            $.ajax({
                                              type: "POST",
                                              url: urlCdn+'upload-selfie-camera.php?cadastroEmail='+cadastroEmail,
                                              data: { img_data:minhaImagem},
                                              cache: false,
                                              contentType: "application/x-www-form-urlencoded",
                                              success: function (result) {
                                                
                                                $('#sendFileSelfie').html("ATUALIZAR IMAGEM");      
                                                aviso("Foto de perfil atualizada com sucesso","Obrigado por manter o seu perfil atualizado!");
                                                meuCadastro(); 

                                                minhaImagem = "";
                                                controleFotoEnviada = 1;
                                                tipoArquivo = "nenhum";                                        

                                              },
                                              fail: function(result){
                                                aviso("Oops! Algo deu errado, tente novamente",result);
                                              }
                                            });   

                                        }else{

                                            aviso('Oops! Você não selecionou nenhuma imagem','Você não selecionou ou tirou nenhuma foto.');
                                            $('.btn-action-foto').html("ATUALIZAR IMAGEM");

                                        }

}

// SE O USUÁRIO QUISER UM ARQUIVO LOCAL
function sendFileLocalSelfie(seletor){

         minhaImagem;
         controleFotoEnviada = 1;

         console.log("FUNÇÃO PARA ENVIAR ARQUIVOS LOCAIS");

         var files = $(seletor)[0].files;
         $("#qtdSelfie").val(files.length);
         $("#areaImgensIdUsuarioSelfie").val(localStorage.getItem("idUsuario"));
         console.log("QTD IMAGENS SELECIONADAS: "+files.length);
         //$('#visualizar').html('Enviando... pode levar alguns minutos');

         $("#retornoMsgSelfie").html("Carregando o seu arquivo");
         $('#sendFileSelfie').html("PROCESSANDO..."); 
         $('#sendFileSelfie').attr("onclick","aviso('Estamos carregando o seu arquivo','Aguarde mais alguns minutos')"); 

         /* Efetua o Upload */
         $('#form_imageSelfie').ajaxForm({
          //target:'#visualizar' // o callback será no elemento com o id #visualizar
          dataType:  'json',
          success:   processJson 
         }).submit();
    

       function processJson(dados) { 

            // 'data' is the json object returned from the server 
            console.log("%c RETORNO SOBRE O ENVIO DAS IMAGENS (UPLOAD):","background:#ff0000;color:#fff;");
            console.log(dados);             

            if(dados.dados.length>0){
            
              $(".perfil-banner .foto-perfil").css("background","url('"+dados.dados[0].imagem+"')");
              $(".perfil-banner .foto-perfil").css("background-size","cover");
              $(".perfil-banner .foto-perfil").css("background-position","center center");
              localStorage.setItem("parametroFoto",1);
              var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
              obj.dados[0].foto_perfil = dados.dados[0].imagem;
              localStorage.setItem("dadosUsuario",JSON.stringify(obj));
              //$("#fotoDestinoSelfie").css("width","54%");
            
              controleFotoEnviada=2;
              tipoArquivo = "ARQUIVO LOCAL";
            
              $('#sendFileSelfie').html("ATUALIZAR IMAGEM");  
              $("#retornoMsgSelfie").html("Arquivo carregado! Clique em <b>ATUALIZAR IMAGEM</b> para salvar as modificações");
              $('#sendFileSelfie').attr("onclick","meuCadastro();aviso('Foto de perfil atualizada com sucesso','Obrigado por manter o seu perfil atualizado!');");

              minhaImagem = "";
              controleFotoEnviada = 1;
              tipoArquivo = "nenhum"; 
            
            }else{

              minhaImagem = "";
              controleFotoEnviada = 1;
              tipoArquivo = "nenhum"; 
              $("#retornoMsgSelfie").html("Erro ao processar imagem, tente novamente.");
              aviso("Oops! Algo deu errado, com sua imagem. Essa é a mensagem de erro:"+dados.erros);

            }

            $('#selecionarArquivoInputSelfie').resetForm();

        }

    } 
/* #########  FIM DA FUNÇÃO SOBRE CAMÊRA SELFIE #########  */
