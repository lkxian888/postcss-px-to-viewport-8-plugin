function getUnitRegexp(unit) {
  return new RegExp(
    '"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit,
    'g',
  );
}

module.exports = {
  getUnitRegexp,
};
