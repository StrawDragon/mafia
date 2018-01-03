const byStyleCondition = (styleCondition: any) =>
  typeof styleCondition[1] === 'function'
    ? styleCondition[1]()
    : !!styleCondition[1];

const toModifierBy = (styles: Object) =>
  (styleCondition: Object) =>
    styles[styleCondition[0]]
      ? styles[styleCondition[0]]
      : '';

const getModifiers = (styles: Object, styleConditions: Object) =>
  Object.entries(styleConditions)
    .filter(byStyleCondition)
    .map(toModifierBy(styles))
    .join(' ');

const getClassNames = (className: string, styles: Object, styleConditions: Object) =>
  `${className} ${getModifiers(styles, styleConditions)}`;

export default getClassNames;
