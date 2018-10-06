export class AssertComponent {
    assert(condition, message) {
        if (!condition) {
            message = message || 'Assertion failed';
            if (typeof Error !== 'undefined') {
                console.log('ERRO!');
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
}