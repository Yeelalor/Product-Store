import { ref, nextTick } from 'vue'

let html2pdf: any = null

// Load html2pdf and its dependencies once
const loadHtml2Pdf = async () => {
    if (html2pdf) return html2pdf // already loaded

    const html2pdfModule = await import('html2pdf.js')
    await import('jspdf')
    await import('html2canvas')

    html2pdf = html2pdfModule.default || html2pdfModule
    return html2pdf
}

export const usePrintPdf = () => {
    const printPDF = async (element: HTMLElement, fileName: string) => {
        console.log(typeof element, element)
        console.log("element===============", element);

        await nextTick() // wait for DOM
        if (!process.client || !element) return

        try {
            const html2pdfInstance = await loadHtml2Pdf()

            const opt = {
                margin: 6,
                filename: `${fileName}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            }

            const pdfBlob = await html2pdfInstance()
                .from(element)
                .set(opt)
                .outputPdf('blob')

            const blobUrl = URL.createObjectURL(pdfBlob)
            const newWindow = window.open(blobUrl)
            if (newWindow) {
                newWindow.onload = () => {
                    newWindow.focus()
                    newWindow.print()
                }
            }
        } catch (err) {
            console.error('PDF Error:', err)
        }
    }

    return { printPDF }
}