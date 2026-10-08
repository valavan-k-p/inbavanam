/**
 * Limits shared by the content actions and their tests. They live outside
 * actions.ts because a "use server" file may only export async functions.
 */

/** How many versions of each section are kept. */
export const MAX_VERSIONS = 10;

/** Per field, and for the whole section, so one paste cannot fill the row. */
export const MAX_FIELD_LENGTH = 5_000;
export const MAX_SECTION_LENGTH = 100_000;
