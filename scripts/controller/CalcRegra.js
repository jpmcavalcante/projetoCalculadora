//Classe CalcRegra
class CalcRegra {
    
    constructor(){
        //Armazena dentro da Variável _locate.
        this._locate = 'pt-BR';
        //Referencia e armazena o elemento HTML/CSS
        this._displayCalcEl =  document.querySelector('#calc__display--valor');
        this._dateEl =  document.querySelector('#calc__display--date');
        this._timeEl = document.querySelector('#calc__display--time');
        
        this._currentDate;
        this.initialize();
    }
    
    //Função ou Método que inicializa com essas informações.
    initialize(){
        //Chamando o Metodo "updateDateTime"
        this.updateDateTime();
    
        //Informa um Intervalo em Milisegundo.
        setInterval(()=>{
            this.updateDateTime();
        }, 1000); //Tempo em Milisegundos.
    } //Fim do Método
    
    
    //Método Criado, pois irá se repetir algumas vezes.
    updateDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locate);
         this.displayTime = this.currentDate.toLocaleTimeString(this._locate);      
    }//Método Finalizado
    
    
        
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }
    
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    
    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }
    
    get displayCalc(){
        return this._displayCalc;
    }
    
    set displayCalc(value){
        this._displayCalc = value; 
    }
    
    get currentDate(){
        return new Date();
    }
    
    set currentDate(value){
        this._currentDate = value;
    }
}//Fim da Classe