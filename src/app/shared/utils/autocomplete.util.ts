export type AutocompleteOptions<T> = {

  label: (item: T) => string;
  keywords?: (item: T) => string[];

  limit?: number;
};

export function searchAutocomplete<T>(
  items: T[],
  search: string,
  options: AutocompleteOptions<T>
): T[] {

  const query = search.trim().toLowerCase();

  const score = (item: T): number => {

    const label = options.label(item).toLowerCase();

    if (label.startsWith(query)) {
      return 0;
    }

    if (label.includes(query)) {
      return 1;
    }

    if (options.keywords?.(item).some(keyword => keyword.toLowerCase().includes(query))) {
      return 2;
    }

    return 3;
  };

  return items
    .filter(item => {

      if (!query) {
        return true;
      }

      return score(item) < 3;
    })
    .sort((a, b) =>
      score(a) - score(b) ||
      options.label(a).localeCompare(options.label(b))
    )
    .slice(0, options.limit ?? Number.MAX_SAFE_INTEGER);
}
