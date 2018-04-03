import * as React from 'react';
import App from '../App';

export type Profile = React.Component;

export type Profiles = {
    [name: string]: (app: App) => JSX.Element
}