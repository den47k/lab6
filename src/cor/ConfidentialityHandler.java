package cor;

import models.Document;

/**
 * Handler for checking the confidentiality status of a document.
 * Ensures that only confidential documents are marked as valid.
 */
public class ConfidentialityHandler implements DocumentHandler {
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
     * Validates the document's confidentiality.
     * If the document is not confidential, it marks the document as invalid.
     * Passes the document to the next handler if available.
     *
     * @param document the document to be validated.
     */
    @Override
    public void handle(Document document) {
        if (!document.isConfidential()) {
            System.out.println("Document is not confidential");
            document.setValid(false);
        } else {
            System.out.println("Document is confidential");
        }

        if (nextHandler != null) {
            nextHandler.handle(document);
        }
    }
}
