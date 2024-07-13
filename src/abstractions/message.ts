/**
 * Represents message from the user
 */
export class Message {
    id = '';

    text = '';

    constructor(text = '') {
        this.id = crypto.randomUUID();
        this.text = text;
    }
}
