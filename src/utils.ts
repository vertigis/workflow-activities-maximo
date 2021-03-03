export function getIdFromIdOrUrl(idOrUrl: string): string {
    // Extract the ID from a URL
    return idOrUrl.substring(idOrUrl.lastIndexOf("/") + 1);
}
