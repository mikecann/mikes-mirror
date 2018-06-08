import * as React from 'react';
import MikesProfile from './MikesProfile';
import KelsiesProfile from './KelsiesProfile';
import TarynsProfile from './TarynsProfile';
import OliviasProfile from './OliviasProfile';
import GregsProfile from './GregsProfile';
import ColleensProfile from './ColleensProfile';
import LeahsProfile from './LeahsProfile';
import EmptyProfile from './EmptyProfile';
import UnknownProfile from './UnknownProfile';
import { Profiles } from '../plugins/profiles/Profiles';

export const appProfiles : Profiles = {
    mike: () => <MikesProfile />,
    kelsie: () => <KelsiesProfile />,
    taryn: () => <TarynsProfile />,
    olivia: () => <OliviasProfile />,
    greg: () => <GregsProfile />,
    colleen: () => <ColleensProfile />,
    leah: () => <LeahsProfile />,
    empty: () => <EmptyProfile />,
    unknown: () => <UnknownProfile />
  }

export type AppProfiles = typeof appProfiles;