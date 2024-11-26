package models;

/**
 * Represents a document with metadata and validation status.
 */
public class Document {
    private final String format;
    private final String author;
    private final boolean confidential;
    private final long submissionTime;
    private boolean isValid;

    /**
     * Constructs a new {@link Document} instance.
     *
     * @param format the format of the document (e.g., "docx", "PDF").
     * @param author the author of the document.
     * @param confidential whether the document is confidential.
     * @param submissionTime the submission time of the document in milliseconds.
     */
    public Document(String format, String author, boolean confidential, long submissionTime) {
        this.format = format;
        this.author = author;
        this.confidential = confidential;
        this.submissionTime = submissionTime;
        this.isValid = true;
    }

    /**
     * Gets the document format.
     *
     * @return the format of the document.
     */
    public String getFormat() {
        return format;
    }

    /**
     * Gets the document author.
     *
     * @return the author of the document.
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Checks if the document is confidential.
     *
     * @return {@code true} if the document is confidential; otherwise {@code false}.
     */
    public boolean isConfidential() {
        return confidential;
    }

    /**
     * Gets the submission time of the document.
     *
     * @return the submission time in milliseconds.
     */
    public long getSubmissionTime() {
        return submissionTime;
    }

    /**
     * Checks if the document is valid.
     *
     * @return {@code true} if the document is valid; otherwise {@code false}.
     */
    public boolean isValid() {
        return isValid;
    }

    /**
     * Sets the validity of the document.
     *
     * @param isValid {@code true} to mark the document as valid; otherwise {@code false}.
     */
    public void setValid(boolean isValid) {
        this.isValid = isValid;
    }
}
