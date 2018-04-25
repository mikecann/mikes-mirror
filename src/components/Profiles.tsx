import * as React from 'react';

export interface Profile extends React.Component {
};

export interface Profiles {
    [name: string]: () => JSX.Element
}