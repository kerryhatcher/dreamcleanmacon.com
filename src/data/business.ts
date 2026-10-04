export const facebook = 'https://www.facebook.com/p/Dream-Clean-Housekeeping-Company-LLC-61550656630177';
export const googleBusiness = 'https://share.google/Nra2FQnO7CS2KkM4b';
export const counties = ['Bibb', 'Houston', 'Crawford', 'Peach', 'Baldwin', 'Jones', 'Putnam', 'Monroe', 'Wilkinson'];
export const areaServed = [
  { '@type': 'City', name: 'Macon, Georgia' },
  ...counties.map(county => ({ '@type': 'AdministrativeArea', name: `${county} County, Georgia` })),
];
