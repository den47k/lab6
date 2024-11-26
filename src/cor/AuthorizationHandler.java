package cor;

import models.Document;

import java.util.Objects;

/**
 * Handler for verifying the author of a document.
 * Ensures the document's author is authorized to proceed.
 */
public class AuthorizationHandler implements DocumentHandler {
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
     * Validates the document's author.
     * If the author is unauthorized, it marks the document as invalid.
     * Passes the document to the next handler if available.
     *
     * @param document the document to be validated.
     */
    @Override
    public void handle(Document document) {
        if (!Objects.equals(document.getAuthor(), "Herasymchuk Danyil")) {
            System.out.println("Unauthorized action");
            document.setValid(false);
        } else {
            System.out.println("Authorized successfully");
        }

        if (nextHandler != null) {
            nextHandler.handle(document);
        }
    }
}