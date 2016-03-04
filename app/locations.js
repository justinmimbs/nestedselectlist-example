import R from 'ramda';

function objectsFromTable(table) {
  return R.tail(table).map(R.zipObj(R.head(table)));
}

function nest(properties, objects) {
  const property = R.head(properties);
  const restProperties = R.tail(properties);
  return R.pipe(
      R.groupBy(R.prop(property)),
      R.toPairs,
      R.map(([_key, _objects]) => (
        {
          key: _key,
          level: property,
          values: restProperties.length ? nest(restProperties, _objects) : null,
        }
      )),
      R.sortBy(R.prop('key'))
    )(objects);
}

const table = [
  ['continent', 'country', 'city'],
  ['America',   'Brazil',  'Sao Paulo'],
  ['America',   'USA',     'Los Angeles'],
  ['America',   'USA',     'New York'],
  ['America',   'USA',     'San Francisco'],
  ['Asia',      'China',   'Beijing'],
  ['Asia',      'China',   'Hong Kong'],
  ['Asia',      'China',   'Shanghai'],
  ['Asia',      'Japan',   'Kyoto'],
  ['Asia',      'Japan',   'Nagoya'],
  ['Asia',      'Japan',   'Osaka'],
  ['Asia',      'Japan',   'Sapporo'],
  ['Asia',      'Japan',   'Tokyo'],
  ['Asia',      'Japan',   'Yokohama'],
  ['Europe',    'France',  'Paris'],
  ['Europe',    'Germany', 'Berlin'],
  ['Europe',    'Germany', 'Munich'],
  ['Europe',    'Italy',   'Milan'],
  ['Europe',    'Italy',   'Rome'],
  ['Europe',    'Spain',   'Barcelona'],
  ['Europe',    'Spain',   'Madrid'],
  ['Europe',    'UK',      'Bristol'],
  ['Europe',    'UK',      'Glasgow'],
  ['Europe',    'UK',      'London'],
  ['Europe',    'UK',      'Manchester'],
];

module.exports = nest(['continent', 'country', 'city'], objectsFromTable(table));
