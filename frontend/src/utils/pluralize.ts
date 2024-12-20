interface PluralizeParams {
  count: number;
  singular?: string;
  plural?: string;
}

export const pluralize = ({
  count,
  singular = "item",
  plural = "items",
}: PluralizeParams): string => {
  if (typeof count !== "number" || isNaN(count)) {
    return plural;
  }

  return count === 0 || count === 1 ? singular : plural;
};
