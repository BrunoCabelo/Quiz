$(function(){

    // Função para randomizar array
    function shuffle(array) {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
      }
      
    


    var respostas, respostaCorreta, respostasEmbaralhadas, questions;  
    var nper = 0;

    $('#respQuiz').click(() => {
        
        var resp = $("input[name='quiz']:checked").val();
        if(resp == respostaCorreta){
           // alert('Acertou');
            window.setTimeout(()=> {
                (nper < 9) ? nper++ : nper = 0;
                geradorPerguntas(spinner);
                $('#acertou').hide();    
            },1000) 
            $('#acertou').show();
           
            
        }else{
            
            window.setTimeout(()=> {
                $('#errou').hide();    
            },1500) 
            $('#errou').show();
        }

        
    })

    function quiz(data){
        //Pega as questões
        questions = data.results;
        geradorPerguntas(spinner);
    }

    function spinner(response){
        if(response){
            response;
            $('.refresh-loader').hide()
        }else{
            $('.refresh-loader').show()
        }
    }

    function geradorPerguntas(callback){
        var html = "";

        //Separa a pergunta atual
        var pergunta = questions[nper].question;
        var id = nper;

        //Pega as respostas
        var respostas = [questions[nper].correct_answer];
        respostaCorreta = questions[nper].correct_answer;
            
        for(let a = 0; a < questions[nper].incorrect_answers.length; a++){
            respostas.push(questions[nper].incorrect_answers[a]) 
        }

        //Embaralha as respostas
        respostasEmbaralhadas = shuffle(respostas);

        //Monta o HTML
        var inputs = ""

        for(let a = 0;a < respostasEmbaralhadas.length; a++){
            inputs += '<input type="radio" name="quiz" value="'+ respostasEmbaralhadas[a] +'">'+ respostasEmbaralhadas[a] +'<br>';
        }

        html += '<h3>'+ pergunta +'</h3>' +
        '<form>' + inputs + '</form>'+
        '</br>';

        callback($('#perguntas').html(html));
        
       
    };



    function filmes(callback){
        $.ajax({
            url: 'https://opentdb.com/api.php?amount=10&category=11&type=multiple',
            type: 'GET',
            dataType: 'json'
        }).done((data) => {
            callback(data);
            dataa = data;
        })
    }

    filmes(quiz);

});