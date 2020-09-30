import * as en from '../resources/en-gb.json'
import * as fr from '../resources/fr-fr.json'
import * as def from '../resources/default.json'
import { WidgetProps } from '@talentsoft-opensource/integration-widget-contract';

export const languagePacks = {
    'en-gb': en,
    'fr-fr': fr,
    'default': def
}

export const DEFAULT_LANGUAGE = 'default';

export type Language = keyof typeof languagePacks;

export function recordIsEmpty(rec: Record<string, string>) {
    for (var key in rec)
    {
        if (rec.hasOwnProperty(key))
        {
            return false;
        }
    }
    return true;
}

export function getLanguage(widgetProps: WidgetProps): Language {
    let language: string = widgetProps.language;
    if (!(language in languagePacks)) {
        language = DEFAULT_LANGUAGE;
    }
    return language as Language;
}
