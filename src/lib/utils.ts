export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

/** Tiny deterministic random generator so generated art stays stable between renders. */
export const seeded = (seed: number) => {
  let s = Math.abs(Math.floor(seed)) % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}
