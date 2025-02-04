export const getFileWithUpdatedFileName = ({ file, fileId }: { file: File, fileId: string }) => {
    const extension = file.name.split('.').pop();
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    const newFileName = `${fileNameWithoutExtension}_${fileId}.${extension}`;
    const fileToUpload = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified
    });
    return fileToUpload;
}