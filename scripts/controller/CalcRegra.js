//Classe CalcRegra
class CalcRegra {

    //Método Cosntrutor
    constructor() {
        this._audio = new Audio('../audio/click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operator = [];

        //Armazena dentro da Variável _locate.
        this._locate = 'en-EN';
        //Referencia e armazena o elemento HTML/CSS
        this._displayCalcEl = document.querySelector('#calc__display--value');
        this._dateEl = document.querySelector('#calc__display--date');
        this._timeEl = document.querySelector('#calc__display--time');


        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        // this.addEventListenerAll();
        this.initKey();
    }

    //-----------------------------------------------------------    
    //Função ou Método que inicializa com essas informações.
    initialize() {
        //Chamando o Metodo "updateDateTime"
        this.updateDateTime();

        //Informa um Intervalo em Milisegundo.
        setInterval(() => {
            this.updateDateTime();
        }, 1000); //Tempo em Milisegundos.

        this.setLastNumberToDisplay();
        this.pasteToClipboard();
        
        
        document.querySelectorAll('.btn-ac').forEach(btn=>{
            
            btn.addEventListener('dblclick', e=>{
                
                this.statusAudio();
                
            });
        });
        
    } //Fim do Método
    
    statusAudio(){
        
        this._audioOnOff = !this._audioOnOff;
        
    }
    
    playAudio(){
        
        if (this._audioOnOff){
            
            this._audio.currentTime = 0;
            
            this._audio.play();
        }
    }

    //------------------------------------------------------------

    //Método que Faz uma busca em um split, pelo evento do "addEventListener".
    addEventListenerAll(element, events, fn) {

        //O Split determina qual o separador do array.
        events.split(' ').forEach(event => {
            //Faz uma busca no elemento, pelo evento.
            element.addEventListener(event, fn, false);
        });
    }

    //----------------------------------------------------------    
    //Método de Eventos dos botões da calculadora.
    initButtonsEvents() {
        //Declarado a Variável e armazenando os elementos buttons.
        let buttons = document.querySelectorAll('.calc > button');

        //Faz uma busca no array buttons, com o forEach procurando nos btn, o evento click ou drag
        buttons.forEach((btn, index) => {
            //Adicionando evento de Click e Drag.
            this.addEventListenerAll(btn, "click drag", e => {
                //testando e tratando a saída no console
                let textBtn = btn.className.replace("btn-", "");

                this.execBtn(textBtn);
            });

            //Adicionando Evento de mouseover, mouseup e mousedown
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                //E transformando o ponteiro em uma mão no elemento que foi adicionado o evento.
                btn.style.cursor = "pointer";
            });
        });
    }

    //----------------------------------------------------------   

    //Método Criado, pois irá se repetir algumas vezes.
    updateDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locate, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locate);
    } //Método Finalizado

    //-------------------------------------------------------

    clearAll() {
        this._operator = [];

        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operator.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = "Error";
    }

    //-------------------------------------------------------

    //Método para pegar a Ultima posição do ARRAY.
    getLastOperator() {
        //Retorna a ultima posição do array com a propriedade length.
        return this._operator[this._operator.length - 1];
        //O length - 1, vai me dar a noção da ultima posição do array.
    }

    setLastOperator(value) {
        this._operator[this._operator.length - 1] = value;
    }

    //--------------------------------------------------

    //Método para testar se value é um operador Aritmético.
    isOperator(value) {
        //testa se o 'value' tem algum dos valores do ARRAY abaixo
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
        /*Caso tenha tenha o valor dentro do array, o indexOf retorna qualquer valor acima de -1. Ocasionando o resultado TRUE.*/
    }

    //----------------------------------------------------

    pushOperator(value) {
        this._operator.push(value);

        if (this._operator.length > 3) {

            this.calc();
        }
    }

    //----------------------------------------------------

    getResult() {
        console.log('getResult', this._operator);

        return eval(this._operator.join(""));
    }

    //----------------------------------------------------

    //Método que realiza o cálculo
    calc() {

        //Variável LAST declarada e recebendo valor vazio.
        let last = '';

        this._lastOperator = this.getLastItem();

        //Verrifica se o ARRAY tem mais de 3 valores
        if (this._operator.length < 3) {
            //Após a Verificação LAST recebe o ultimo do ARRAY
            let firstItem = this._operator[0];
            this._operator = [firstItem, this._lastOperator, this._lastNumber];
        }

        //Verrifica se o ARRAY tem mais de 3 valores
        if (this._operator.length > 3) {
            //Após a Verificação LAST recebe o ultimo do ARRAY
            last = this._operator.pop(); //O POP retira o ultimo valor do ARRAY

            this._lastNumber = this.getResult();
        }

        if (this._operator.length == 3) {

            this._lastNumber = this.getResult(false);
        }

        //O JOIN junta todos os valores do ARRAY em uma STRING e o Eval avalia a expressão
        let result = this.getResult();


        //Verifica se o operador recebido é o Porcento 
        if (last == '%') {

            result /= 100;
            this._operator = [result];

        } else {

            this._operator = [result];

            if (last) this._operator.push(last);

        }
        this.setLastNumberToDisplay();
    } //FIM do Método CALC

    //---------------------------------------------------

    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operator.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operator[i]) == isOperator) {
                lastItem = this._operator[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    //--------------------------------------------------   

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    //--------------------------------------------------


    addOperator(value) {

        if (isNaN(this.getLastOperator())) {

            if (this.isOperator(value)) {

                this.setLastOperator(value);

            } else {

                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }
        } else {

            if (this.isOperator(value)) {

                this.pushOperator(value);

            } else {

                let newValue = this.getLastOperator().toString() + value.toString();

                this.setLastOperator(newValue);

                this.setLastNumberToDisplay();
            }
        }
    }

    //--------------------------------------------------

    //Método de Recebimento do Botão PONTO
    addDot() {
        let lastOperator = this.getLastOperator();
        //Verificando o Tipo da variável, e comparando se é string, e contando a quantidade de pontos.
        if (typeof lastOperator === 'string' && lastOperator.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperator) || !lastOperator) {
            this.pushOperator('0.');
        } else {
            this.setLastOperator(lastOperator.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }

    //---------------------------------------------------    
    //Método Capturando Execução dos Botões 
    execBtn(value) {
        
        this.playAudio();

        //SWITCH para Leitura dos botões do Teclado da Calculadora
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'sum':
                this.addOperator('+');
                break;
            case 'subtract':
                this.addOperator('-');
                break;
            case 'division':
                this.addOperator('/');
                break;
            case 'multiplication':
                this.addOperator('*');
                break;
            case 'porcentage':
                this.addOperator('%');
                break;
            case 'equal':
                this.calc();
                break;
            case 'ponto':
                this.addDot('.');
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

    //------------------------------------------------------

    //Método para Copiar da área de transferência (ClipBoard)
    copyToClipboard() {
        let inputCopy = document.querySelector("#inputClipBoard");

        inputCopy.value = this.displayCalc;

        document.execCommand("copy");
    }

    //Método para Colar da área de transferência (ClipBoard)
    pasteToClipboard() {

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

            //Verificando se o valor de text é numerico
            if (isNaN(this.displayCalc)) {
                //Caso não seja numerico executa o metodo de erro
                this.setError();
            } else {
                this.pushOperator(text);
            }
        });
    }


    //-------------------------------------------------------

    //Método Capturar teclas do teclado fisico
    initKey() {
        //Pegando o evento KEYUP quando solta a tecla fisica
        document.addEventListener('keyup', e => {
            
                this.playAudio();

            //SWITCH para Leitura dos botões do Teclado Fisico
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;

                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperator(e.key);
                    break;

                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case '.':
                case ',':
                    this.addDot('.');
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
                    this.addOperator(parseFloat(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
            }
        });
    }

    //-------------------------------------------------------    

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
} //Fim da Classe
