const byStyleCondition = styleCondition =>
  typeof styleCondition[1] === 'function'
    ? styleCondition[1]()
    : !!styleCondition[1];

const toModifierBy = (styles) =>
  (styleCondition) =>
    styles[styleCondition[0]]
      ? styles[styleCondition[0]]
      : '';

const getModifiers = (styles, styleConditions) =>
  Object.entries(styleConditions)
    .filter(byStyleCondition)
    .map(toModifierBy(styles))
    .join(' ');

const getClassNames = (className, styles, styleConditions) =>
  `${className} ${getModifiers(styles, styleConditions)}`;

export default getClassNames;
