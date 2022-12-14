export const RegexUtil = {
  pinCode: '^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$',
  name: '^[a-zA-Zs]+$',
  gstNumber: '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',
  panCard: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
  VPAId: '[a-zA-Z0-9\\.\\-]{2,256}\\@[a-zA-Z][a-zA-Z]{2,64}',
};
