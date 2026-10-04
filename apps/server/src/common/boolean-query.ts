import { Transform } from 'class-transformer';

export const ToBoolean = () =>
  Transform(({ value }: { value: string | boolean }) =>
    value === 'true' || value === true
      ? true
      : value === 'false' || value === false
        ? false
        : value,
  );
