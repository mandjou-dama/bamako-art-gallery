export const apiVersion = "2025-01-25";

export const dataset = "production";

export const projectId = "o4huj4e2";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
