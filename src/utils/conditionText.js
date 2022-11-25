const operatorByConditionOp = {
  is: "=",
  is_not: "≠",
  equal: "=",
  not_equal: "≠",
  lower_than: "<",
  greater_than: ">",
  greater_equal_than: ">=",
  lower_equal_than: "<=",
};

function parseConditionVars(vars) {
  const obj = {};
  for (const item of vars) {
    obj[item.type] = item.value;
  }
  return obj;
}

function getFieldChoiceByRef(field, ref) {
  for (const choice of field.properties.choices) {
    if (choice.ref === ref) {
      return choice;
    }
  }
}

export default function conditionText(
  condition,
  fieldRef,
  fieldsByRef,
  level = 0
) {
  const { op, vars } = condition;
  const startText = level === 0 ? "If " : "";
  switch (op) {
    case "and":
    case "or":
      return (
        startText +
        vars
          .map((item) => conditionText(item, fieldRef, fieldsByRef, level + 1))
          .join(` ${op} `)
      );
    case "always":
      return "Always";
    default: {
      const { field, variable, choice, constant } = parseConditionVars(vars);
      const fieldData = fieldsByRef[field];
      const targetText = variable
        ? `@${variable}`
        : field === fieldRef
        ? "this"
        : fieldData.shortName;
      const operatorText = operatorByConditionOp[op];
      const valueText = choice
        ? getFieldChoiceByRef(fieldData, choice).shortName
        : constant;
      return `${startText}${targetText} ${operatorText} ${valueText}`;
    }
  }
}
