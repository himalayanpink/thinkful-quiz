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
				question:'Who of the following is not listed amongst the "nine old men"?',
				choices:
					[
					'Frank Thomas', 
					'Marc Davis',
					'Les Clark',
					'Al Bertino',
					],
				answer:'Al Bertino',
				wrongChoiceResponse: "That's an Old Man.",
				rightChoiceResponse: 'Al Bertino was active after the Golden Age.',
			},
			
			{	
				question:'Which two movies featured prominent cameos from two of the group?',
				choices:
					['Ratatouille/Bolt', 
					'Lilo & Stitch/Toy Story 2',
					'The Iron Giant/The Incredibles',
					'The Rescuers Down Under/Aladdin',
					],
				answer:'The Iron Giant/The Incredibles',
				wrongChoiceResponse: 'No, no old men cameos in those flicks.',
				rightChoiceResponse: 'Turns out Brad Bird is a fan.',
			},

		// 	{	
		// 		question:'Which character was animated by Ollie Johnston?',
		// 		choices:
		// 			['Mr. Smee from "Peter Pan"', 
		// 			'Gus from "Cinderella"',
		// 			'Lady from "Lady and the Tramp',
		// 			'Merlin from "The Sword in the Stone',
		// 			],
		// 		answer:'Mr. Smee from "Peter Pan"',
		// 		wrongChoiceResponse: "I'm honestly impressed you know that.",
		// 		rightChoiceResponse: "Eh, I'd have to pick randomly too.",
		// 	},

		// 	{	
		// 		question:'Which prominent golden age animator is not considered part of the group?',
		// 		choices:
		// 			[
		// 			'Milt Kahl', 
		// 			'Bill Tytla',
		// 			'Ward Kimball',
		// 			'John Lounsbery',
		// 			],
		// 		answer:'Bill Tytla',
		// 		wrongChoiceResponse: "Hint: He's famous for Dumbo.",
		// 		rightChoiceResponse: 'Though one must wonder why...',
		// 	},
		
		];


	// ------ FUNCTIONS & CALL-FROM-ARRAY SHORTCUTS ----- //

	var currentQuestion = 0;

	var quizQuestion = quiz[currentQuestion].question;
	var quizChoices = quiz[currentQuestion].choices;
	var quizAnswer = quiz[currentQuestion].answer;
	var quizWrongChoiceClick = quiz[currentQuestion].wrongChoiceResponse;
	var quizRightChoiceClick = quiz[currentQuestion].rightChoiceResponse;

	var isAnswerScreen = false;
	var isCorrectAnswer = false;

	var responseText;
	var correctOrNope;

	var score = 0;


	// ------ RANDOMIZE CHOICE OUTPUT & ORDER ----- //

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

		$("h3.question").html('Q: ' + quizQuestion);
		$("#choices")
			.empty();
		for (var i = 0; i < quizChoices.length; i++) {
			$("#choices")
				.append('<span class="answerBar"><input type="radio" id=' + i + ' name="answers"><label for=' + i + '><span></span>' + (quizChoices)[i] + '</label></span>');
		}
	};

	function populateQuiz() {

		if(currentQuestion == 0) {
			populateQuizBase();
		}
		else {
			quizQuestion = quiz[currentQuestion].question;
			quizChoices = quiz[currentQuestion].choices;
			quizAnswer = quiz[currentQuestion].answer;
			// quizWrongChoiceClick = quiz[currentQuestion].wrongChoiceResponse;
			// quizRightChoiceClick = quiz[currentQuestion].rightChoiceResponse;
			shuffle(quizChoices);
			populateQuizBase();
		}

	};


	// ------ Checks If Answer is Correct ----- //

	function checkAnswer(clickedChoice) {

		if(quizAnswer == clickedChoice) {
   			isCorrectAnswer = true;

   			correctOrNope = "CORRECT!"
   			// responseText = quizRightChoiceClick;
   			responseText = quiz[currentQuestion].rightChoiceResponse;
    	} 
    
        else {
           	isCorrectAnswer = false;

           	correctOrNope = "NOPE!"
         	// responseText = quizWrongChoiceClick;
         	responseText = quiz[currentQuestion].wrongChoiceResponse;
        }
	
	};


	// ------ "Alternates" Questions and Answers ----- //

	function showNextScreen(){

		if (isAnswerScreen && currentQuestion == quiz.length-1){
			endQuiz();
		}
		
		else if (isAnswerScreen){
			isAnswerScreen = false;

			$("h3.question").show();
			$("#choices").show();
			
			$("h3.correctOrNope").hide();
			$("h3.correctAnswerCounter").hide();
			$("p.response").hide();
			
			$(".fa.fa-angle-right").hide();
			$(".arrowClickArea").hide();

			
			currentQuestion++;
			populateQuiz();
		}	
	
		else{
			isAnswerScreen = true;

			$("h3.question").hide();
			$("#choices").hide();

			$("h3.correctOrNope").show();
			$("h3.correctAnswerCounter").show();	
			$("p.response").show();

			if(isCorrectAnswer){
				score ++;
			}
			else{
				score;
			}

			$("h3.correctOrNope").html(correctOrNope);

			$("h3.correctAnswerCounter").html('<h3>' + score + '/' + quiz.length + '</h3?>');
			$("p.response").html(responseText);
		}

	};

	$(".arrowClickArea")

		.on("click", function() {
	   		showNextScreen();
		});	


	// ------ End Quiz State ----- //
	
	function endQuiz() {
		$("h3.question").hide();
		$("#choices").hide();
		
		$("h3.correctOrNope").show().html("FINAL SCORE");
		$("h3.correctAnswerCounter").show();
		$("p.response").hide();

		
		$(".fa.fa-angle-right").hide();
		$(".arrowClickArea").hide();
	}



	// ------ Reads User Selection and Shows "Next" Arrow ----- //

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
 
			$(".arrowClickArea").show().css("cursor", "pointer");

			// ------ END----- //

			checkAnswer(clickedChoice)	

		});
	

	populateQuiz();


});































