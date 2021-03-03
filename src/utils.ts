export function getIdFromIdOrUrl(idOrUrl: string): string {
    if (/^https?:\/\//i.test(idOrUrl)) {
        // Extract the ID from a URL
        return idOrUrl.substring(idOrUrl.lastIndexOf("/") + 1);
    }
    return idOrUrl;
}
