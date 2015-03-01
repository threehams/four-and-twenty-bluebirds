// Set up a transaction:
// - Open a database connection
// - Run a query
// - On failure, log and close connection
// - On success, request to external service
// - On failure here, roll back database query and close connection
// - On success, commit database transaction and return result of external service call
