/*
      ````                                            `-///.       `://-        .//:.       `://-   
   -ohddmdhd/  yddmmm:     /hdmddh:   `ydmdddddmm/  .ymhoohMh    .ymyoyMd`    /ddssmM+    .ymyohMh  
 `yNo-` `-mm.  `:mmyMh      `sMo``     `hM/.+:.mm`  :o.  `:Md   .mm.   hM:   sMo   -Md   :Nh.   mM. 
 hM:      .`   /Nd-.NM.     `NN`   `   .MMhdM/ .`     `-odd+`   hM:   `NN`  -Md    oMo   dM.   .Mm  
`MN`     ``  `sNmdhhmMs     +Ms   +m/  sMo-dy :s.  `-oddo-`    `MN    sM+   sM+   -Nm`  -Mm   `yM/  
 yMdo//+sdy.+dMho..+yMN+--++mMs+++NN`:+NMo+oo+NN` +dNNyo+os.    dMs/+dd/    /Mm+/smy.   `mMo/odd:   
  ./oso+/.`-++++:  /++++`-+++++++++: :+++++++++:  +++++++++`    `/oo+-`      -+so/.      `/oo+-`    
                                                                                                    

 BIBLIOTECA PARA CONVERSÃO E FERRAMENTAS DE DATAS VERSÃO JS
 PROGRAMADOR: DIOGENES OLIVEIRA DOS SANTOS JUNIOR
 WWW.DIOGENESJUNIOR.COM.BR
 CONTATO@DIOGENESJUNIOR.COM.BR

*/

class Cale2000 {
     
    constructor(){
        console.log("%c OOPS! ESSA CLASSE É APENAS ESTÁTICA","background:#ff0000;color:#fff;");
    }
    
    // CONVERTER DATA FORMATO AAA-MM-DD PARA DD/MM/AAAA
    static cale001(tempData) {

    	tempData = new Date(tempData);

        return `${tempData.getDate()}/${tempData.getMonth() + 1}/${tempData.getFullYear()}`;
        
    }

    // DEVOLVER O MÊS NO FORMATO EXTENSO, EXEMPLO RECEBE 2020-02-02 , DEVOLVE FEVEREIRO/2020
    static cale002(tempData) {

    	tempData = new Date(tempData);

        let mes = tempData.getMonth() + 1;

        if(mes=="01"){ mes = "JANEIRO"; }
        if(mes=="02"){ mes = "FEVEREIRO"; }
        if(mes=="03"){ mes = "MARÇO"; }
        if(mes=="04"){ mes = "ABRIL"; }
        if(mes=="05"){ mes = "MAIO"; }
        if(mes=="06"){ mes = "JUNHO"; }
        if(mes=="07"){ mes = "JULHO"; }
        if(mes=="08"){ mes = "AGOSTO"; }
        if(mes=="09"){ mes = "SETEMBRO"; }
        if(mes=="10"){ mes = "OUTUBRO"; }
        if(mes=="11"){ mes = "NOVEMBRO"; }
        if(mes=="12"){ mes = "DEZEMBRO"; }

        return mes+"/"+tempData.getFullYear();
        
    }

    // CONVERTER DATA FORMATO AAA-MM-DD PARA DD/MM (RESUMIDA SEM O ANO)
    static cale003(tempData) {

    	tempData = new Date(tempData);

        return `${tempData.getDate()}/${tempData.getMonth() + 1}`;
        
    }


    
}