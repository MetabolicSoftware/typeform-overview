import fieldShortName from "./fieldShortName.js";
import choiceShortName from "./choiceShortName.js";
import logicText from "./logicText.js";

export default function getData(data) {
  const fieldsByRef = {};

  function processGroupFields(fields, level = 0, prefix = "") {
    for (const [index, field] of fields.entries()) {
      const { type, properties, ref } = field;
      const { fields, choices } = properties;

      // add short name to field
      field.shortName = fieldShortName(index, level, prefix);

      // add short name to field choices
      if (choices) {
        for (const [index, choice] of choices.entries()) {
          choice.shortName = choiceShortName(index);
        }
      }

      // Create ref based fields look up
      fieldsByRef[ref] = field;

      if (type === "group") {
        processGroupFields(fields, level + 1, field.shortName);
      }
    }
  }

  function addLogicTexts(logic) {
    for (const item of logic) {
      fieldsByRef[item.ref].logic = logicText(item, fieldsByRef);
    }
  }

  const { fields, logic } = data;
  processGroupFields(fields);
  addLogicTexts(logic);
  return data;
}
