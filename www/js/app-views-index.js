window.addEventListener('load', function() {

    /* Declarando Views */
    $JSView.declareView({ 
        
        viewPrincipal: {
            url: '/viewPrincipal',
            template: 'views/viewPrincipal.html',
            controller: 'viewPrincipal'
        },
        viewCadastro: {
            url: '/viewCadastro',
            template: 'views/viewCadastro.html',
            controller: 'viewCadastro'
        },
        viewCadastroModalidades: {
            url: '/viewCadastroModalidades',
            template: 'views/viewCadastroModalidades.html',
            controller: 'viewCadastroModalidades'
        },
        viewQPAR: {
            url: '/viewQPAR',
            template: 'views/viewQPAR.html',
            controller: 'viewQPAR'
        },

        
        viewEsqueciSenha: {
            url: '/viewEsqueciSenha',
            template: 'views/viewEsqueciSenha.html',
            controller: 'viewEsqueciSenha'
        },
                


                
        
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