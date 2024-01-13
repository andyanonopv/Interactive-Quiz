$(document).ready(function() {

    $('#createQuiz').click(function() {
        // Create the main container
        const createContainer = $('<div class="container create"></div>');
        $('body').css({"background-color": "lightgrey"});
        $(createContainer).css({"z-index" : "2", "width" : "80%","opacity" : "1","margin" : "0 auto"});

        // Add an input for the quiz question
        const questionInput = $('<input type="text" class="quiz-question" placeholder="Enter the question here...">');
        $(questionInput).css({"padding" : "15px", "margin" : "10px"});
        createContainer.append(questionInput);
    
        // Function to create an answer input with a radio button
        function createAnswerInput(number) {
            return $(`
                <div class="quiz-answer">
                    <input type="radio" name="correctAnswer" id="answer${number}">
                    <label for="answer${number}">
                        <input type="text" placeholder="Answer ${number}">
                    </label>
                </div>
            `);
        }
    
        // Add four answer inputs
        for (let i = 1; i <= 4; i++) {
            let addPadding = createAnswerInput(i);
            addPadding.css('margin', '10px');
            createContainer.append(addPadding);
        }
    
        // Append the container to the body
        $('body').append(createContainer);

        $(document).on('keydown', function(event) {
            if (event.keyCode === 27) {
                createContainer.remove();
                $('body').css({"background-color": "#fff"});
            }
        });
    });
    


    // Event listener for checkboxes
    $('.question .checked').on('change', function() {
        if (this.checked) {
            // Uncheck other checkboxes in the same question
            $(this).closest('.question').siblings().find('.checked').prop('checked', false);
        }
    });
    let totalScoring = 0;
    // Event listener for the submit button
    $('.btnSubmit').click(function() {
        let score = 0;
        const totalScore = 100;

        const questionsContainer = $('.quiz-item');
        // Find the nearest .quiz-item to this button and work with questions inside it
        const questions = $(this).closest('.quiz-item').find('.question');
        const totalQuestions = questionsContainer.length;
        const pointsPerQuestion = totalScore / totalQuestions;

        questions.each(function() {
            const checkbox = $(this).find('.checked').get(0);
            const isCorrect = $(this).find('a').hasClass('correct');

            if (checkbox.checked && isCorrect) {
                score += pointsPerQuestion;
            }
        });
        totalScoring += score;
        $(this).prop('disabled', true).text('Submitted');
    });
});
