import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import { readFile } from 'fs/promises';

export async function POST({ request }) {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
        return new Response('Please upload at least one image', { status: 400 });
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Load the logo for watermarking
    const logoBytes = await readFile('static/logo.png');
    const logoImage = await pdfDoc.embedPng(logoBytes);

    // Process each image
    for (const file of files) {
        if (!file.type.startsWith('image/')) continue;

        // Convert image to buffer and resize if needed
        const imageBuffer = Buffer.from(await file.arrayBuffer());
        const { data, info } = await sharp(imageBuffer)
            .resize({ width: 595 }) // A4 width in points at 72 DPI
            .png()
            .toBuffer({ resolveWithObject: true });

        // Embed the image in the PDF
        const image = await pdfDoc.embedPng(data);
        const page = pdfDoc.addPage([info.width, info.height]);

        // Draw the image on the page
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: info.width,
            height: info.height,
        });

        // Add watermark (logo and text)
        page.drawImage(logoImage, {
            x: info.width - 50 - 10,
            y: info.height - logoImage.height / logoImage.width * 50 - 10,
            width: 50,
            height: logoImage.height / logoImage.width * 50,
        });

        page.drawText('Your Name', {
            x: info.width / 2 - 'Your Name'.length * 3,
            y: 20,
            size: 12,
            opacity: 0.5,
        });
    }

    // Save and return the PDF
    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="images_watermarked.pdf"',
        },
    });
}