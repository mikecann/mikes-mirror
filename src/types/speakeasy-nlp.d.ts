declare module "speakeasy-nlp";

declare type SpeakEasyClassifyResult = {
    action?: string,
    owner?: string,
    subject?: string,
    tokens?: string[]
}