import requests
import json

def send_by_mailgun(addr_to, addr_from, subject, text):
    """
    Use mailgun API to send email.
    Raise exception on post error, get error and API error.
    """
    post_response = requests.post(
        "https://api.mailgun.net/v2/zhengchanghai.com/messages",
        auth=("api", "XXXXXXXX"),
        data={"from": addr_from,
              "to": [addr_to],
              "subject": subject,
              "text": text})

    # Fail to post requst.
    if post_response.status_code != 200:
        raise Exception("post_error")

    # Check status of the message just sent.
    get_response = get_first_log(addr_to);
	
    # Fail to check status of the message.
    if get_response.status_code != 200:
        raise Exception("get_error")

    json_data = json.loads(get_response.text)
    send_status = json_data["items"][0]["event"]

    # If the latest log of email sending to the destination address
    # is not "accepted" or "delivered", raise an exception.
    #
    # In current code we do not strictly check whether it is "delivered" or not.
    # We return ok even if it has just been accepted and not delivered yet.
    # It is designed this way because the delay of delivery  may influence user experience.
    #
    # TO-DO: create a recurrent asynchronous callout to check the status
    # update until seeing it is "delivered" or "delivery failed". We could
    # send sender a notice if delivery failed.
    if send_status != "accepted" and send_status != "delivered":
        raise Exception("api_error")


def get_first_log(addr_to):
    """
    Read the log update of the last email sent to the given address. 
    """
    return requests.get(
        "https://api.mailgun.net/v2/zhengchanghai.com/events",
        auth=("api", "key-71f1966ff4df27bb4fd5353d9357020e"),
        params={"ascending"   : "no",
                "limit"       :  1,
                "pretty"      : "yes",
                "recipient" : addr_to})


if __name__ == "__main__":
    main()
