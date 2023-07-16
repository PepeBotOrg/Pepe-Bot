function createProfile(event) {
  try {
    const profile = JSON.stringify({
      displayName: event.user.displayName,
      coins: 20000,
      level: 1,
      inventory: [],
      premium: false
    });
    setProperty(event.user.name, profile)
    return(simpleCard("welcome", "Welcome to Dank Memer!", "Use slash commands, more comming soon! Note: This is a fan-made recreation of Dank Memer in Google Chat."));
  } catch (err) {
    return(simpleCard("profileError", "Failed to create profile.", "Sorry, but we were unable to create a profile at this time. Try again soon."));
  }
}

function getProfile(event) {
  return JSON.parse(getProperty(event.user.name));
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function allCommands(event) {
  if (getProperty(event.user.name) === null) {
    createProfile(event);
  }
}

function getProperty(name) {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(name);
}

function setProperty(name, value) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(name, value);
}
