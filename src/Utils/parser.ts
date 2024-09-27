import { Token } from "./tokenizer";
import { ValidationError } from "./validateExpression";

enum State {
  START = "START",
  NUMBER = "NUMBER",
  VARIABLE = "VARIABLE",
  OPERATOR = "OPERATOR",
  OPEN_PARENTHESIS = "OPEN_PARENTHESIS",
  CLOSE_PARENTHESIS = "CLOSE_PARENTHESIS",
  FUNCTION = "FUNCTION",
  ERROR = "ERROR",
}

const OPEN_PARENTHESIS = "(";
const CLOSE_PARENTHESIS = ")";

export const parse = (tokens: Token[]): ValidationError | null => {
  let state = State.START;
  let openParenthesisCount = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (state as State) {
      case State.START:
        if (token.type === "NUMBER" || token.type === "VARIABLE") {
          state = State.NUMBER;
        } else if (token.type === "OPERATOR" && token.value === "-") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else {
          return {
            message: `Invalid start of expression at token ${token.value}`,
            position: i,
          };
        }
        break;

      case State.NUMBER:
      case State.VARIABLE:
        if (token.type === "OPERATOR") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === CLOSE_PARENTHESIS
        ) {
          if (openParenthesisCount === 0) {
            return {
              message: `Mismatched parenthesis at token ${token.value}`,
              position: i,
            };
          }
          state = State.CLOSE_PARENTHESIS;
          openParenthesisCount--;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else {
          return {
            message: `Unexpected token ${token.value} after number/variable`,
            position: i,
          };
        }
        break;

      case State.OPERATOR:
        if (token.type === "NUMBER" || token.type === "VARIABLE") {
          state = State.NUMBER;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else {
          return {
            message: `Invalid token ${token.value} after operator`,
            position: i,
          };
        }
        break;

      case State.OPEN_PARENTHESIS:
        if (token.type === "NUMBER" || token.type === "VARIABLE") {
          state = State.NUMBER;
        } else if (token.type === "OPERATOR" && token.value === "-") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          openParenthesisCount++;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else {
          return {
            message: `Invalid token ${token.value} after opening parenthesis`,
            position: i,
          };
        }
        break;

      case State.CLOSE_PARENTHESIS:
        if (token.type === "OPERATOR") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === CLOSE_PARENTHESIS
        ) {
          openParenthesisCount--;
        } else {
          return {
            message: `Unexpected token ${token.value} after closing parenthesis`,
            position: i,
          };
        }
        break;

      case State.FUNCTION:
        if (token.type === "PARENTHESIS" && token.value === OPEN_PARENTHESIS) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else {
          return {
            message: `Invalid token ${token.value} after function`,
            position: i,
          };
        }
        break;

      default:
        return { message: "Invalid state", position: i };
    }
  }

  if (openParenthesisCount !== 0) {
    return { message: "Mismatched parenthesis", position: tokens.length };
  }

  if (state === State.OPERATOR) {
    return {
      message: "Expression cannot end with an operator",
      position: tokens.length,
    };
  }

  return null;
};
