import { Dictionary } from '../types/dictionary';

type Condition = boolean | undefined;

const byStyleCondition = (styleCondition: [string, Condition]) => !!styleCondition[1];

const toModifierBy = (styles: Dictionary<string>) =>
  (styleCondition: [string, Condition]) =>
    styles[styleCondition[0]]
      ? styles[styleCondition[0]]
      : '';

const getModifiers = (styles: Dictionary<string>, styleConditions: Dictionary<Condition>) =>
  Object.entries(styleConditions)
    .filter(byStyleCondition)
    .map(toModifierBy(styles))
    .join(' ');

const getClassNames = (className: string, styles: Dictionary<string>, styleConditions: Dictionary<Condition>) =>
  `${className} ${getModifiers(styles, styleConditions)}`;

export default getClassNames;
