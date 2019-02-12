//Classe CalcRegra
class CalcRegra {
    
    constructor(){
        
        this._operator = [];
      /*  this.clearAll();
        this.addOperator();
        this.setError();
        this.clearEntry();
        this.execBtn(); */
        
        //Armazena dentro da Variável _locate.
        this._locate = 'en-EN';
        //Referencia e armazena o elemento HTML/CSS
        this._displayCalcEl =  document.querySelector('#calc__display--valor');
        this._dateEl =  document.querySelector('#calc__display--date');
        this._timeEl = document.querySelector('#calc__display--time');
        
        
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.addEventListenerAll();
    }
    
//-----------------------------------------------------------    
    //Função ou Método que inicializa com essas informações.
    initialize(){
        //Chamando o Metodo "updateDateTime"
        this.updateDateTime();
    
        //Informa um Intervalo em Milisegundo.
        setInterval(()=>{
            this.updateDateTime();
        }, 1000); //Tempo em Milisegundos.
        
        this.setLastNumberToDisplay();
    } //Fim do Método
    
//------------------------------------------------------------
    
    //Método que Faz uma busca em um split, pelo evento do "addEventListener".
    addEventListenerAll(element, events, fn){
        
        //O Split determina qual o separador do array.
        events.split(' ').forEach(event => {
            //Faz uma busca no elemento, pelo evento.
            element.addEventListener(event, fn, false);
        });
    }
    
//----------------------------------------------------------    
    //Método de Eventos dos botões da calculadora.
    initButtonsEvents(){
        //Declarado a Variável e armazenando os elementos buttons.
        let buttons = document.querySelectorAll('.calc > button');
        
        //Faz uma busca no array buttons, com o forEach procurando nos btn, o evento click ou drag
        buttons.forEach((btn, index) => {
            //Adicionando evento de Click e Drag.
            this.addEventListenerAll(btn, "click drag", e=>{
                //testando e tratando a saída no console
                let textBtn = btn.className.replace("btn-", "");
                
                this.execBtn(textBtn);
            });
            
            //Adicionando Evento de mouseover, mouseup e mousedown
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=> {
               //E transformando o ponteiro em uma mão no elemento que foi adicionado o evento.
                btn.style.cursor = "pointer";   
            });
        });      
    }
    
//----------------------------------------------------------   
    
    //Método Criado, pois irá se repetir algumas vezes.
    updateDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locate, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
         this.displayTime = this.currentDate.toLocaleTimeString(this._locate);     
    }//Método Finalizado
    
//-------------------------------------------------------
    
clearAll(){
    this._operator = [];
    this.setLastNumberToDisplay();
}
    
clearEntry(){
    this._operator.pop();
    this.setLastNumberToDisplay();
}
    
setError(){
    this.displayCalc = "Error";
}

//Método para pegar a Ultima posição do ARRAY.
getLastOperator(){
    //Retorna a ultima posição do array com a propriedade length.
    return this._operator[this._operator.length-1];
    //O length - 1, vai me dar a noção da ultima posição do array.
}
    
setLastOperator(value){
    this._operator[this._operator.length - 1] = value;
}

//--------------------------------------------------
    
//Método para testar se value é um operador Aritmético.
isOperator(value){
    //testa se o 'value' tem algum dos valores do ARRAY abaixo
    return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    /*Caso tenha tenha o valor dentro do array, o indexOf retorna qualquer valor acima de -1. Ocasionando o resultado TRUE.*/
}
    
//--------------------------------------------------
    
pushOperator(value){
    this._operator.push(value);
    
    if(this._operator.length > 3){
        
        this.calc();
    }
}
    
//Método que realiza o cálculo
calc(){
    
    //Variável LAST declarada e recebendo valor vazio.
    let last = '';
    
    //Verrifica se o ARRAY tem mais de 3 valores
    if (this._operator.length > 3){
        //Após a Verificação LAST recebe o ultimo do ARRAY
        last = this._operator.pop();//O POP retira o ultimo valor do ARRAY
    }
    //O JOIN junta todos os valores do ARRAY em uma STRING e o Eval avalia a expressão
    let result = eval(this._operator.join(""));
    
    //Verifica se o operador recebido é o Porcento 
    if(last == '%'){
        
        result /= 100;
        this._operator = [result];
    
    }else{
     
        this._operator = [result];
        
        if(last) this._operator.push(last);
    
    }
        this.setLastNumberToDisplay();
}//FIM do Método CALC
    
    
    
setLastNumberToDisplay(){
    
    let lastNumber;
    
    for (let i = this._operator.length-1; i >= 0; i--){
        if(!this.isOperator(this._operator[i])){
            lastNumber = this._operator[i];
            break;
        }
    }
    if(!lastNumber) lastNumber = 0; 
    this.displayCalc = lastNumber;
}
    
//--------------------------------------------------


addOperator(value){
    
    if(isNaN(this.getLastOperator())){
        if(this.isOperator(value)){
            this.setLastOperator(value);
        }else if(isNaN(value)){
            console.log('OutraCoisa');
        }else{
        this.pushOperator(value);
        this.setLastNumberToDisplay();
    }
    }else{
        
        if(this.isOperator(value)){
            this.pushOperator(value);
        }else{
            let newValue = this.getLastOperator().toString() + value.toString();
        this.setLastOperator(parseInt(newValue));        
        this.setLastNumberToDisplay();
        }
    }
}
    
    
execBtn(value){
    
//SWITCH para Leitura dos botões do Teclado
    switch(value){
        case 'ac':
            this.clearAll();
            break;
        case 'ce':
            this.clearEntry();
            break;
        case 'soma':
            this.addOperator('+');
            break;
        case 'subtracao':
            this.addOperator('-');
            break;
        case 'divisao':
            this.addOperator('/');
            break;
        case 'multiplicacao':
            this.addOperator('*');
            break;
        case 'porcentagem':
            this.addOperator('%');
            break;
        case 'igual':
            this.calc();
            break;
        case 'ponto':
            this.addOperator('.');
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            this.addOperator(parseInt(value));
            break;
        default:
            this.setError();
            break;
    }
}    
    
//-------------------------------------------------------    
    
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
        return this._displayCalcEl.innerHTML;
    }
    
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value; 
    }
    
    get currentDate(){
        return new Date();
    }
    
    set currentDate(value){
        this._currentDate = value;
    }
}//Fim da Classe