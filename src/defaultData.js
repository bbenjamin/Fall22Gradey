const defaultData = {
  'feedback': [
    {
      'description': 'do not use createElement (-4)',
    },
    {
      'description': 'unnecessary onLoad. Anything in your file that isn\t wrapped in a function will already execute after the page loads - (-5)',
    },
    {
      'description': 'unnecessary DomContentLoaded. Anything in your file that isn\t wrapped in a function will already execute after the page loads - (-5)',
    },
    {
      'description': 'unnecessary useEffect. See https://react.dev/learn/you-might-not-need-an-effect (-10)',
    },
    {
      'description': 'do not use var, use let or const (-1)',
    },
    {
      'description': 'use of `let` on a variable that could be `const` (-1)',
    },
    {
      'description': 'do not use getElementById, use querySelector() (-1)',
    },
    {
      'description': 'do not use getElementsByClassname, use querySelector() or querySelectorAll()` (-1)',
    }
  ],
    'q1': [
    {
      'description': 'something specific to question 1 (-2)'
    },
  ],
    'q2': [
    {
      'description': 'something specific to question 2 (-2)'
    },
  ],
    'q3': [
    {
      'description': 'something specific to question 3 (-1)'
    },
  ],
    'q4': [
    {
      'description': 'something specific to question 4 (-1)'
    },
  ],
    'q5': [
    {
      'description': 'something specific to question 5 (-3)',
    },
  ],
};

export default defaultData;
