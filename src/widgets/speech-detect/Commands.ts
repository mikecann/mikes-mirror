export type Commands = {
    [key: string]: (result: RegExpExecArray) => void;
};