import { DonateType } from '../models/donation.model';

export const MINIMUM_DONATION_AMOUNT = 412;
export const DEFAULT_DONATION_AMOUNT = 3500;
export const PRESET_DONATION_AMOUNTS = [1000, 3500, 7000, 15000, 25000] as const;
export const FALLBACK_DONATION_TYPES: DonateType[] = [
  {
    id: 1,
    title: 'Általános működés és csapatfenntartás',
    description: 'A cserkészcsapat működésének és mindennapi eszközeinek támogatása.',
  },
  {
    id: 2,
    title: 'Nyári csapat- és őrsi táborok',
    description: 'Gyermekek táboroztatása, sátrak, felszerelések és rászoruló támogatása.',
  },
  {
    id: 3,
    title: 'Cserkészotthon felújítása',
    description: 'A csapatotthon felszerelése és karbantartása.',
  },
];

export const FOUNDATION_DETAILS = {
  beneficiary: 'Kalazanti Szent József Cserkészcsapatért Alapítvány',
  bankAccount: '11716008-20199999-00000000',
  taxNumber: '18049907-1-43',
} as const;
