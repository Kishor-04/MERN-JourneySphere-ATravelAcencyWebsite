const { PDFDocument, rgb } = require('pdf-lib');

async function generateInvoice(booking, packageDetails) {
    const pdfDoc = await PDFDocument.create();  // Create a new PDF document
    const page = pdfDoc.addPage([600, 700]);    // Set the page size (600x700)

    const { name, email, phone, numberOfTravelers, totalPrice } = booking;
    const { title, description, price } = packageDetails;

    // Header
    page.drawText('Travel Agency Booking Invoice', {
        x: 50,
        y: 650,
        size: 18,
        color: rgb(0, 0.53, 0.71),  // Header color
        font: await pdfDoc.embedFont('Helvetica-Bold'),
    });

    // Booking Details
    let yPosition = 600;
    page.drawText(`Customer Name: ${name}`, { x: 50, y: yPosition, size: 12 });
    yPosition -= 20;
    page.drawText(`Email: ${email}`, { x: 50, y: yPosition, size: 12 });
    yPosition -= 20;
    page.drawText(`Phone: ${phone}`, { x: 50, y: yPosition, size: 12 });
    yPosition -= 20;
    page.drawText(`Number of Travelers: ${numberOfTravelers}`, { x: 50, y: yPosition, size: 12 });

    // Package Details
    yPosition -= 40;
    page.drawText(`Package: ${title}`, { x: 50, y: yPosition, size: 12 });
    yPosition -= 20;
    page.drawText(`Description: ${description}`, { x: 50, y: yPosition, size: 12, maxWidth: 500 });
    yPosition -= 20;
    page.drawText(`Price per Person: $${price}`, { x: 50, y: yPosition, size: 12 });

    // Total Price
    yPosition -= 40;
    page.drawText(`Total Price: $${totalPrice}`, {
        x: 50,
        y: yPosition,
        size: 14,
        color: rgb(0.85, 0.2, 0.2),  // Red color for total price
        font: await pdfDoc.embedFont('Helvetica-Bold'),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;  // Return the generated PDF bytes
}

module.exports = { generateInvoice };
