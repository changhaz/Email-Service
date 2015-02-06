Email Service
=============

This Email Service is a code challenge project done by Changhai Zheng.
If you have any questions, please email zch1017@gmail.com.

The problem
-----------

The goal of this project is to create a service that accepts the necessary
information and sends emails.

One pre-defined requirement of this email service is, it should provide an
abstraction between two different email service providers: if one of the
service provider goes down, this email service can quickly failover to a
different provider without affecting users.

My solution
-----------

To meet the above requirements, the system is build in the following way:

* Front-end we have a form in HTML file for user input.
* We have javascript and CSS file to do user input validation.
* When user gives validate information and submit the form, a PHP script
  is run.
* The PHP script passes the parameter to another Python script to send mail.
* The Python script calls API from the main email service provider and keep
  track of the response. If send fails, API from the second service provider
  will be called.
* The PHP script checks the output of the Python file and render the page
  accordingly.

Whether the solution focuses on back-end, front-end or if it's full stack
-------------------------------------------------------------------------

The project itself could be more back-end. My solution addressed the
backend requirements and also use some front-end technologies to provide
better user experience and keep code well structured. So I think it could
be some kind of full stack.


Notes and TO-DOs
----------------

* If the use case is only for web interface, we could combine the PHP file
  and the Python file into only one PHP. The reason why they are separated
  is to make it more convenient for command line usage and to improve code
  modularity. Because of the time limit, the command line functionality is
  not provided.
* For front-end, Backbone.js is used for MVC. A simple feature of user input
  validation is provided. This is my first project using Backbone.
* For back-end, Python is used for sending mail and handling the service
  failover. The current mechanism is quite simple: always calling mailgun
  API first to send mail and check the post status. If status is not OK,
  throw an exception. Otherwise, call another mailgun API to check send
  log. We also throw and exception if the status of this request is not OK.
  Then check the first log for this destination address. Raise an exception
  if the status is neither 'accepted' nor 'delivered'.
* If the call to mailgun API fails at any point, we fail over to sendgrid.
  We catch client error, server error and other error if there's any, and
  return to the PHP informing that the send has failed. Otherwise we return
  succeed. PHP use this response to render the page to user.
* One TO-DO for the failover is to create a Round Robin mechanism. We could
  store the service provider API into an array of function pointer. We
  distribute the user request evenly to all the service provider we have.
* Automated tests are implemented for testing mailgun APIs.

Link to my resume and other projects
------------------------------------

[My homepage](http://zhengchanghai.com/)

Link to to the hosted application
---------------------------------

[MyMail](http://mymail.zhengchanghai.com/)



    


