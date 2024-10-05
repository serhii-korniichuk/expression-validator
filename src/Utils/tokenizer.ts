type TokenType =
  | "NUMBER"
  | "VARIABLE"
  | "OPERATOR"
  | "BRACKETS"
  | "FUNCTION"
  | "ERROR";

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

const TOKEN_REGEX = /\d+(\.\d+)?|[a-zA-Z_][a-zA-Z0-9_]*|[+\-*/^()]|,/g;

const NUMBER_REGEX = /^\d+(\.\d+)?$/;
const VARIABLE_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const OPERATOR_REGEX = /[+\-*/^]/;
const PARENTHESIS_REGEX = /[()]/;
const FUNCTION_REGEX = /^(func|sin|cos|log|tan)$/; // New regex for mathematical functions
const COMMA_REGEX = /,/;

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let match;

  while ((match = TOKEN_REGEX.exec(input)) !== null) {
    const value = match[0];
    const position = match.index;

    if (NUMBER_REGEX.test(value)) {
      tokens.push({ type: "NUMBER", value, position });
    } else if (FUNCTION_REGEX.test(value)) {
      tokens.push({ type: "FUNCTION", value, position });
    } else if (VARIABLE_REGEX.test(value)) {
      tokens.push({ type: "VARIABLE", value, position });
    } else if (OPERATOR_REGEX.test(value)) {
      tokens.push({ type: "OPERATOR", value, position });
    } else if (PARENTHESIS_REGEX.test(value)) {
      tokens.push({ type: "BRACKETS", value, position });
    } else if (COMMA_REGEX.test(value)) {
      tokens.push({ type: "FUNCTION", value, position });
    } else {
      tokens.push({ type: "ERROR", value, position });
    }
  }

  return tokens;
};
