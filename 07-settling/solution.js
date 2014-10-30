// partial success, such as database/service calls which cannot be rolled back
// allows for retry or notification
// Promise.settle along with PromiseInspection

// - write to database
// - call to external service
// - if both succeed, return success
// - if both fail, return error
// - if one fails, retry once
// - if still fails, return a specific error