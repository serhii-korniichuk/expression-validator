export type ValidationError = { position?: number; message?: string };

export type ErrorsMessageProps = {
  errors: ValidationError[];
  isValidated: boolean;
};
