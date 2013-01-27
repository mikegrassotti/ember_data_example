App.ContactEditController = Em.ObjectController.extend({
  startEditing: function() {
    // add the contact and its associated phone numbers to a local transaction
    var contact = this.get('content');
    var transaction = contact.get('store').transaction();
    transaction.add(contact);
    contact.get('phoneNumbers').forEach(function(phoneNumber) {
      transaction.add(phoneNumber);
    });
    this.transaction = transaction;
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    var transaction = this.transaction;
    if (transaction) {
      transaction.rollback();
      this.transaction = undefined;
    }
  },

  save: function() {
    this.transaction.commit();
    this.transaction = undefined;
    this.controllerFor('contact').stopEditing();
  },

  cancel: function() {
    this.controllerFor('contact').stopEditing();
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord({}, this.transaction);
  },

  removePhoneNumber: function(phoneNumber) {
    this.get('content.phoneNumbers').removeObject(phoneNumber);
  }
});
