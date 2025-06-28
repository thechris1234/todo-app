/**
 * Converts a Unix timestamp (in miliseconds) to a localized date and time string.
 *
 * @param time - The timestamp in milliseconds.
 * @param locale -  Optional BCP 47 language tag (Default: 'hu-HU').
 * @param settings - Optional Intl.DateTimeFormat options for formatting customization.
 * @returns The formatted date and time string. Example: "2025.04.20. 17:18:19".
 */
export function formatTimestampIntl(
    time: number,
    locale: string = 'hu-HU',
    settings: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    },
) {
    const date = new Date(time);

    return Intl.DateTimeFormat(locale, settings).format(date);
}
