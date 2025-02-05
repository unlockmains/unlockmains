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