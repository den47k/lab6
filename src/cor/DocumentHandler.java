package cor;

import models.Document;

/**
 * Interface for handling document validation steps in the Chain of Responsibility.
 */
public interface DocumentHandler {

    /**
     * Sets the next handler in the chain.
     *
     * @param nextHandler the next handler in the chain.
     */
    void setNextHandler(DocumentHandler nextHandler);

    /**
     * Processes the document validation.
     *
     * @param document the document to be validated.
     */
    void handle(Document document);
}
