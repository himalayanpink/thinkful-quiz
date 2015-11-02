$(document).ready(function(){

	// ------ ARRAY/QUIZ DATA ----- //

	var quiz = [

			{	
				question:'Who the heck are the "nine old men" anyway?',
				choices:
					[
					'Members Of The Supreme Court', 
					'A Group Of Famous Disney Animators',
					'A Russian Military Cabal',
					'Heads Of The World Science Fiction Society',
					],
				answer:'A Group Of Famous Disney Animators',
				wrongChoiceResponse: 'Oh dear.  The rest of this might be difficult.',
				rightChoiceResponse: 'Oh good.  Moving on.',
			},

			{	
				question:'TextyTest',
				choices:
					[
					'test', 
					'test1',
					'test2',
					'test3',
					],
				answer:'test',
				wrongChoiceResponse: 'Not Good.',
				rightChoiceResponse: 'Good.',
			},
		
		];



	// ------ CALL-FROM-ARRAY SHORTCUTS ----- //

	var currentQuestion = 0;

	var quizQuestion = quiz[currentQuestion].question;
	var quizChoices = quiz[currentQuestion].choices;
	var quizAnswer = quiz[currentQuestion].answer;
	var quizWrongChoiceClick = quiz[currentQuestion].wrongChoiceResponse;
	var quizRightChoiceClick = quiz[currentQuestion].rightChoiceResponse;

	var isAnswer = false;



	// ------ RANDOMIZE CHOICE OUTPUT/ORDER ----- //

	function shuffle(array) {

		var currentIndex = array.length, temporaryValue, randomIndex ;

			while (0 !== currentIndex) {

				randomIndex = Math.floor(Math.random() * currentIndex);
	   			currentIndex -= 1;

	   			temporaryValue = array[currentIndex];
	    		array[currentIndex] = array[randomIndex];
	    		array[randomIndex] = temporaryValue;

	    	}

    	return array;

    }

    shuffle(quizChoices);
    console.log(quizChoices);



	// ------ DISPLAY QUESTION AND POPULATE CHOICES ----- //

	function populateQuizBase() {

		$("h3.question").html(quizQuestion);
		$("#choices")
			.empty();
		for (var i = 0; i < quizChoices.length; i++) {
			$("#choices")
				.append('<span class="answerBar"><input type="radio" id=' + i + ' name="answers"><label for=' + i + '><span></span>' + (quizChoices)[i] + '</label></span>');
		}
	};

	function populateQuiz() {

		$("h3.q").show();
		$("h3.question").show();
		
		if(currentQuestion == 0) {
			populateQuizBase();
		}
		else {
			quizQuestion = quiz[currentQuestion].question;
			quizChoices = quiz[currentQuestion].choices;
			quizAnswer = quiz[currentQuestion].answer;
			quizWrongChoiceClick = quiz[currentQuestion].wrongChoiceResponse;
			quizRightChoiceClick = quiz[currentQuestion].rightChoiceResponse;
			shuffle(quizChoices);
			populateQuizBase();
		}

	};


	function runQuiz() {
		// if (isAnswer = true) {
			$("a.arrowRight")
				.on("click", function() {

				   	$("h3.response").hide();
					$("h3.correctAnswerCounter").hide();
					$(".fa.fa-angle-right").hide();
					
					currentQuestion++;
					// populateQuiz();
			

					runQuizBase();

				});	
		// }
		
		// else {
		// 	runQuizBase();
		// }
	};



	// ------ Checks If Answer is Correct and Displays Score----- //

	function checkAnswer(clickedChoice) {

		$("a.arrowRight").click(function() {

			$("h3.q").hide();
			$("h3.question").hide();
			$("#choices").empty();
			$("h3.response").show();
			$("h3.correctAnswerCounter").show();

			if(quizAnswer == clickedChoice) {
       			console.log("Correct");
       			$("h3.response").html('<p>CORRECT!</p>');
       			// $("#questionBox").append('<p>' + quizRightChoiceClick + '</p>' );
    		} 
    
	        else {
	           	console.log("Nope!");
	           	$("h3.response").html('<p>NOPE!</p>');
	           	// $("#questionBox").append('<p>' + quizWrongChoiceClick + '</p>' );
	        }

			// isAnswer = true;
			console.log("Is Answer");


			runQuiz();

		})
	};



	function runQuizBase() {
		

		populateQuiz();
		
		console.log("Is Question");
			
		$("#questionBox")

			.on("click", "input", function() {
				var clickedChoice = $("input:checked").next('label').text();
				console.log(clickedChoice)
			    

				// ------ Shows "Next" Arrow ----- //

				$(".fa.fa-angle-right")
					.hide()
					.fadeOut(100)
					.fadeIn(100)
					.show()
					.css("display", "inline-block")
				;
	 
				$("a.arrowRight").css("cursor", "pointer");

				// ------ END----- //

				checkAnswer(clickedChoice)	
		
		
			});

	};




	runQuizBase();
	// runQuiz();

});































