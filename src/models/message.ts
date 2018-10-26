export class MessageModel {
    constructor(
        public topic: string,
        public email: string,
        public contactReason: string,
        public text: string,
    ) { }
}
