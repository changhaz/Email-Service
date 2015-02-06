$(function(){

    // Create a model for the services
    var Service = Backbone.Model.extend({
        
        // Will contain four attributes
        // These are their default values
        defaults:{
            title: '',
            userInput: '',
            valid: false,
            focused: false
        },

        // Helper function for detecting mouse or key is out of focus
        // we will listen for change of the "focused" property updated
        getFocused: function(){
            this.set('focused', !this.get('focused'));
        }
    });


    // Create a collection of services
    var ServiceList = Backbone.Collection.extend({
        
        // Will hold objects of the Service model
        model: Service,

        // Check if each model get valid or not
        getChecked: function(){
            return this.where({valid:true});
        }
    });

    // Create services
    var to = new Service({ title: 'To'});
    var from = new Service({ title: 'From'});
    var subject = new Service({ title: 'Subject'});
    var text = new Service({ title: 'Text', valid: true});

    // Prefill the collection with a number of services
    var services = new ServiceList([to, from, subject, text]);

    // This view turns a Service model into HTML
    // Will create li elements
    var ServiceView = Backbone.View.extend({
        
        tagName: 'li',

        events:{
            'focusout': 'validateService'
        },

        initialize: function(){

            // Set up event listeners. The change backbone event
            // is raised when a property changes (like the checked field)
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){

            var modelTitle = this.model.get('title');
            var modelInput = this.model.get('userInput');
            var modelValid = this.model.get('valid');

            // Create the HTML
            if (modelTitle !== 'Text'){
                this.$el.html('<span class="title">' + modelTitle + 
                              '</span><input type="text" name="' + modelTitle + '" id="' + modelTitle + 
                              '"value="' + modelInput + 
                              '"/><div class="notification" id="' + modelTitle + 
                              '_notification"></div>');
                if(modelValid){
                    this.validInputStyle(modelTitle);
                }else{
                    this.inValidInputStyle(modelTitle);
                }
            }
            else{
                this.$el.html('<span class="title">' + modelTitle + 
                              '</span><textarea name="' + modelTitle + '" id="' + modelTitle + 
                              '"value="' + modelInput + 
                              '">' + modelInput + 
                              '</textarea><div class="notification" id="' + modelTitle + 
                              '_notification"></div>');
            }

            // Returning the object is a good practice
            // that makes chaining possible
            return this;
        },

        // Email validate function
        validateEmail: function(evt) {
            // Get the target value
            var val = $(evt.target).val();

            // Validate email format with regular expression 
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            if(val.match(emailRegex)){
                return true;
            }   
            else{
                return false;
            }
        },

        // Subject validate function
        validateSubject: function(evt) {
            // Get the target value
            var val = $(evt.target).val();

            // Validate subject is empty or not
            if(val){
                return true;
            }
            else{
                return false;
            }
        },

        // Change style for valid input
        validInputStyle: function(title){
            var notificationID = "#" + title + "_notification";  
            var inputID = "#" + title;
            $(inputID).css({"border-width": "0px"});
            $(notificationID).text("");
            $(notificationID).css({"height": "0px", "margin-top": "0px"});
        },

        // Change style for invalid input
        inValidInputStyle: function(title){
            var content = "";
            var notificationID = "#" + title + "_notification";  
            var inputID = "#" + title;
            if(title === "To" || title === "From"){
                content = "Invalid email address";
            }
            else{
                content = "Email subject cannot be empty";
            }
            $(inputID).css({"border-style": "solid", "border-width": "1.5px", "border-color": "red"});
            $(notificationID).text(content);
            $(notificationID).css({"height": "12px", "margin-top": "8px"});
        },

        validateService: function(evt){
            var title = this.model.get("title");
            
            // Validate email
            if(title === "To" || title === "From"){
                if(this.validateEmail(evt)){
                    this.model.set({
                        userInput: $(evt.target).val(),
                        valid: true
                    });
                }
                else{
                    this.model.set({
                        userInput: $(evt.target).val(),
                        valid: false
                    });
                }
            }
            // Validate subject
            else if(title === "Subject"){
                if(this.validateSubject(evt)){
                    this.model.set({
                        userInput: $(evt.target).val(),
                        valid: true
                    });
                }
                else{
                    this.model.set({
                        userInput: $(evt.target).val(),
                        valid: false
                    });
                }
            }
            else if(title === "Text"){
                console.log($(evt.target).val());
                this.model.set({
                    userInput: $(evt.target).val(),
                    valid:true
                });
            }

            this.model.getFocused();
        }
    });

    // The main view of the application
    var App = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#main'),

        initialize: function(){

            // Cache these selectors
            this.list = $('#services');
            this.sendButton = $("#send");
            
            // Listen for the change event on the collection
            // This is equivalent to listening on every one of the service objects in the collection.
            this.listenTo(services, 'change', this.render);
            
            // Create views for every one of the services in the collection and add them to the page
            // "this" is the context in the callback
            services.each(function(service){
                var view = new ServiceView({model: service});
                this.list.append(view.render().el);
            }, this);
        },

        render: function(){

            // Checking each field to see if valid or not
            // Submit button turns to enabled when all the fields are valid
            var count = 0;
            _.each(services.getChecked(), function(){
                count++;
            });

            if(count === services.length){
                this.sendButton.removeAttr("disabled");
                this.sendButton.css({"background-color":"#89bde5"});
            }
            else{
                this.sendButton.attr("disabled", "true");
                this.sendButton.css({"background-color":"#EAEFFF"});
            }

            return this;
        }
    });

    new App();

});
