questions1: Record<SubjectType, DifficultyLevel> = {
    History: {
      easy: [
        {
          q: 'Who was the first President of the United States?',
          options: [
            'George Washington',
            'Abraham Lincoln',
            'Thomas Jefferson',
            'John Adams',
          ],
          correctIndex: 0,
        },
        {
          q: 'Which empire built the pyramids?',
          options: ['Roman', 'Egyptian', 'Greek', 'Persian'],
          correctIndex: 1,
        },
        {
          q: 'What year did World War II end?',
          options: ['1945', '1939', '1918', '1950'],
          correctIndex: 0,
        },
        {
          q: 'Who discovered America in 1492?',
          options: [
            'Christopher Columbus',
            'Marco Polo',
            'Vasco da Gama',
            'Ferdinand Magellan',
          ],
          correctIndex: 0,
        },
        {
          q: 'Which war was fought between the North and South regions in the United States?',
          options: [
            'Civil War',
            'World War I',
            'Revolutionary War',
            'Vietnam War',
          ],
          correctIndex: 0,
        },
      ],
      medium: [
        {
          q: 'In which year did the French Revolution begin?',
          options: ['1789', '1776', '1804', '1812'],
          correctIndex: 0,
        },
        {
          q: 'Who was the leader of the Soviet Union during World War II?',
          options: ['Stalin', 'Lenin', 'Gorbachev', 'Trotsky'],
          correctIndex: 0,
        },
        {
          q: 'Which dynasty built the Great Wall of China?',
          options: ['Qin', 'Han', 'Tang', 'Ming'],
          correctIndex: 0,
        },
        {
          q: 'The Treaty of Versailles was signed after which war?',
          options: ['WWI', 'WWII', 'Napoleonic Wars', 'Cold War'],
          correctIndex: 0,
        },
        {
          q: 'Who was known as the Iron Lady?',
          options: [
            'Margaret Thatcher',
            'Indira Gandhi',
            'Angela Merkel',
            'Golda Meir',
          ],
          correctIndex: 0,
        },
      ],
      hard: [
        {
          q: 'When did the Byzantine Empire fall?',
          options: ['1453', '1492', '1415', '1501'],
          correctIndex: 0,
        },
        {
          q: 'Which Roman Emperor was the first to convert to Christianity?',
          options: ['Constantine', 'Nero', 'Augustus', 'Caligula'],
          correctIndex: 0,
        },
        {
          q: 'Who led the Haitian Revolution?',
          options: [
            'Toussaint Louverture',
            'Simon Bolivar',
            'Che Guevara',
            'Jean-Jacques Dessalines',
          ],
          correctIndex: 0,
        },
        {
          q: "Which treaty ended the Thirty Years' War?",
          options: [
            'Treaty of Westphalia',
            'Treaty of Versailles',
            'Treaty of Paris',
            'Treaty of Utrecht',
          ],
          correctIndex: 0,
        },
        {
          q: 'In which battle was Napoleon defeated in 1815?',
          options: ['Waterloo', 'Austerlitz', 'Trafalgar', 'Leipzig'],
          correctIndex: 0,
        },
      ],
    },

    GK: {
      easy: [
        {
          q: 'What is the capital of India?',
          options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
          correctIndex: 0,
        },
        {
          q: 'How many continents are there?',
          options: ['7', '5', '6', '8'],
          correctIndex: 0,
        },
        {
          q: 'Which planet is known as the Red Planet?',
          options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
          correctIndex: 0,
        },
        {
          q: 'How many days are there in a leap year?',
          options: ['366', '365', '364', '360'],
          correctIndex: 0,
        },
        {
          q: "Who wrote 'Harry Potter'?",
          options: [
            'J.K. Rowling',
            'J.R.R. Tolkien',
            'Stephen King',
            'George R.R. Martin',
          ],
          correctIndex: 0,
        },
      ],
      medium: [
        {
          q: 'What is the smallest country in the world?',
          options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
          correctIndex: 0,
        },
        {
          q: 'What is the boiling point of water in Celsius?',
          options: ['100', '90', '80', '110'],
          correctIndex: 0,
        },
        {
          q: 'Who was the first man in space?',
          options: [
            'Yuri Gagarin',
            'Neil Armstrong',
            'Buzz Aldrin',
            'Alan Shepard',
          ],
          correctIndex: 0,
        },
        {
          q: 'What is the currency of Japan?',
          options: ['Yen', 'Won', 'Dollar', 'Euro'],
          correctIndex: 0,
        },
        {
          q: 'What is the chemical symbol for Gold?',
          options: ['Au', 'Ag', 'Gd', 'Go'],
          correctIndex: 0,
        },
      ],
      hard: [
        {
          q: 'Who won the Nobel Peace Prize in 2021?',
          options: [
            'Maria Ressa & Dmitry Muratov',
            'Greta Thunberg',
            'Abiy Ahmed',
            'Malala Yousafzai',
          ],
          correctIndex: 0,
        },
        {
          q: 'Which element has the highest melting point?',
          options: ['Tungsten', 'Iron', 'Carbon', 'Platinum'],
          correctIndex: 0,
        },
        {
          q: 'Who painted the ceiling of the Sistine Chapel?',
          options: [
            'Michelangelo',
            'Leonardo da Vinci',
            'Raphael',
            'Donatello',
          ],
          correctIndex: 0,
        },
        {
          q: 'What is the hardest natural substance?',
          options: ['Diamond', 'Quartz', 'Topaz', 'Corundum'],
          correctIndex: 0,
        },
        {
          q: 'Which country is known as the Land of the Thunder Dragon?',
          options: ['Bhutan', 'Nepal', 'Tibet', 'Mongolia'],
          correctIndex: 0,
        },
      ],
    },

    Geography: {
      easy: [
        {
          q: 'Which is the largest ocean in the world?',
          options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
          correctIndex: 0,
        },
        {
          q: 'Which continent is known as the Dark Continent?',
          options: ['Africa', 'Asia', 'Australia', 'South America'],
          correctIndex: 0,
        },
        {
          q: 'Which is the tallest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
          correctIndex: 0,
        },
        {
          q: 'Which river is the longest in the world?',
          options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
          correctIndex: 0,
        },
        {
          q: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
          correctIndex: 0,
        },
      ],
      medium: [
        {
          q: 'Which country has the most number of time zones?',
          options: ['France', 'Russia', 'USA', 'China'],
          correctIndex: 0,
        },
        {
          q: 'Which desert is the largest in the world?',
          options: ['Antarctic', 'Sahara', 'Arctic', 'Gobi'],
          correctIndex: 0,
        },
        {
          q: 'What is the deepest point on Earth?',
          options: [
            'Mariana Trench',
            'Tonga Trench',
            'Java Trench',
            'Puerto Rico Trench',
          ],
          correctIndex: 0,
        },
        {
          q: 'Which country is both in Europe and Asia?',
          options: ['Turkey', 'Russia', 'Kazakhstan', 'All of the above'],
          correctIndex: 3,
        },
        {
          q: 'Which country has the most volcanoes?',
          options: ['Indonesia', 'Japan', 'USA', 'Iceland'],
          correctIndex: 0,
        },
      ],
      hard: [
        {
          q: 'Which city is known as the highest capital in the world?',
          options: ['La Paz', 'Quito', 'Thimphu', 'Bogotá'],
          correctIndex: 0,
        },
        {
          q: 'What is the name of the tectonic plate on which India lies?',
          options: [
            'Indian Plate',
            'Eurasian Plate',
            'Indo-Australian Plate',
            'African Plate',
          ],
          correctIndex: 2,
        },
        {
          q: 'Which country has no rivers?',
          options: ['Saudi Arabia', 'Libya', 'Oman', 'Kuwait'],
          correctIndex: 0,
        },
        {
          q: 'Which lake is the deepest in the world?',
          options: ['Baikal', 'Tanganyika', 'Superior', 'Victoria'],
          correctIndex: 0,
        },
        {
          q: 'Which U.S. state has the most coastline?',
          options: ['Alaska', 'Florida', 'California', 'Hawaii'],
          correctIndex: 0,
        },
      ],
    },
  };

  questions = {
    History: [
      {
        q: 'Who was the first President of the United States?',
        options: [
          'George Washington',
          'Abraham Lincoln',
          'Thomas Jefferson',
          'John Adams',
        ],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which empire built the pyramids?',
        options: ['Roman', 'Egyptian', 'Greek', 'Persian'],
        correctIndex: 1,
        difficulty: 'easy',
      },
      {
        q: 'What year did World War II end?',
        options: ['1945', '1939', '1918', '1950'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Who discovered America in 1492?',
        options: [
          'Christopher Columbus',
          'Marco Polo',
          'Vasco da Gama',
          'Ferdinand Magellan',
        ],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which war was fought between the North and South regions in the United States?',
        options: [
          'Civil War',
          'World War I',
          'Revolutionary War',
          'Vietnam War',
        ],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'In which year did the French Revolution begin?',
        options: ['1789', '1776', '1804', '1812'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Who was the leader of the Soviet Union during World War II?',
        options: ['Stalin', 'Lenin', 'Gorbachev', 'Trotsky'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Which dynasty built the Great Wall of China?',
        options: ['Qin', 'Han', 'Tang', 'Ming'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'The Treaty of Versailles was signed after which war?',
        options: ['WWI', 'WWII', 'Napoleonic Wars', 'Cold War'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Who was known as the Iron Lady?',
        options: [
          'Margaret Thatcher',
          'Indira Gandhi',
          'Angela Merkel',
          'Golda Meir',
        ],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'When did the Byzantine Empire fall?',
        options: ['1453', '1492', '1415', '1501'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Which Roman Emperor was the first to convert to Christianity?',
        options: ['Constantine', 'Nero', 'Augustus', 'Caligula'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Who led the Haitian Revolution?',
        options: [
          'Toussaint Louverture',
          'Simon Bolivar',
          'Che Guevara',
          'Jean-Jacques Dessalines',
        ],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: "Which treaty ended the Thirty Years' War?",
        options: [
          'Treaty of Westphalia',
          'Treaty of Versailles',
          'Treaty of Paris',
          'Treaty of Utrecht',
        ],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'In which battle was Napoleon defeated in 1815?',
        options: ['Waterloo', 'Austerlitz', 'Trafalgar', 'Leipzig'],
        correctIndex: 0,
        difficulty: 'hard',
      },
    ],
    GK: [
      {
        q: 'What is the capital of India?',
        options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'How many continents are there?',
        options: ['7', '5', '6', '8'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'How many days are there in a leap year?',
        options: ['366', '365', '364', '360'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: "Who wrote 'Harry Potter'?",
        options: [
          'J.K. Rowling',
          'J.R.R. Tolkien',
          'Stephen King',
          'George R.R. Martin',
        ],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'What is the smallest country in the world?',
        options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'What is the boiling point of water in Celsius?',
        options: ['100', '90', '80', '110'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Who was the first man in space?',
        options: [
          'Yuri Gagarin',
          'Neil Armstrong',
          'Buzz Aldrin',
          'Alan Shepard',
        ],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'What is the currency of Japan?',
        options: ['Yen', 'Won', 'Dollar', 'Euro'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'What is the chemical symbol for Gold?',
        options: ['Au', 'Ag', 'Gd', 'Go'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Who won the Nobel Peace Prize in 2021?',
        options: [
          'Maria Ressa & Dmitry Muratov',
          'Greta Thunberg',
          'Abiy Ahmed',
          'Malala Yousafzai',
        ],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Which element has the highest melting point?',
        options: ['Tungsten', 'Iron', 'Carbon', 'Platinum'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Who painted the ceiling of the Sistine Chapel?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'What is the hardest natural substance?',
        options: ['Diamond', 'Quartz', 'Topaz', 'Corundum'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Which country is known as the Land of the Thunder Dragon?',
        options: ['Bhutan', 'Nepal', 'Tibet', 'Mongolia'],
        correctIndex: 0,
        difficulty: 'hard',
      },
    ],
    Geography: [
      {
        q: 'Which is the largest ocean in the world?',
        options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which continent is known as the Dark Continent?',
        options: ['Africa', 'Asia', 'Australia', 'South America'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which is the tallest mountain in the world?',
        options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which river is the longest in the world?',
        options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        correctIndex: 0,
        difficulty: 'easy',
      },
      {
        q: 'Which country has the most number of time zones?',
        options: ['France', 'Russia', 'USA', 'China'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Which desert is the largest in the world?',
        options: ['Antarctic', 'Sahara', 'Arctic', 'Gobi'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'What is the deepest point on Earth?',
        options: [
          'Mariana Trench',
          'Tonga Trench',
          'Java Trench',
          'Puerto Rico Trench',
        ],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Which country is both in Europe and Asia?',
        options: ['Turkey', 'Russia', 'Kazakhstan', 'All of the above'],
        correctIndex: 3,
        difficulty: 'medium',
      },
      {
        q: 'Which country has the most volcanoes?',
        options: ['Indonesia', 'Japan', 'USA', 'Iceland'],
        correctIndex: 0,
        difficulty: 'medium',
      },
      {
        q: 'Which city is known as the highest capital in the world?',
        options: ['La Paz', 'Quito', 'Thimphu', 'Bogotá'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'What is the name of the tectonic plate on which India lies?',
        options: [
          'Indian Plate',
          'Eurasian Plate',
          'Indo-Australian Plate',
          'African Plate',
        ],
        correctIndex: 2,
        difficulty: 'hard',
      },
      {
        q: 'Which country has no rivers?',
        options: ['Saudi Arabia', 'Libya', 'Oman', 'Kuwait'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Which lake is the deepest in the world?',
        options: ['Baikal', 'Tanganyika', 'Superior', 'Victoria'],
        correctIndex: 0,
        difficulty: 'hard',
      },
      {
        q: 'Which U.S. state has the most coastline?',
        options: ['Alaska', 'Florida', 'California', 'Hawaii'],
        correctIndex: 0,
        difficulty: 'hard',
      },
    ],
  };