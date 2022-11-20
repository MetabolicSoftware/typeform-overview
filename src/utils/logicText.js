import actionDetailsText from "./actionDetailsText.js";
import conditionText from "./conditionText.js";

function actionText(action, fieldRef, fieldsByRef) {
  const { condition, action: actionType, details } = action;
  let text = "";
  if (condition) {
    text += `${conditionText(condition, fieldRef, fieldsByRef)}:\n  `;
  }
  text += actionDetailsText(actionType, details, fieldsByRef);
  return text;
}

export default function logicText(logicItem, fieldsByRef) {
  const { type, ref, actions } = logicItem;
  if (type !== "field") return; // only field based logic supported.
  return actions
    .map((action) => actionText(action, ref, fieldsByRef))
    .join("\n");
}
