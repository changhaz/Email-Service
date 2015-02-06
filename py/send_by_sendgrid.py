import sendgrid

def send_by_sendgrid(addr_to, addr_from, subject, text):
    """
    Use sendgrid API to send email.
    Raise exception on client error, server error and unknown error.
    """
    username = 'XXXXXXX';
    password = 'XXXXXXX'

    sg = sendgrid.SendGridClient(username, password, raise_errors=True)

    message = sendgrid.Mail()
    message.add_to('<' + addr_to + '>')
    message.set_subject(subject)
    message.set_text(text)
    message.set_from('<' + addr_from + '>');

    try:
        sg.send(message)
    except SendGridClientError:
        raise Exception("client_error")
    except SendGridServerError:
        raise Exception("server_error")
    except:
        raise Exception("unknown_error")

if __name__ == "__main__":
    main()
