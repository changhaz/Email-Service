#!/usr/bin/env python

import sys
import json
import re

from send_by_mailgun import *
from send_by_sendgrid import *

def valid_input(addr_to, addr_from, subject):
    """
    Returns whether the input value is valid.
    This is the backend check for user input.
    If this file is called by front-end HTTP request, this check could be
    redundant because of the similar check in javascript.
    """
    if not re.match(r"[^@]+@[^@]+\.[^@]+", addr_to):
        return False
    if not re.match(r"[^@]+@[^@]+\.[^@]+", addr_from):
        return False
    if not subject:
        return False
    return True


def main():
    # Print "0" if send succeed, otherwise print error code.

    # Email information are passed by PHP in JSON.
    # Parse JSON in order to get the parameters first.
    try:
        data = sys.argv[1]
    except:
        print "1"
        return

    email_data = json.loads(data)

    addr_to = email_data["to"]
    addr_from = email_data["from"]
    subject = email_data["subject"]
    text = email_data["text"]

    # Skip calling API if user input is not valid.
    if not valid_input(addr_to, addr_from, subject):
        print "invalid input"
        return

    # Provide an abstraction between two different email service providers: mailgun and sendgrid.
    # In current code it will try mailgun first. If send failed, it will try sendgrid.
    # TO-DO: create a Round-robin load-balancer to evenly distribute send request to different ESP.
    try:
       send_by_mailgun(addr_to, addr_from, subject, text)
    except Exception as e:
        try:
            send_by_sendgrid(addr_to, addr_from, subject, text)
        except:
            # In this case, both service fail.
            print "both failed"
            return
    
    print "0"


if __name__ == "__main__":
    main()
