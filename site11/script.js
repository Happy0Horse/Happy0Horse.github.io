$(document).ready(function () {
  let words = [
    { word: "always", translation: "завжди" },
    { word: "apple", translation: "яблуко" },
    { word: "dog", translation: "собака" },
    { word: "friend", translation: "друг" },
    { word: "school", translation: "школа" },
    { word: "water", translation: "вода" },
    { word: "sun", translation: "сонце" },
    { word: "book", translation: "книга" },
    { word: "happy", translation: "щасливий" },
    { word: "home", translation: "дім" },
    { word: "music", translation: "музика" },
    { word: "teacher", translation: "вчитель" },
    { word: "flower", translation: "квітка" },
    { word: "family", translation: "сім'я" },
    { word: "tree", translation: "дерево" }
  ];

  let currentStep = 0;
  let correct = 0;
  let wrong = 0;

  function updateView() {
    if (words.length > 0) {
      $('#word-card').animate({ opacity: 0 }, 300, function () {
        $(this).text(words[currentStep].word).animate({ opacity: 1 }, 300);
		$('#current-step').text(currentStep + 1);
      });
    } else {
      $('#word-card').text("Завершено!");
	  $('#current-step').text(currentStep);
    }
    $('#total-steps').text(words.length);
    $('#correct-count').text(correct);
    $('#wrong-count').text(wrong);
  }

  function handleAnswer(userInput) {
    const currentWord = words[currentStep];
    if (userInput === currentWord.translation) {
      correct++;
    } else {
      wrong++;
    }
    words.splice(currentStep, 1);

    if (words.length > 0) {
      currentStep = Math.min(currentStep, words.length - 1);
    } else {
      $('#translation-input').prop('disabled', true);
    }
    updateView();
  }

  $('#translation-input').on('keyup', function (e) {
    if (e.key === "Enter") {
      const userInput = $(this).val().trim().toLowerCase();
      if (words.length > 0) {
        handleAnswer(userInput);
      }
      $(this).val("");
    }
  });

  $('#prev-btn').click(function () {
    if (currentStep > 0) {
      currentStep--;
      updateView();
    }
  });

  $('#next-btn').click(function () {
    if (currentStep < words.length - 1) {
      currentStep++;
      updateView();
    }
  });

  updateView();
});
