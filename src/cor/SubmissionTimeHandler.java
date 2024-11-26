package cor;

import models.Document;

import java.time.Instant;

/**
 * Handler for validating the submission time of a document.
 * Ensures the document's submission time is not in the future.
 */
public class SubmissionTimeHandler implements DocumentHandler {
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
     * Validates the document's submission time.
     * If the submission time is in the future, it marks the document as invalid.
     * Passes the document to the next handler if available.
     *
     * @param document the document to be validated.
     */
    @Override
    public void handle(Document document) {
        long currentTime = Instant.now().toEpochMilli();

        if (document.getSubmissionTime() > currentTime) {
            System.out.println("Invalid submission time, future dates are not allowed");
            document.setValid(false);
        } else {
            System.out.println("Submission time is correct");
        }

        if (nextHandler != null) {
            nextHandler.handle(document);
        }
    }
}
