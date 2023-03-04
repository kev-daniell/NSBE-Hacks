package twilio

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
	"time"
)

const PhoneNumber = "+15676676782"

func SendMessageAtTime(scheduledTime time.Time, phoneNumber string) {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetFrom(PhoneNumber)
	params.SetMessagingServiceSid(os.Getenv("TWILIO_MESSAGING_SERVICE_SID"))
	params.SetBody("This is schedule 10 seconds after running")
	params.SetSendAt(scheduledTime)
	params.SetScheduleType("fixed")

	params.SetTo(phoneNumber)

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
		}
	}
}

func SendMessage(phoneNumber string) {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetBody("McAvoy or Stewart? These timelines can get so confusing.")
	params.SetFrom(PhoneNumber)
	params.SetTo(phoneNumber)

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
		}
	}
}
