export class TopicNotRegistered extends Error {
  constructor(topic: string) {
    super(`The ${topic} topic is not registered.`);
  }
}
