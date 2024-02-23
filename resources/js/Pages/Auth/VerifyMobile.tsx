import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { router } from "@inertiajs/react";

export default function VerifyMobile() {
    const { data, setData, post, processing, errors } = useForm({
        token: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("mobile-verification.verify"));
    };

    const resend = () => {
        router.post(route("mobile-verification.resend"));
    };

    return (
        <GuestLayout>
            <Head title="Mobile Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your phone number by clicking on the link we just emailed to
                you? If you didn't receive the SMS, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the phone number
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="token" value="Token" />

                    <TextInput
                        id="token"
                        type="text"
                        name="token"
                        value={data.token}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("token", e.target.value)}
                    />

                    <InputError message={errors.token} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
            <PrimaryButton
                className="ms-4"
                onClick={resend}
                disabled={processing}
            >
                Resend
            </PrimaryButton>
        </GuestLayout>
    );
}
