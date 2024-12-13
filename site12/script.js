$(document).ready(function () {
  const allWords = [
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
  { word: "tree", translation: "дерево" },
  { word: "moon", translation: "місяць" },
  { word: "star", translation: "зірка" },
  { word: "sky", translation: "небо" },
  { word: "cloud", translation: "хмара" },
  { word: "rain", translation: "дощ" },
  { word: "snow", translation: "сніг" },
  { word: "wind", translation: "вітер" },
  { word: "sea", translation: "море" },
  { word: "river", translation: "річка" },
  { word: "mountain", translation: "гора" },
  { word: "forest", translation: "ліс" },
  { word: "animal", translation: "тварина" },
  { word: "bird", translation: "птах" },
  { word: "fish", translation: "риба" },
  { word: "insect", translation: "комаха" }
];

  let currentWords = [...allWords];

  let currentStep = 0;
  let correct = 0;
  let wrong = 0;

  function updateView() {
	  $('#translation-input').prop('disabled', true);
    if (currentWords.length > 0) {
      $('#word-card').animate({ opacity: 0 }, 300, function () {
        $(this).text(currentWords[currentStep].word).animate({ opacity: 1 }, 300);
        $('#current-step').text(currentStep + 1);
      });
    } else {
      $('#word-card').text("Завершено!");
      $('#current-step').text(currentStep);
    }
    $('#total-steps').text(currentWords.length);
    $('#correct-count').text(correct);
    $('#wrong-count').text(wrong);
	$('#translation-input').prop('disabled', false);
  }

  function handleAnswer(userInput) {
    const currentWord = currentWords[currentStep];
    if (userInput === currentWord.translation) {
      correct++;
    } else {
      wrong++;
    }
    currentWords.splice(currentStep, 1);

    if (currentWords.length > 0) {
      currentStep = Math.min(currentStep, currentWords.length - 1);
    } else {
      $('#translation-input').prop('disabled', true);
    }
    updateView();
  }

  $("input[type='radio']").change(function () {
    let difficulty = $("input[name='difficulty']:checked").val();
	$('#translation-input').prop('disabled', false);
    switch (difficulty) {
      case "easy":
        currentWords = allWords.slice(0, 10);
        break;
      case "medium":
        currentWords = allWords.slice(0, 20);
        break;
      case "hard":
        currentWords = allWords.slice(0, 30);
        break;
    }
    currentStep = 0;
    correct = 0;
    wrong = 0;
    updateView();
  });

$("input[name='difficulty'][value='easy']").prop('checked', true).trigger('change');

  $('#translation-input').on('keyup', function (e) {
    if (e.key === "Enter") {
      const userInput = $(this).val().trim().toLowerCase();
      if (currentWords.length > 0) {
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
    if (currentStep < currentWords.length - 1) {
      currentStep++;
      updateView();
    }
  });

  updateView();
});
