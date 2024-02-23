<?php

namespace App;

use Fouladgar\MobileVerification\Contracts\SMSClient as FouladgarSMSClient;
use Fouladgar\MobileVerification\Notifications\Messages\Payload;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class SMSClient implements FouladgarSMSClient
{
    protected Client $SMSService;

    public function __construct()
    {
        try {
            $this->SMSService = new Client(config('mobile_verifier.twillo.sid'), config('mobile_verifier.twillo.token'));
        } catch (ConfigurationException $e) {
            dd($e->getMessage());
        }
    }

    /**
     * @param Payload $payload
     *
     * @return mixed
     */
    public function sendMessage(Payload $payload):mixed
    {
        return $this->SMSService->messages->create($payload->getTo(), [
            'from' => config('mobile_verifier.twillo.number'),
            'body' => $payload->getToken()
        ]);
    }
}
