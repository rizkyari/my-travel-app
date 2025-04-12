export const formatDate = (isoDate?: string) => {
    if (!isoDate) return '-'
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}