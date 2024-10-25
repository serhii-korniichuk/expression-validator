type Node = {
  value: string;
  left?: Node;
  right?: Node;
};

const optimizeExpression = (expression: string): string => {
  // Unary minus: Insert 0 before minus if found at the start or after an open parenthesis
  expression = expression.replace(/(^|\()-/, "$10-");

  // Multiplication/division by 1: Remove these operations
  expression = expression.replace(/(\*1|1\*|\/1)/g, "");

  // Multiplication by 0: Remove these operations along with adjacent tokens
  expression = expression.replace(/(\w+|\d+)\*0|0\*(\w+|\d+)/g, "0");

  // Addition/subtraction of 0: Remove these operations along with adjacent tokens
  expression = expression.replace(/(\+0|0\+|-0|0-)/g, "");

  // Division of 0 by a variable: Replace with 0
  expression = expression.replace(/0\/(\w+|\d+)/g, "0");

  // Combine constants: Calculate the result of two consecutive integers
  expression = expression.replace(/(\d+)\+(\d+)/g, (_, a, b) => `${+a + +b}`);
  expression = expression.replace(/(\d+)-(\d+)/g, (_, a, b) => `${+a - +b}`);
  expression = expression.replace(/(\d+)\*(\d+)/g, (_, a, b) => `${+a * +b}`);
  expression = expression.replace(/(\d+)\/(\d+)/g, (_, a, b) => `${+a / +b}`);

  return expression;
};

const buildTree = (expression: string): Node => {
  const operators = ["+", "-", "*", "/"];
  let minHeight = Infinity;
  let bestSplit = -1;
  let bestOperator = "";
  let depth = 0;

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") depth++;
    if (expression[i] === ")") depth--;
    if (depth === 0 && operators.includes(expression[i])) {
      const left = expression.slice(0, i);
      const right = expression.slice(i + 1);
      const height = Math.max(left.length, right.length);
      if (height < minHeight) {
        minHeight = height;
        bestSplit = i;
        bestOperator = expression[i];
      }
    }
  }

  if (bestSplit === -1) {
    if (expression[0] === "(" && expression[expression.length - 1] === ")") {
      return buildTree(expression.slice(1, -1));
    }
    return { value: expression };
  }

  const left = expression.slice(0, bestSplit);
  const right = expression.slice(bestSplit + 1);

  return {
    value: bestOperator,
    left: buildTree(left),
    right: buildTree(right),
  };
};

const printTree = (node: Node, prefix = "", isLeft = true) => {
  if (node.right) {
    printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left) {
    printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export const showTree = (expression: string) => {
  console.log("Original:", expression);
  const optimizedExpression = optimizeExpression(expression);
  console.log("Optimized:", optimizedExpression);
  const tree = buildTree(optimizedExpression);
  printTree(tree);
};
