var urlApi = "https://servidorseguro.cloud/orrameu/api/";
var urlCdn = "https://servidorseguro.cloud/orrameu/administrativo/arquivos/";
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

    var obj = JSON.parse(localStorage.getItem("dadosUsuario"));
    console.log("DADOS JSON PARSE: ");
    console.log(obj);
    
    // ALTERAR FOTO DE PERFIL
    if(obj.dados[0].foto_perfil!==null){

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
                     
                   console.log("API NÃO DISPONÍVEL (carregarInicio)");
                   console.log(dados);

                   //salvarLog("API NÃO DISPONÍVEL (testeApi)",dados["sucesso"]);
                   //aviso("Oops! Temos um problema","Não conseguimos comunicação com nossos servidores. Tente novamente depois de alguns minutos");

              });
              // FINAL CHAMADA AJAX

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
                   localStorage.setItem("nomeUsuario",dados["nome"]);
                   localStorage.setItem("emailUsuario",dados["email"]);
                   localStorage.setItem("idUsuario",dados["id"]);
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

                                // MONTAR O OWL CARROUSEL DESSA SESSÃO

                                var minhasAulasRegulares = $('#minhasAulasRegulares').owlCarousel({
                                        loop:false,
                                        margin:6,
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
function eventos(){

       // FECHAR O MENU MOBILE
       fecharMenuMobile();
      
       // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
       $JSView.goToView('viewEventos');


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

}

// ABRIR LIGHTBOX DETALHE EVENTO
function detalheEvento(idEvento){
  
    console.log("ABRINDO DETALHE DO EVENTO");

    $(".lightbox-eventos").show("500"); 

}

// FECHAR LIGHTBOX DETALHE EVENTO
function fecharEvento(){
  
  console.log("FECHANDO DETALHE DO EVENTO");
  
  $(".lightbox-eventos").fadeOut("500"); 

}


// REDIRECIONAR PARA A LOJA
function loja(){
  
       // FECHAR O MENU MOBILE
       fecharMenuMobile();
      
       // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
       $JSView.goToView('viewLoja');

       // CARREGAR PRODUTOS
       // carregarProdutos();

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

     // CARREGAR DETALHES DO PRODUTO
     // carregarDetalhesProduto();

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
  
   // FECHAR O MENU MOBILE
   fecharMenuMobile();
  
   // DIRECIONAR PARA A VIEW DE EDIÇÃO DE CADASTRO
   $JSView.goToView('viewContrato');

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
function confirmarRemoverModalidade(){
  
   $("#removerModalidadeConfirmar").css("bottom","0px");
   $(".mascara-menu").fadeIn(500);

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


// ADICIONAR PRODUTO AO CARRINHO
function addCarrinho(idCarrinho){
  
  console.log("ADICIONAR PRODUTO AO CARRINHO");

  // DIRECIONAR PARA A VIEW DO CARRINHO
   $JSView.goToView('viewCarrinho');

}