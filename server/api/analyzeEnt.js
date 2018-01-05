function analyzeEntitiesOfText(text) {
  // [START language_entities_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();


  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  client
    .analyzeEntities({document: document})
    .then(results => {
      const entities = results[0].entities;

      console.log('Entities:');
      entities.forEach(entity => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
          console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        }
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_entities_string]
}

module.exports = {analyzeEntitiesOfText}

