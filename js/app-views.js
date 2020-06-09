window.addEventListener('load', function() {

    /* Declarando Views */
    $JSView.declareView({ 
        
        viewPrincipal: {
            url: '/viewPrincipal',
            template: 'views/viewPrincipal-dashboard.html',
            controller: 'viewPrincipal'
        },
        viewCadastro: {
            url: '/viewCadastro',
            template: 'views/viewCadastro-logado.html',
            controller: 'viewCadastro'
        },
        viewContrato: {
            url: '/viewContrato',
            template: 'views/viewContrato.html',
            controller: 'viewContrato'
        },
        viewPagamentos: {
            url: '/viewPagamentos',
            template: 'views/viewPagamentos.html',
            controller: 'viewPagamentos'
        },
        viewMinhasAulas: {
            url: '/viewMinhasAulas',
            template: 'views/viewMinhasAulas.html',
            controller: 'viewMinhasAulas'
        },
        viewAgendar: {
            url: '/viewAgendar',
            template: 'views/viewAgendar.html',
            controller: 'viewAgendar'
        },
        viewEventos: {
            url: '/viewEventos',
            template: 'views/viewEventos.html',
            controller: 'viewEventos'
        },
        viewLoja: {
            url: '/viewLoja',
            template: 'views/viewLoja.html',
            controller: 'viewLoja'
        },
        viewDetalheProduto: {
            url: '/viewDetalheProduto',
            template: 'views/viewDetalheProduto.html',
            controller: 'viewDetalheProduto'
        },
        viewCarrinho: {
            url: '/viewCarrinho',
            template: 'views/viewCarrinho.html',
            controller: 'viewCarrinho'
        },
        viewAtualizarFotoPerfil: {
            url: '/viewAtualizarFotoPerfil',
            template: 'views/viewAtualizarFotoPerfil.html',
            controller: 'viewAtualizarFotoPerfil'
        }    
                        
    });
          
    
    $JSView.declareModal({
        modalFavoritos: {
            url: '/modalFavoritos',
            template: 'views/modalA.html',
            controller: 'modalFavoritos'
        }
    });

    $JSView
        .initView('viewPrincipal');
        

}, false);