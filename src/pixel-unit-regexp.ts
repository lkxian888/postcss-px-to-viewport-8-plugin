function getUnitRegexp(unit: string) {
  return new RegExp(
    `"[^"]+"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)${unit}`,
    'g',
  );
}

export { getUnitRegexp };
