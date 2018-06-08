export type Command = (result: RegExpExecArray) => void;

export type Commands = {
    [key: string]: Command
};