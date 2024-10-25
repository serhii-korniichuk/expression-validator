import { parse } from "./parser";
import { tokenize } from "./tokenizer";

export interface ValidationError {
  position?: number;
  message?: string;
}

export const validateExpression = (expression: string): ValidationError[] => {
  const tokens = tokenize(expression);
  const result = parse(tokens);

  if (result) {
    console.log(result);
    return [{ position: result.position, message: result.message }];
  }

  return [];
};
