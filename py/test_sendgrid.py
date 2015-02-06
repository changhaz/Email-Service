from send_by_sendgrid import *

def main():
    # number of email to send
    n = 3
    addr_to = "zch1017@qq.com"
    addr_from = "test@test.com"
    subject = "Test Email No."
    text = "For test"

    fail_count = 0

    for i in range(0, n):
        try:
            send_by_sendgrid(addr_to, addr_from, subject + str(i), text)
        except:
            fail_count += 1

    print "Try count: " + str(n) + " Fail count: " + str(fail_count)

if __name__ == "__main__":
    main()
