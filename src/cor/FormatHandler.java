package cor;

import models.Document;

/**
 * Handler for validating the format of a document.
 * Ensures the document format meets predefined criteria.
 */
public class FormatHandler implements DocumentHandler {
    private DocumentHandler nextHandler;

    /**
     * Sets the next handler in the chain.
     *
     * @param nextHandler the next handler to process the document.
     */
    @Override
    public void setNextHandler(DocumentHandler nextHandler) {
        this.nextHandler = nextHandler;
    }

    /**
     * Validates the document's format.
     * If the format is invalid, it marks the document as invalid.
     * Passes the document to the next handler if available.
     *
     * @param document the document to be validated.
     */
    @Override
    public void handle(Document document) {
        if (!"docx".equalsIgnoreCase(document.getFormat())) {
            System.out.println("Invalid format");
            document.setValid(false);
        } else {
            System.out.println("Format is valid");
        }

        if (nextHandler != null) {
            nextHandler.handle(document);
        }
    }
}
