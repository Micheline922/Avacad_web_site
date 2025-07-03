'use server';

import { summarizeDocument } from '@/ai/flows/summarize-document';
import pdf from 'pdf-parse';

type SummaryResult = {
    summary: string;
    keywords: string[];
};

export async function generateSummaryForFile(fileData: {dataUrl: string, type: string}): Promise<SummaryResult> {
    const { dataUrl, type } = fileData;

    if (!dataUrl) {
        throw new Error('Aucun fichier fourni.');
    }

    const base64Data = dataUrl.split(',')[1];
    if (!base64Data) {
        throw new Error('Données de fichier non valides.');
    }
    const buffer = Buffer.from(base64Data, 'base64');
    
    let documentContent = '';

    try {
        if (type === 'application/pdf') {
            const data = await pdf(buffer);
            documentContent = data.text;
        } else if (type === 'text/plain') {
            documentContent = buffer.toString('utf-8');
        } else {
            throw new Error(`Type de fichier non supporté: ${type}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'analyse du fichier:", error);
        throw new Error("Échec de l'analyse du fichier. Le fichier est peut-être corrompu ou dans un format incorrect.");
    }
    
    if (!documentContent.trim()) {
        throw new Error("Le contenu du fichier est vide ou n'a pas pu être lu.");
    }

    const MAX_CONTENT_LENGTH = 100000;
    if (documentContent.length > MAX_CONTENT_LENGTH) {
        documentContent = documentContent.substring(0, MAX_CONTENT_LENGTH);
    }

    return await summarizeDocument({ documentContent });
}
