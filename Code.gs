/**
 * Responds to a MESSAGE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onMessage(event) {
  if (event.message.slashCommand) {
    let message = { cardsV2: [], text: ""};
    allCommands(event);
    try {
      let profile = getProfile(event);
    } catch(error) {
      message["cardsV2"].push(createProfile(event));
      let profile = getProfile(event);
    }
    console.log(event.message.slashCommand.commandId);
    switch (event.message.slashCommand.commandId) {
      case 2: // /addCoins
        profile["coins"] += parseInt(event.message.argumentText.slice(1));
        setProperty(event.user.name, JSON.stringify(profile));
        message["cardsV2"].push(simpleCard("addCoins", `Added ${event.message.argumentText.slice(1)} coins!`, `You now have ${profile["coins"]} coins.`));
        break;
      
      case 3: // /removeCoins
        profile["coins"] -= parseInt(event.message.argumentText.slice(1));
        setProperty(event.user.name, JSON.stringify(profile));
        message["cardsV2"].push(simpleCard("removeCoins", `Removed ${event.message.argumentText.slice(1)} coins!`, `You now have ${profile["coins"]} coins.`));
        break;

      case 4: // /help
        message["text"] += "Dank Memer (testing)";
        break;
      
      case 5: // /feedback
        console.info("Feedback: \"" + event.message.argumentText + "\". Space: \"", (event.space.name ? event.space.name : "this chat") + "\". Display name: \"" + event.user.displayName + "\". Name: \"" + event.user.name + "\".");
        message["text"] += `Sent feedback, <${event.user.name}>`;
        break;

      default:
        console.info("Not a valid command id");
        break;
    }
    return message;
  } else {
    return { "text": "Dank Memer (testing)" };
  }
}

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.singleUserBotDm) {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " +
        (event.space.displayName ? event.space.displayName : "this chat");
  }

  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ",
      (event.space.name ? event.space.name : "this chat"));
}

