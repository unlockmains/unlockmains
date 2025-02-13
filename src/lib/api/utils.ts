export const getFileWithUpdatedFileName = ({ file, fileId, additionalName }: { file: File, fileId: string, additionalName?: string }) => {
    const extension = file.name.split('.').pop();
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    const newFileName = `${fileNameWithoutExtension}_${fileId}${additionalName ? `_${additionalName}` : ''}.${extension}`;
    const fileToUpload = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified
    });
    return fileToUpload;
}

export const convertISODateToDate = (date: string) => {
    const dateParts = date.split('T');
    const dateTimeParts = dateParts[0].split('-');
    const timeParts = dateParts[1].split(':');
    const year = dateTimeParts[0];
    const month = dateTimeParts[1];
    const day = dateTimeParts[2];
    const hour = timeParts[0];
    const minute = timeParts[1];
    return `${day}-${month}-${year} ${hour}:${minute}`
}