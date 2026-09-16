import { ITextObject } from '@rocket.chat/apps-engine/definition/uikit';
import { en } from './en';

type Args = { [key: string]: string | number };

function interpolate(template: string, args: Args): string {
    return Object.entries(args).reduce(
        (result, [key, value]) => result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value)),
        template,
    );
}

// Web clients resolve `i18n.key` for locale-aware display; mobile clients fall back
// to `text`, so we set it to the interpolated English string rather than the bare key.
function textObject(type: 'plain_text' | 'mrkdwn', key: string, args?: Args): ITextObject {
    const template = en[key];
    const text = args ? interpolate(template, args) : template;
    const i18n = { key, ...(args && { args }) };
    return { type, text, i18n } as ITextObject;
}

export function plainText(key: string, args?: Args): ITextObject {
    return textObject('plain_text', key, args);
}

export function markdown(key: string, args?: Args): ITextObject {
    return textObject('mrkdwn', key, args);
}
