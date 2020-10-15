class ListaEventos{

    constructor(){
         
        this._eventos = []

    }

    adiciona(eventos){
        this._eventos.push(eventos);
    }

    get eventos(){
        
        return this._eventos;

    }

    showEvento(idEvento){
        
       for(let i = 0;i<arrayEventos.eventos[0].length;i++){

    		if(arrayEventos.eventos[0][i].id==idEvento){

    			 $(".lightbox-eventos").show("500"); 
    			 $("#imagemEvento").attr("src",urlCdn2+arrayEventos.eventos[0][i].capa_evento);
    			 $("#imagemEvento").attr("alt",arrayEventos.eventos[0][i].nome_evento);
                 
                 $(".lightbox-eventos h2").html(Cale2000.cale001(arrayEventos.eventos[0][i].data_evento)+" "+arrayEventos.eventos[0][i].horario);

    			 $(".lightbox-eventos h3 span").html(arrayEventos.eventos[0][i].nome_evento);
    			 $(".lightbox-eventos h3 small").html(arrayEventos.eventos[0][i].descricao);

    			 $(".lightbox-eventos #conteudoEvento").html(arrayEventos.eventos[0][i].conteudo);

    		}

    	}
    	


    }

}