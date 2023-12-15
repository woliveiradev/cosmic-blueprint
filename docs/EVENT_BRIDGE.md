# Event Bridge
<img src="./event-bridge-diagram.png" />

Event Bridge is the application's ***Events*** router. It is responsible for receiving ***Events*** from one or more points of origin (***Triggers***) and matching them with the ***Actions*** registered based on ***Topics***. It can be used to communicate between application components or to communicate with external systems.

# Key Concepts

- ***Event*** is something important that occurs in the system and other components care about it, for example: New user registered, Order confirmed etc...

- A ***Topic*** tells us what type of ***Event*** is being published, it is through this that the Event Bridge knows which ***Actions*** should be executed. Every topic is made up of two parts: the main topic and the subtopic, for example: "Accounts.Created". You can also register actions with wildcard topics, for example: "Accounts.*".

- A ***Trigger*** can be any function that can publish an ***Event*** to the Event Bridge. This opens up the possibility of publishing ***Events*** from anywhere in the application, either by calling it directly from a use case or through a job implementing the [Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html) pattern, for example.

- ***Proxy*** is the layer responsible for validating the structure of the ***Event***, such as the format of the ***Topic***. When this data is valid, the ***Event*** is passed on to the ***Core*** component.

- ***Core*** is the layer responsible for effectively handling the registration of actions and publications, applying all the logic necessary to satisfy the flow of ***Events***.

- ***Action*** is a function that receives the published event and can be used to perform any operation required, from business rule flows to integrations with external systems, for example: publishing the event in a queue that will be consumed by other systems or sending a notification of something that has happened via Slack, email or SMS.

- ***Filters*** are optional validators that can be defined when an ***Action*** is registered. The ***Filters*** receive the data from the published ***Event*** and through it you can perform checks to execute ***Actions*** only when certain conditions are met. Let's look at the following ***Event***:

  ```json
    {
      "topic": "Accounts.Created",
      "message": {
        "name": "John Doe",
        "phone": "+5519999999999",
        "email": null
      }
    }
  ```

  In this example, the user provides a phone number but not an email (the opposite could also be possible), with filters you can create a rule where the ***Action*** that sends the welcome email will only be executed if the user has provided an email.
