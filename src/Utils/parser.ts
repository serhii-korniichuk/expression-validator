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
  FUNCTION_ARGUMENT = "FUNCTION_ARGUMENT",
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
        if (token.type === "NUMBER") {
          state = State.NUMBER;
        } else if (token.type === "VARIABLE") {
          state = State.VARIABLE;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else if (token.type === "OPERATOR" && token.value === "-") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else {
          return {
            position: token.position,
            message: "Unexpected token at the start",
          };
        }
        break;

      case State.FUNCTION:
        if (token.type === "PARENTHESIS" && token.value === OPEN_PARENTHESIS) {
          state = State.FUNCTION_ARGUMENT;
          openParenthesisCount++;
        } else {
          return {
            position: token.position,
            message: "Expected '(' after function name",
          };
        }
        break;

      case State.FUNCTION_ARGUMENT:
        if (token.type === "NUMBER" || token.type === "VARIABLE") {
          state = State.NUMBER; // Move to NUMBER state after argument
        } else {
          return {
            position: token.position,
            message: "Expected argument for function",
          };
        }
        break;

      case State.NUMBER:
      case State.VARIABLE:
        if (i === tokens.length - 1) {
          return null;
        } else if (token.type === "OPERATOR") {
          state = State.OPERATOR;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === CLOSE_PARENTHESIS
        ) {
          state = State.CLOSE_PARENTHESIS;
          openParenthesisCount--;
          if (openParenthesisCount < 0) {
            return {
              position: token.position,
              message: "Extra closing parenthesis",
            };
          }
        } else {
          return {
            position: token.position,
            message: "Unexpected token after number or variable",
          };
        }
        break;

      case State.OPERATOR:
        if (token.type === "NUMBER") {
          state = State.NUMBER;
        } else if (token.type === "VARIABLE") {
          state = State.VARIABLE;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else if (
          token.type === "PARENTHESIS" &&
          token.value === OPEN_PARENTHESIS
        ) {
          state = State.OPEN_PARENTHESIS;
          openParenthesisCount++;
        } else {
          return {
            position: token.position,
            message: "Expected number, variable or '(' after operator",
          };
        }
        break;

      case State.OPEN_PARENTHESIS:
        if (token.type === "NUMBER") {
          state = State.NUMBER;
        } else if (token.type === "VARIABLE") {
          state = State.VARIABLE;
        } else if (token.type === "FUNCTION") {
          state = State.FUNCTION;
        } else {
          return {
            position: token.position,
            message: "Expected number, variable or function after '('",
          };
        }
        break;

      case State.CLOSE_PARENTHESIS:
        if (openParenthesisCount < 0) {
          return {
            position: token.position,
            message: "Extra closing parenthesis",
          };
        }
        if (token.type === "OPERATOR") {
          state = State.OPERATOR;
        } else if (i === tokens.length - 1) {
          return null;
        } else {
          return {
            position: token.position,
            message: "Unexpected token after ')'",
          };
        }
        break;

      default:
        return { position: token.position, message: "Unexpected state" };
    }
  }

  if (openParenthesisCount > 0) {
    return {
      position: tokens[tokens.length - 1].position,
      message: "Unmatched opening parenthesis",
    };
  }

  return null;
};
