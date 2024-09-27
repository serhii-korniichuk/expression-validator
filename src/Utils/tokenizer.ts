type TokenType =
  | "NUMBER"
  | "VARIABLE"
  | "OPERATOR"
  | "PARENTHESIS"
  | "FUNCTION"
  | "ERROR";

export interface Token {
  type: TokenType;
  value: string;
}

const TOKEN_REGEX = /\d+(\.\d+)?|[a-zA-Z_][a-zA-Z0-9_]*|[+\-*/^()]|,/g;

const NUMBER_REGEX = /^\d+(\.\d+)?$/;
const VARIABLE_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const OPERATOR_REGEX = /[+\-*/^]/;
const PARENTHESIS_REGEX = /[()]/;
const COMMA_REGEX = /,/;

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let match;

  while ((match = TOKEN_REGEX.exec(input)) !== null) {
    const value = match[0];

    if (NUMBER_REGEX.test(value)) {
      tokens.push({ type: "NUMBER", value });
    } else if (VARIABLE_REGEX.test(value)) {
      tokens.push({ type: "VARIABLE", value });
    } else if (OPERATOR_REGEX.test(value)) {
      tokens.push({ type: "OPERATOR", value });
    } else if (PARENTHESIS_REGEX.test(value)) {
      tokens.push({ type: "PARENTHESIS", value });
    } else if (COMMA_REGEX.test(value)) {
      tokens.push({ type: "ERROR", value: "Invalid symbol" });
    } else {
      tokens.push({ type: "ERROR", value });
    }
  }

  return tokens;
};
