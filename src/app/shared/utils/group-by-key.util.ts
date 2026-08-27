export function groupByKey<T, K extends PropertyKey>(
  items: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {

  return items.reduce((groups, item) => {

    const key = keySelector(item);

    (groups[key] ??= []).push(item);

    return groups;

  }, {} as Record<K, T[]>);
}
