export const priorities = ['HIGH', 'MEDIUM', 'LOW'];

export const prioritiesMapping = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const prioritiesMappingReversed = Object.fromEntries(
  Object.entries(prioritiesMapping).map(a => a.reverse())
);
