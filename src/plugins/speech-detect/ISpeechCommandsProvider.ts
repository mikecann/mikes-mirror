import { Commands } from './Commands';

export interface ISpeechCommandsProvider
{
    getCommands(): Commands;
}