import cor.*;
import models.Document;

/**
 * Entry point for the application demonstrating the Chain of Responsibility pattern.
 */
public class Main {
    /**
     * Main method to execute the application.
     *
     * @param args the command-line arguments (not used).
     */
    public static void main(String[] args) {
        Document document1 = new Document("docx", "Herasymchuk Danyil", true, System.currentTimeMillis());
        Document document2 = new Document("PDF", "empty", false, System.currentTimeMillis() * 2);

        DocumentHandler formatHandler = new FormatHandler();
        DocumentHandler authorizationHandler = new AuthorizationHandler();
        DocumentHandler confidentialityHandler = new ConfidentialityHandler();
        DocumentHandler submissionTimeHandler = new SubmissionTimeHandler();

        formatHandler.setNextHandler(authorizationHandler);
        authorizationHandler.setNextHandler(confidentialityHandler);
        confidentialityHandler.setNextHandler(submissionTimeHandler);

        System.out.println("Checking first document");
        formatHandler.handle(document1);
        System.out.println(document1.isValid() ? "Document is valid" : "Document is not valid");

        System.out.println("\nChecking second document");
        formatHandler.handle(document2);
        System.out.println(document2.isValid() ? "Document is valid" : "Document is not valid");
    }
}
