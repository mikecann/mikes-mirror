import * as React from 'react';
import App from '../App';

export interface Profile extends React.Component {};

export interface Profiles {
    [name: string]: (app: App) => JSX.Element
}