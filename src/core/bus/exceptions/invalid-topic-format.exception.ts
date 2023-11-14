export class InvalidTopicFormat extends Error {
  constructor() {
    super('Topic format should be MainTopic.Subtopic format.');
  }
}
