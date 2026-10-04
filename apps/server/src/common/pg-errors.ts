import { ConflictException } from '@nestjs/common';

const UNIQUE_VIOLATION = '23505';
const FOREIGN_KEY_VIOLATION = '23503'; // inserting/updating a child with a missing parent (and NO ACTION deletes)
const RESTRICT_VIOLATION = '23001'; // deleting a parent that still has children, when the FK is ON DELETE RESTRICT

interface PgErrorLike {
  code?: string;
  constraint_name?: string;
  cause?: unknown;
}

export function findPgError(err: unknown): PgErrorLike | undefined {
  let current: unknown = err;

  for (
    let depth = 0;
    depth < 5 && current && typeof current === 'object';
    depth++
  ) {
    const e = current as PgErrorLike;
    if (typeof e.code === 'string' && e.code.length === 5) return e;
    current = e.cause;
  }
  return undefined;
}

export function isUniqueViolation(err: unknown, constraint?: string): boolean {
  const e = findPgError(err);
  return (
    e?.code === UNIQUE_VIOLATION &&
    (!constraint || e.constraint_name === constraint)
  );
}

export function isForeignKeyViolation(err: unknown): boolean {
  const code = findPgError(err)?.code;
  return code === FOREIGN_KEY_VIOLATION || code === RESTRICT_VIOLATION;
}

/**
 * Translate known database errors into HTTP errors. Anything unknown is rethrown
 * so Nest returns a 500 (we never hide real bugs).
 */
export function rethrowAsHttp(
  err: unknown,
  messages: { unique?: string; foreignKey?: string },
): never {
  if (messages.unique && isUniqueViolation(err))
    throw new ConflictException(messages.unique);
  if (messages.foreignKey && isForeignKeyViolation(err))
    throw new ConflictException(messages.foreignKey);
  throw err;
}
