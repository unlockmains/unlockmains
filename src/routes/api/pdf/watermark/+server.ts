import { PDFDocument, PDFPage } from 'pdf-lib';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || file.type !== 'application/pdf') {
        return new Response('Please upload a valid PDF', { status: 400 });
    }

    const pdfBuffer = new Uint8Array(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const logoResponse = await fetch('/um-main.png');
    const logoBytes = new Uint8Array(await logoResponse.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);

    const logoWidth = 500;
    const logoHeight = logoWidth * (logoImage.height / logoImage.width);
    const watermarkText = 'Unlock Mains';

    const { width, height } = pdfDoc.getPages()[0].getSize();

    const blankPage = pdfDoc.addPage([width, height]);
    blankPage.drawText('Evaluator Feedback', {
        x: width / 2 - 108,
        y: height - 48,
        size: 24,
        opacity: 1,
    });

    const pages = pdfDoc.getPages();

    for (const page of pages) {
        page.drawImage(logoImage, {
            x: width / 2 - logoWidth / 2,
            y: height / 2 - logoHeight / 2,
            width: logoWidth,
            height: logoHeight,
            opacity: 0.4,
        });

        page.drawText(watermarkText, {
            x: width / 2 - watermarkText.length * 3,
            y: 20,
            size: 12,
            opacity: 0.5,
        });
    }

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="watermarked.pdf"',
        },
    });
}